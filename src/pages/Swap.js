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

const Label = styled.label`
    display: block;
`

// const superTokenABI = require("@superfluid-finance/ethereum-contracts/build/contracts/ISuperToken.json").abi;

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
            "0x63202116468DE652D24e05170f9dceC7A368c255",
            Erc20,
            signer
        );
        try {
            console.log("approving DAI spend");
            await DAI.approve(
                "0x47cb4d507b995b76d6ab177911dd1986408de7d9",
                ethers.utils.parseEther(amount.toString())
            ).then(function (tx) {
                console.log(
                `Congrats, you just approved your ALLrvb spend. You can see this tx at https://mumbai.polygonscan.io/tx/${tx.hash}`
                );
            });
        } catch (error) {
        console.error(error);
        }
    }

    const onSubmit = async (values) => {
        const { name, username, symbol, contractAddress } = values
        
    }
    
    return <>
        <h1>Swapity Swap</h1>
        <Formik
            initialValues={{ underlying: "", supertoken: "", amount: "" }}
            onSubmit={async (values) => {
                await new Promise((resolve) => setTimeout(resolve, 500));
                alert(JSON.stringify(values, null, 2));
            }}
            onSubmit={onSubmit}
        >
            <Form>
                <Label>Artist's erc20</Label>
                <Field name="underlying" type="text" placeholder="0x..." />
                <Label>Supertoken erc20</Label>
                <Field name="supertoken" type="text" placeholder="0x..." />
                <br/>
                <Label>Amoount</Label>
                <Field name="amount" type="number" placeholder="10" />
                <br/>
                <Button type="submit">Swap Dat</Button>
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