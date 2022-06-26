
import styled from "styled-components";
import defImage from "../assets/default.png";

const Container = styled.div`
    width: 160px;
    height: 70px;
    display: flex;
    margin: 4px 0;
    background: rgba(179, 160, 255, 0.24);
    border-radius: 8px;
`

const Title = styled.h1`
    font-family: 'Satoshi';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    left: 11px;
    top: 10px;
    /* identical to box height */
    position: relative;

    color: #FFFFFF;
`

const Name = styled.h2`
    font-family: 'Satoshi';
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 14px;
    /* identical to box height */
    position: relative;
    left: 11px;
    top: 4px;
    color: #FFFFFF;
`

const Image = styled.img`
    border-radius: 8px;
    width: 70px;
    height: 70px;
    object-fit: cover;
`

const Artist = styled.div`
    display: block;
`

function NewSong({ image, song, artist, ...props }) {
    return <>
        <Container>
            <Image src={image} />
            <Artist>
                <Title>{song}</Title>
                <Name>{artist}</Name>
            </Artist>
        </Container>
    </>
}

export default NewSong