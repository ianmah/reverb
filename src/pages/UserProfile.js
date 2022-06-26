import { useEffect, useState } from 'react'
import { useWallet } from "../utils/wallet";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_PROFILES, GET_PUBLICATIONS } from "../utils/queries";
import { hexToDec } from "../utils";
import Card from '../components/Card'
import RoundImage from '../components/RoundImage'
import SquareItem from '../components/SquareItem';
import Nft from '../components/Nft'
import styled from 'styled-components'
import Token from '../components/Token'
import bao from '../assets/bao.png'
import avatar from '../assets/avatar.png'
import jayz from '../assets/jayz.jpg'
import alicia from '../assets/alicia.jpg'
import olivia from '../assets/olivia.jpg'
import nft1 from '../assets/nfts/nft1.png'
import nft2 from '../assets/nfts/nft2.png'
import nft3 from '../assets/nfts/nft3.png'

const Container = styled.div`
    margin-bottom: -1.5em;
`
const Icon = styled.div`
    height: 96px;
    width: 96px;
    border: #fff 4px solid;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(${p => p.href || avatar});
    background-size: cover;
    margin-bottom: -0.8em;
`;

const Label = styled.label`
    display: block;
`

const Header = styled.div`
    display: flex;
    margin-top: 0.5em;
    margin-bottom: 2em;
`

const UserText = styled.h1`
    width: 100%;
    font-family: 'Clash Display';
    font-style: normal;
    font-weight: 600;
    font-size: 28px;
    line-height: 34px;
    margin-left: 1em;
    color: #FFFFFF;
`
const Handle = styled.h4`
    font-weight: normal;
    margin-top: -0.5em;
    margin-left: 1.75em;
    padding-bottom: 1em;
`;

const MinutesListenedText = styled.p`
    width: 100%;
    font-family: 'Satoshi';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: #FFFFFF;
    margin-top: -1.5em;
    margin-left: 2.5em;
`

const HeaderText = styled.h1`
    font-family: 'Clash Display';
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    line-height: 27px;
    margin-top: 1em;
    color: #FFFFFF;
`
const Stats = styled.div`
    width: 330px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    margin-top: -1em;
    margin-bottom: 1.5em;
`;

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

function UserProfile({ profile }) {
    const { wallet, provider } = useWallet()
    console.log(profile)
    
    return <Container>
        <Header>
            <Icon href={profile.picture?.original?.url}/>
            <UserContainer>
                <UserText>{profile.name || profile.handle}</UserText>
                <Handle>@{profile?.handle}</Handle>
                <MinutesListenedText>293,012 Minutes Listened</MinutesListenedText>
            </UserContainer>
        </Header>
        <Stats>
            <p>{profile.stats?.totalFollowers} followers</p>
            <p>{profile.stats?.totalFollowing} following</p>
            <p>{profile.stats?.totalPublications} posts</p>
            <p>{profile.stats?.totalCollects} collects</p>
        </Stats>
        <Tokens>
            <HeaderText>Tokens Collected</HeaderText>
            <Token image={jayz} abbr={"$JZT"} name={"JAYZ.test"} amount={"221"}></Token>
            <Token image={alicia} abbr={"$AKT"} name={"AliciaKeys.test"} amount={"22"}></Token>
            <Token image={olivia} abbr={"$ORT"} name={"OliviaRodrigo.test"} amount={"5"}></Token>
        </Tokens>

        <Collection>
            <HeaderText>{"Your Collection"}</HeaderText>
            <CollectionRow>
                <Nft image={nft1} title="newartist.test" width={55}/>
                <Nft image={nft2} title="JAYZ.test" width={55}/>
                <Nft image={nft3} title="Dave.test" width={55}/>
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