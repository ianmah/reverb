import { useEffect } from 'react'
import styled from 'styled-components'
import { ethers } from 'ethers'
import { Framework } from "@superfluid-finance/sdk-core";
import { Formik, Field, Form } from 'formik'
import { useLazyQuery, useMutation } from '@apollo/client'
import { GET_CHALLENGE, AUTHENTICATION } from '../utils/queries'
import { useWallet } from '../utils/wallet'
import Button from '../components/Button'
import { sleep } from '../utils'
import Erc20 from '../abi/Erc20.json'
import superTokenABI from "@superfluid-finance/ethereum-contracts/build/contracts/ISuperToken.json"

const Label = styled.label`
    display: block;
`


function Swap({ ...props }) {
    const { wallet, provider } = useWallet()

    //will be used to approve super token contract to spend DAI
    async function daiApprove({amount}) {
        console.log(provider)
        const sf = await Framework.create({
            networkName: "mumbai",
            provider: provider,
            customSubgraphQueriesEndpoint: "",
            dataMode: "WEB3_ONLY",
            resolverAddress: '0x8C54C83FbDe3C59e59dd6E324531FB93d4F504d3',
        });
    
        const signer = sf.createSigner({
            privateKey: process.env.REACT_APP_PRIVATE_KEY,
            provider: provider
        });
    
        //fDAI on kovan
        const DAI = new ethers.Contract(
            "0x5b91c6749F141113DBD871d0579c80F107AB2f3b",
            Erc20,
            signer
        );
        try {
            console.log("approving DAI spend");
            await DAI.approve(
                "0x5cdab858e5488406264a009a6b5252232e8e43ab",
                ethers.utils.parseEther(amount.toString())
            ).then(function (tx) {
                console.log(
                `Congrats, you just approved your ALLrvb spend. You can see this tx at https://mumbai.polygonscan.com/tx/${tx.hash}`
                );
            });
        } catch (error) {
        console.error(error);
        }
    }

    const onSubmit = async (values) => {
        const { name, username, symbol, contractAddress } = values
        
    }


    //where the Superfluid logic takes place
    async function daiUpgrade({amount}) {
        const sf = await Framework.create({
            networkName: "mumbai",
            provider: provider,
            dataMode: "WEB3_ONLY",
            customSubgraphQueriesEndpoint: "",
            resolverAddress: '0x8C54C83FbDe3C59e59dd6E324531FB93d4F504d3',
        });
    
        const signer = sf.createSigner({
            privateKey: process.env.REACT_APP_PRIVATE_KEY,
            provider: provider
        });
    
        // const DAIx = new ethers.Contract(
        //     "0x5b91c6749F141113DBD871d0579c80F107AB2f3b",
        //     superTokenABI.abi,
        //     signer
        // );

        console.log('hi')
        const DAIx = await sf.loadSuperToken('0x5cdab858e5488406264a009a6b5252232e8e43ab')
        console.log('hi2')

        try {
            console.log(`upgrading $${amount} DAI to DAIx`);
            const amtToUpgrade = ethers.utils.parseEther(amount.toString());
            console.log(amtToUpgrade)
            const upgradeOperation = DAIx.upgrade({
                amount: amtToUpgrade.toString(),
                // providerOrSigner: provider,
            });

            const upgradeTxn = await upgradeOperation.exec(signer);
            await upgradeTxn.wait().then(function (tx) {
                console.log(
                `
                Congrats - you've just upgraded DAI to DAIx!
                `
                );
            });
        } catch (error) {
            console.error(error);
        }
    }
  
    
    return <>
        <h1>Wrappity Wrap</h1>
        <Formik
            initialValues={{ amount: "" }}
            onSubmit={async (values) => {
                await new Promise((resolve) => setTimeout(resolve, 500));
                alert(JSON.stringify(values, null, 2));
            }}
            onSubmit={daiUpgrade}
        >
            <Form>
                <Label>Amoount</Label>
                <Field name="amount" type="number" placeholder="10" />
                <br/>
                <Button type="submit">Wrap Dat</Button>
            </Form>
        </Formik>
        
        <br/><br/>


        <Formik
            initialValues={{ amount: "" }}
            onSubmit={async (values) => {
                await new Promise((resolve) => setTimeout(resolve, 500));
                alert(JSON.stringify(values, null, 2));
            }}
            onSubmit={daiApprove}
        >
            <Form>
                <Label>Amoount</Label>
                <Field name="amount" type="number" placeholder="10" />
                <br/>
                <Button type="submit">Approve Dat</Button>
            </Form>
        </Formik>
    </>;
}

export default Swap