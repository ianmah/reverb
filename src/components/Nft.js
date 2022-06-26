
import styled from "styled-components";
import defImage from "../assets/default.png";

const Container = styled.div`
`

const Image = styled.img`
    animation: spin 4s ease infinite;
    width: 92px;
    height: 109px;

    &:hover !important {
        animation: shiny 3s linear infinite;
    }
`

const Shine = styled.div`
    width: 600px;
    height: 500px;
    margin-top: -500px;
    z-index: 600;
    animation: shiny 3s linear infinite;
    transform: translateY(0);
    background: linear-gradient(to right, transparent 25%, #fff 50%, transparent 75%);
    background-repeat: no-repeat;
`

const Title = styled.h1`
    position: relative;
    align-items: center; 
    font-family: 'Satoshi';
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 18px;
    text-align: center;
    bottom: 2px;
    margin: 3px 0;
    color: #FFFFFF;
    left: 4px;
`

function Nft({ image, title, ...props }) {
    return <>
        <Container>
            <Image src={image ?? defImage} height={55} width={55} />
            <Title>{title}</Title>
        </Container>
    </>
}

export default Nft