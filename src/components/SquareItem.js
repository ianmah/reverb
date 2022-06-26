
import styled from "styled-components";
import defImage from "../assets/default.png";

const Container = styled.div`
`

const Image = styled.img`
    border-radius: 4px;
    width: 106px;
    height: 106px;
    opacity: 60%;
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
    bottom: 35px;

    color: #FFFFFF;
`

function SquareItem({ image, title, ...props }) {
    return <>
        <Container>
            <Image src={image ?? defImage} height={55} width={55} />
            {title && <Title>{title}</Title>}
        </Container>
    </>
}

export default SquareItem