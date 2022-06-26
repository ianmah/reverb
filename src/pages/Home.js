import { useEffect } from 'react'
import { useWallet } from "../utils/wallet";
import Coin from "../components/Coin"
import styled from 'styled-components'
import artist1 from '../assets/artists/artist1.png'
import artist2 from '../assets/artists/artist2.png'
import artist3 from '../assets/artists/artist3.png'
import artist4 from '../assets/artists/artist4.png'
import artist5 from '../assets/artists/artist5.png'
import artist6 from '../assets/artists/artist6.png'
import artist7 from '../assets/artists/artist7.png'
import artist8 from '../assets/artists/artist8.png'
import ye from '../assets/artists/ye.jpg'
import visualizer1 from '../assets/visualizers/visualizer1.png'
import visualizer2 from '../assets/visualizers/visualizer2.png'
import visualizer3 from '../assets/visualizers/visualizer3.png'
import visualizer4 from '../assets/visualizers/visualizer4.png'
import visualizer5 from '../assets/visualizers/visualizer5.png'
import visualizer6 from '../assets/visualizers/visualizer6.png'
import NewSong from '../components/NewSong'
import NewSongDetailed from '../components/NewSongDetailed';
import Visualizer from '../components/Visualizer';
import { Link } from 'react-router-dom'

const Container = styled.div`
    border-radius: 8px;`;

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

const NewSongCollection = styled.div`
`

const NewSongRow = styled.div`
    display: flex;
    justify-content: space-between;
`

function Home({ ...props }) {
    const { wallet, provider } = useWallet()
    
    return <Container>
        <Collection>
            <HeaderText>{"Discover New Artists 👀"}</HeaderText>
            <NewSongCollection>
                <NewSongRow>
                    <NewSong image={artist7} song={"Bae"} artist={"yung money"}/>
                    <NewSong image={artist2} song={"i miss u"} artist={"Sponge"}/>
                </NewSongRow>
                <NewSongRow>
                    <NewSong image={artist3} song={"1 love"} artist={"dame"}/>
                    <NewSong image={artist4} song={"the one"} artist={"SHAQ"}/>
                </NewSongRow>
                <NewSongRow>
                    <NewSong image={artist5} song={"playlist"} artist={"Spin"}/>
                    <NewSong image={artist6} song={"tis a bop"} artist={"bbno!"}/>
                </NewSongRow>
            </NewSongCollection>
        </Collection>

        <Collection>
            <HeaderText>{"Be an Early Listener"}</HeaderText>
            <Link to="/song/0x12-123">
            <NewSongDetailed image={ye} song={"Empire State of Heart"} artist={"JAYZ.lens ft Alicia.lens"} time={"1d 12h 47m"}/>
            </Link>
            <NewSongDetailed image={artist8} song={"fresh new song"} artist={"freshnewartist.lens"} time={"0d 06h 52m"}/>            
        </Collection>

        <Collection>
        <HeaderText>{"Hot Visualizers!"}</HeaderText>
        <NewSongRow>
            <Visualizer image={visualizer1} song={"hey hey"} artist={"dame"}/>
            <Visualizer image={visualizer2} song={"silly"} artist={"bean toes"}/>
            <Visualizer image={visualizer3} song={"honey"} artist={"mon"}/>
        </NewSongRow>
        <NewSongRow>
            <Visualizer image={visualizer4} song={"rockets only"} artist={"j0sh"}/>
            <Visualizer image={visualizer5} song={"moon"} artist={"cake"}/>
            <Visualizer image={visualizer6} song={"WAGMI"} artist={"Vitalik"}/>
        </NewSongRow>
        </Collection>
    </Container>
}

export default Home