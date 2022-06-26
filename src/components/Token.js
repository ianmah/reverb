
import styled from "styled-components";
import RoundImage from "./RoundImage";

const Container = styled.div`
    display: flex;
    background: rgba(179, 160, 255, 0.24);
    border-radius: 29px 7px 7px 29px;
    margin-bottom: 12px;   
`

const Abbr = styled.h1`
    font-family: 'Satoshi';
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 30px;
    margin-top: 12px;
`

const CoinName = styled.h3`
    font-family: 'Satoshi';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    display: flex;
    align-items: center;
    margin-right: 1em;
    margin-left: 1.5em;
    /* pale peach */

    color: #E3B2A8;
`

const Amount = styled.p`
    font-family: 'Satoshi';
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 30px;
    align-items: right;
    margin-left: auto;
    margin-right: 1em;

    color: #FFFFFF;
    margin-top: 12px;
`

const TokenImage = styled(RoundImage)`
    margin-right: 1em;
`

function Token({ image, abbr, name, amount, ...props }) {
    return <>
        <Container>
            <TokenImage src={image} height={55} width={55} />
            <Abbr>{abbr}</Abbr>
            <CoinName>{name}</CoinName>
            <Amount>{amount}</Amount>
        </Container>
    </>
}

export default Token