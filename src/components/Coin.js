
import styled from "styled-components";
import defImage from "../assets/default.png";

const Container = styled.div`
    background: rgba(179, 160, 255, 0.24);
    border-radius: 8px;
    margin: 1em;
    width: 54px;
    height: 54px;
`

const Title = styled.h1`
    font-family: 'Satoshi';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    /* identical to box height */


    color: #FFFFFF;
`

const Price = styled.h2`
    font-family: 'Satoshi';
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 14px;
    /* identical to box height */


    color: #FFFFFF;
`

function Coin({ price, name, ...props }) {
    return <>
        <Container>
            <Title>{name}</Title>
            <Price>{price}</Price>
        </Container>
    </>
}

export default Coin