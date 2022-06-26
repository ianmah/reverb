
import styled from "styled-components";
import defImage from "../assets/default.png";

const Container = styled.div`
    width: 332px;
    height: 108px;
    display: flex;
    margin: 1em 0;
    border-radius: 8px;
`

const Title = styled.h1`
    font-family: 'Satoshi';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    /* identical to box height */


    color: #FFFFFF;

    left: 20px;
    top: 10px;
    /* identical to box height */
    position: relative;
`

const Name = styled.h2`
    font-family: 'Satoshi';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;

    color: #FFFFFF;

    position: relative;
    left: 20px;
    top: 6px;
`

const ReleasingIn = styled.p`
font-family: 'Satoshi';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 16px;
display: inline-block;
color: #FFFFFF;
margin-right: 4px;`

const Time = styled.p`
font-family: 'Satoshi';
font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 16px;
display: inline-block;
color: #F0856D;
`

const Image = styled.img`
    border-radius: 8px;
    width: 108px;
    height: 108px;
    object-fit: cover;
`

const Artist = styled.div`
    display: block;
    left: 40px;
`

const ReleaseDate = styled.div`
position: relative;
top: 18px;
left: 20px;
`

function NewSongDetailed({ image, song, artist, time, ...props }) {
    return <>
        <Container>
            <Image src={image} />
            <Artist>
                <Title>{song}</Title>
                <Name>{artist}</Name>
                <ReleaseDate>
                <ReleasingIn>{"Releasing in"}</ReleasingIn><Time>{time}</Time>
                </ReleaseDate>
            </Artist>
        </Container>
    </>
}

export default NewSongDetailed