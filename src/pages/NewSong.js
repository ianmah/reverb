import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Formik, Field, Form } from 'formik'
import { useLazyQuery, useMutation } from '@apollo/client'
import { CREATE_PROFILE, AUTHENTICATION } from '../utils/queries'
import { useWallet } from '../utils/wallet'
import Button from '../components/Button'
import Upload from '../components/Upload'
import { sleep } from '../utils'


const Label = styled.label`
    display: block;
`

// const superTokenABI = require("@superfluid-finance/ethereum-contracts/build/contracts/ISuperToken.json").abi;


function NewArtist({ ...props }) {
    const [createProfile, createProfileData] = useMutation(CREATE_PROFILE);
    const [hashes, setHashes] = useState('')
    const { wallet, setToast } = useWallet()

    return <>
        <h1>New Song</h1>
        <Upload/>
    </>
}

export default NewArtist