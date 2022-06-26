import { useEffect } from 'react'
import { useWallet } from "../utils/wallet";
import Card from '../components/Card'
import RoundImage from '../components/RoundImage'
import SquareItem from '../components/SquareItem';
import styled from 'styled-components'
import Token from '../components/Token'
import bao from '../assets/bao.png'
import jayz from '../assets/jayz.jpg'
import alicia from '../assets/alicia.jpg'
import olivia from '../assets/olivia.jpg'

const Container = styled.div`
`

const Label = styled.label`
    display: block;
`

const Header = styled.div`
    display: flex;
    margin-bottom: 1.5em;
`

const UserText = styled.h1`
    width: 100%;
    font-family: 'Clash Display';
    font-style: normal;
    font-weight: 600;
    font-size: 28px;
    line-height: 34px;
    margin-top: 1em;
    margin-left: 1em;
    color: #FFFFFF;
`

const MinutesListenedText = styled.p`
    width: 100%;
    font-family: 'Satoshi';
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 14px;
    color: #FFFFFF;
    margin-top: -2em;
    margin-left: 3em;
`

const HeaderText = styled.h1`
    font-family: 'Clash Display';
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    line-height: 27px;

    color: #FFFFFF;
`

const Tokens = styled.div`
    display: block;
    margin-bottom: 2em;
`

const UserContainer = styled.div`
    display: grid;
`

const Collection = styled.div`
    margin-bottom: 0em;
`

const CollectionRow = styled.div`
    display: flex;
    justify-content: space-between;
`


const CollectionText = styled.p``

function UserProfile({ ...props }) {
    const { wallet, provider } = useWallet()
    
    return <Container>
        <Header>
            <RoundImage width={96} height={96} src={bao} />
            <UserContainer>
                <UserText>Vitalik Bieber</UserText>
                <MinutesListenedText>293,012 Minutes Listened</MinutesListenedText>
            </UserContainer>

        </Header>

        <Tokens>
            <HeaderText>Tokens Collected</HeaderText>
            <Token image={jayz} abbr={"$JZT"} name={"JAYZ.lens"} amount={"221"}></Token>
            <Token image={alicia} abbr={"$AKT"} name={"AliciaKeys.lens"} amount={"22"}></Token>
            <Token image={olivia} abbr={"$ORT"} name={"OliviaRodrigo.lens"} amount={"5"}></Token>
        </Tokens>

        <Collection>
            <HeaderText>{"Your Collection"}</HeaderText>
            <CollectionRow>
                <SquareItem title="VIP Access" />
                <SquareItem title="Merch" />
                <SquareItem title="Early Access" />
            </CollectionRow>
        </Collection>

        <Collection>
            <HeaderText>{"Available Awards"}</HeaderText>
            <CollectionRow>
                <SquareItem title="VIP Access" />
                <SquareItem title="Merch" />
                <SquareItem title="Early Access" />
            </CollectionRow>
        </Collection>
    </Container>
}

export default UserProfile