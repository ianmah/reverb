import { useEffect } from 'react'
import styled from 'styled-components'
import { Formik, Field, Form } from 'formik'
import { useLazyQuery, useMutation } from '@apollo/client'
import { GET_CHALLENGE, AUTHENTICATION } from '../utils/queries'
import { useWallet } from '../utils/wallet'
import Button from '../components/Button'
import { sleep } from '../utils'


const Label = styled.label`
    display: block;
`

function NewArtist({ ...props }) {
    const { wallet } = useWallet()
    console.log(wallet)

    const pollTx = async (resp) => {

        while(true) {
            const reqGetContractAddr = await fetch(
                `https://api-eu1.tatum.io/v3/blockchain/sc/address/MATIC/${resp.txId}`,
                {
                  headers: {
                    'x-api-key': process.env.REACT_APP_TATUM_API_KEY,
                  },
                }
              );
            const respGetContractAddr = await reqGetContractAddr.json()
            console.log(respGetContractAddr)
            await sleep(1500);
            if (respGetContractAddr.contractAddress){
                console.log('success', respGetContractAddr.contractAddress)
                return;
            }
        }

    }

    const onSubmit = async (values) => {
        const { name, username, symbol, contractAddress } = values
        if (!contractAddress) {
            const req = await fetch(
                `https://api-eu1.tatum.io/v3/blockchain/token/deploy`,
                {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': process.env.REACT_APP_TATUM_API_KEY,
                },
                body: JSON.stringify({
                    chain: 'MATIC',
                    symbol: `${symbol}rvb`,
                    name: `${name}_Reverb`,
                    totalCap: '10000000',
                    supply: '10000000',
                    digits: 18,
                    address: wallet.address,
                    fromPrivateKey: process.env.REACT_APP_PRIVATE_KEY,

                })
                }
            );
            const resp = await req.json()
            pollTx(resp)
        }





        return;
    }
    
    return <>
        <h1>Artist Dashboard</h1>
        <Formik
            initialValues={{ name: "", username: "", symbol: "", contract: "" }}
            onSubmit={async (values) => {
                await new Promise((resolve) => setTimeout(resolve, 500));
                alert(JSON.stringify(values, null, 2));
            }}
            onSubmit={onSubmit}
        >
            <Form>
                <Label>Display Name</Label>
                <Field name="name" type="text" placeholder="Illenium" />
                <Label>Username</Label>
                <Field name="username" type="text" placeholder="@illenium" />
                <br/>
                <Label>Token Symbol</Label>
                <Field name="symbol" type="text" placeholder="$ILL" />
                <br/>
                <Label>Contract Address (optional)</Label>
                <Field name="contractAddress" type="text" placeholder="0x..." />
                <br/>
                <Button type="submit">Create Reverb Profile</Button>
            </Form>
        </Formik>
    </>;
}

export default NewArtist