
import styled from "styled-components";
import defImage from "../assets/default.png";

const Container = styled.div`
    width: 108px;
    height: 108px;
    display: flex;
    margin: 4px;
    background-image: url(${props => props.image});
    background-size: cover;
    border-radius: 9px;
`

const Title = styled.h1`
    font-family: 'Satoshi';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    color: #FFFFFF;
    position: relative;
    left: 10px;
    top: 60px;

`

const Name = styled.h2`
    font-family: 'Satoshi';
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 14px;
    /* identical to box height */
    position: relative;
    left: 10px;
    top: 52px;
    color: #FFFFFF;
`

const Artist = styled.div`
    display: block;
`

function Visualizer({ image, song, artist, ...props }) {
    return <>
        <Container image={image}>
            <Artist>
                <Title>{song}</Title>
                <Name>{artist}</Name>
            </Artist>
        </Container>
    </>
}

export default Visualizer