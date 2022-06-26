import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Formik, Field, Form } from 'formik'
import { useLazyQuery, useMutation } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'
import { create } from 'ipfs-http-client'
import { CREATE_POST_TYPED_DATA, AUTHENTICATION } from '../utils/queries'
import { useWallet } from '../utils/wallet'
import Button from '../components/Button'
import Upload from '../components/Upload'
import omitDeep from 'omit-deep'
import { sleep } from '../utils'
import { utils } from 'ethers'
import pollUntilIndexed from '../utils/pollUntilIndexed'

const Label = styled.label`
    display: block;
    margin: 0.75em 0 0.3em 0;
`

const client = create('https://ipfs.infura.io:5001/api/v0')
// const superTokenABI = require("@superfluid-finance/ethereum-contracts/build/contracts/ISuperToken.json").abi;

function NewArtist({ profile, ...props }) {
    const [mutatePostTypedData, typedPostData] = useMutation(CREATE_POST_TYPED_DATA);

    const [hashes, setHashes] = useState('')
    const [videoUrl, setVideoUrl] = useState('')
    const { lensHub, wallet, setToast } = useWallet()

    const handleCompose = async () => {
        let ipfsResult;
        let metadata = {
            name: `song by ${profile.handle}`,
            description: videoUrl,
            content: videoUrl,
            external_url: null,
            image: null,
            imageMimeType: null,
            version: "1.0.0",
            appId: 'reverb',
            attributes: [],
            media: [],
            metadata_id: uuidv4(),
        }

        // For Only Text Post
        ipfsResult = await client.add(JSON.stringify(metadata))

        const createPostRequest = {
            profileId: profile.id,
            contentURI: 'ipfs://' + ipfsResult.path,
            collectModule: {
                freeCollectModule: { 
                    followerOnly: false
                },
            },
            referenceModule: {
                followerOnlyReferenceModule: false,
            },
        };

        mutatePostTypedData({
            variables: {
                request: createPostRequest,
            }
        })

    }

    useEffect(() => {
        const processPost = async (data) => {
            const { domain, types, value } = data.typedData
            const typedData = data.typedData


            const signature = await wallet.signer._signTypedData(
                omitDeep(domain, '__typename'),
                omitDeep(types, '__typename'),
                omitDeep(value, '__typename')
            )


            const { v, r, s } = utils.splitSignature(signature);


            const tx = await lensHub.postWithSig({
                profileId: typedData.value.profileId,
                contentURI: typedData.value.contentURI,
                collectModule: typedData.value.collectModule,
                collectModuleInitData: typedData.value.collectModuleInitData,
                referenceModule: typedData.value.referenceModule,
                referenceModuleInitData: typedData.value.referenceModuleInitData,
                sig: {
                    v,
                    r,
                    s,
                    deadline: typedData.value.deadline,
                },
            });
            
            console.log('create post: tx hash', tx.hash);
            await pollUntilIndexed(tx.hash)
            // setShowModal(false)
            // setDescription('')
            // setToastMsg({type: 'success', msg: 'Transaction indexed'})
            return;

        }
        if (typedPostData.data) processPost(typedPostData.data.createPostTypedData);

    }, [typedPostData.data])

    const onSubmit = ({name, description}) => {
        console.log(profile)
        console.log(name)
        if (!name || !videoUrl) {
            alert('please fill all fields')
            return;
        }


        handleCompose()


    }

    return <>
        <h1>New Song</h1>
        <Formik
            initialValues={{ name: "" }}
            onSubmit={async (values) => {
                await new Promise((resolve) => setTimeout(resolve, 500));
                alert(JSON.stringify(values, null, 2));
            }}
            onSubmit={onSubmit}
        >
            <Form>
                <br/>
                <Upload setVideoUrl={setVideoUrl}/>
                <code>{videoUrl}</code>
                <br/>
                <Label>Song Name</Label>
                <Field name="name" type="text" placeholder="City of Gods" />
                {/* <Label>Description</Label>
                <Field name="description" type="text" placeholder="@illenium" /> */}
                <br/>
                <br/>
                <Button type="submit">Post Song</Button>
            </Form>
        </Formik>
        <br/>
        <br/>
    </>
}

export default NewArtist