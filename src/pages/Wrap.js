import { useState, useEffect } from 'react'
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

const SUPER_TOKEN = `0x5cdab858e5488406264a009a6b5252232e8e43ab`

//id is a number randomly generated between 1 and a billion
const id = Math.floor(Math.random() * 1000000000);

function Swap({ ...props }) {
    const { wallet, provider } = useWallet()

    const [sf, setSf] = useState();
    const [signer, setSigner] = useState();

    useEffect(() => {
        if(!provider) return;
        const init = async() => {
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
    
            setSf(sf)
            setSigner(signer)
            console.log(sf, signer)

        }
        init()
    }, [provider])

    const createIndex = async ({ address="0x5cdab858e5488406264a009a6b5252232e8e43ab" }) => {

        // const DAIx = address
        try {
            const createIndexOperation = sf.idaV1.createIndex({
                indexId: id,
                superToken: address
            // userData?: string
            });

            console.log("Creating your Index...");

            await createIndexOperation.exec(signer);

            console.log(
            `Congrats - you've just created a new Index!
            Index ID: ${id}
            `
            );
        } catch (error) {
            console.error(error);
        }
    }

    //will be used to approve super token contract to spend DAI
    async function daiApprove({amount}) {
        console.log(provider)
    
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
    
        // const DAIx = new ethers.Contract(
        //     "0x5b91c6749F141113DBD871d0579c80F107AB2f3b",
        //     superTokenABI.abi,
        //     signer
        // );

        console.log('hi')
        const DAIx = await sf.loadSuperToken(SUPER_TOKEN)
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


    const updateSubscription = async ({address, shares}) => {
        try {
            const updateSubscriptionOperation = sf.idaV1.updateSubscriptionUnits({
            indexId: '664709469',
            superToken: SUPER_TOKEN,
            subscriber: address,
            units: shares
            // userData?: string
            });
    
            console.log("Updating your Index...");
    
            await updateSubscriptionOperation.exec(signer);
    
            console.log(
            `Congrats - you've just updated an Index!
            Index ID: 664709469
            Subscriber: ${address}
            Units: ${shares} units
            
            `
            );
        } catch (error) {
            console.error(error);
        }
    }
  
    const distributeFunds = async ({ id="664709469", amount=1000, }) => {

        try {
            const distributeOperation = sf.idaV1.distribute({
            indexId: id,
            superToken: SUPER_TOKEN ,
            amount
            // userData?: string
            });

            console.log("Distributing funds to your index subscribers...");

            await distributeOperation.exec(signer);

            console.log(
            `Congrats - you've just sent funds to your index!
            Index ID: ${id}
            Total Sent: ${amount}
            `
            );
        } catch (error) {
            console.error(error);
        }

    }
  
    const approveSubscription = async () => {

        try {
            const op = sf.idaV1.approveSubscription({
            indexId: '664709469',
            superToken: SUPER_TOKEN ,
            publisher: '0x94Ef4640E4F5C3F66E2D185Fa05F097D5dc8069C'
            // userData?: string
            });

            console.log("Approving...");

            await op.exec(wallet.signer);

            console.log(
            `Approved
            `
            );
        } catch (error) {
            console.error(error);
        }
    }

    const claim = async () => {

        try {
            const op = sf.idaV1.claim({
            indexId: '664709469',
            superToken: SUPER_TOKEN ,
            publisher: '0x94Ef4640E4F5C3F66E2D185Fa05F097D5dc8069C',
            subscriber: wallet.address,
            // userData?: string
            });

            console.log("Approving...");

            await op.exec(wallet.signer);

            console.log(
            `Approved
            `
            );
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
        
        <br/><br/>

        <h3>Create index</h3>

        <Formik
            initialValues={{ address: "" }}
            onSubmit={async (values) => {
                await new Promise((resolve) => setTimeout(resolve, 500));
                alert(JSON.stringify(values, null, 2));
            }}
            onSubmit={createIndex}
        >
            {/* 664709469 */}
            <Form>
                <Label>Address</Label>
                <Field name="address" type="string" placeholder="0x5cdab858e5488406264a009a6b5252232e8e43ab" />
                <br/>
                <Button type="submit">Create index</Button>
            </Form>
        </Formik>
        <br/><br/>

        <h3>Update subscriptions</h3>

        <Formik
            initialValues={{ address: "", shares: "" }}
            onSubmit={async (values) => {
                await new Promise((resolve) => setTimeout(resolve, 500));
                alert(JSON.stringify(values, null, 2));
            }}
            onSubmit={updateSubscription}
        >
            {/* 664709469 */}
            <Form>
                <Label>Wallet Address</Label>
                <Field name="address" type="string" placeholder="0x..." />
                <br/>
                <Label>Shares</Label>
                <Field name="shares" type="number" placeholder="1" />
                <br/>
                <Button type="submit">Update index</Button>
            </Form>
        </Formik>
        <br/><br/>

        <h3>Distribute Funds</h3>

        <Formik
            initialValues={{ amount: "" }}
            onSubmit={async (values) => {
                await new Promise((resolve) => setTimeout(resolve, 500));
                alert(JSON.stringify(values, null, 2));
            }}
            onSubmit={distributeFunds}
        >
            <Form>
                <Label>Amount</Label>
                <Field name="amount" type="number" placeholder="1" />
                <br/>
                <Button type="submit">Distribute</Button>
            </Form>
        </Formik>
        <br/><br/>

        <h3>Approve approveSubscription</h3>

        <Formik
            initialValues={{}}
            onSubmit={async (values) => {
                await new Promise((resolve) => setTimeout(resolve, 500));
                alert(JSON.stringify(values, null, 2));
            }}
            onSubmit={approveSubscription}
        >
            <Form>
                <Button type="submit">Approve</Button>
            </Form>
        </Formik>
        <br/><br/>

        <h3>Claim tokens</h3>

        <Formik
            initialValues={{}}
            onSubmit={async (values) => {
                await new Promise((resolve) => setTimeout(resolve, 500));
                alert(JSON.stringify(values, null, 2));
            }}
            onSubmit={claim}
        >
            <Form>
                <Button type="submit">Claim</Button>
            </Form>
        </Formik>
    </>;
}

export default Swap