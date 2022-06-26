import { useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useLazyQuery, useMutation } from '@apollo/client'
import { useWallet } from '../utils/wallet'
import Button from '../components/Button'
import Upload from '../components/Upload'
import { sleep } from '../utils'


const Label = styled.label`
    display: block;
`

function Song({ ...props }) {
    const { wallet } = useWallet()
    const params = useParams();

    console.log(params)

    return <>
        <Upload/> 
        <h1>SINGLE</h1>
    </>;

}

export default Song