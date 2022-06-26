import { useEffect } from 'react'
import { useWallet } from "../utils/wallet";
import RoundImage from '../components/RoundImage'
import Button from '../components/Button'
import styled from 'styled-components'
import bonnybNft from '../assets/nfts/bonnybnft.png'
import Nft from '../components/Nft';

const Container = styled.div``

const Coins = styled.div`
    overflow-y: auto;
    display: flex;
`

const Collection = styled.div`
    margin-bottom: 2em;
`

const CollectionRow = styled.div`
    display: flex;
    justify-content: space-between;
`

const HeaderText = styled.h1`
    font-family: 'Clash Display';
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    line-height: 27px;

    color: #FFFFFF;
`

const ArtistHeader = styled.div`
    align-items: center;
    text-align: center;
`

const NewSongCollection = styled.div`
`

const Title = styled.h1`
font-family: 'Clash Display';
font-style: normal;
font-weight: 1000;
font-size: 28px;
line-height: 34px;
text-align: center;

color: #FFFFFF;`

const NewSongRow = styled.div`
    display: flex;
    justify-content: space-between;
`

const NftContainer = styled.div`
    align-items: center;
`

const Price = styled.h1`
font-family: 'Satoshi';
font-style: normal;
font-weight: 500;
font-size: 32px;
line-height: 43px;
text-align: center;
color: #F0856D;`

const StyledButton = styled(Button)`
margin-left: 110px;
margin-bottom: 1em;
text-align: center;`

const StyledNft = styled(Nft)`
left: 4em;
margin-left: 4em;
padding-left: 4em;`

const Description = styled.p`
text-align: center;`

function Artist({ image, name, link, ...props }) {
    const { wallet, provider } = useWallet()
    
    return <Container>
        <ArtistHeader>
            <RoundImage src={image} height={96} width={96}/>
            <Title>{name}</Title>
        </ArtistHeader>
        <NftContainer>
            <StyledNft image={bonnybNft} width={303} height={300}/>
            <Price>500 MATIC</Price>
            <StyledButton theme={{primary: '#f0856d'}}>Mint</StyledButton>
            <Description>Mint this creator NFT to start earning tokens and receiving exclusive access to a thriving community, merch, and more!</Description>
        </NftContainer>
    </Container>
}

export default Artist