import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHouse, faUser, faMagnifyingGlass, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Wallet from "./components/Wallet";
import ApolloProvider from "./components/Apollo";
import Card from "./components/Card";
import Toast from "./components/Toast";
import { useWallet } from "./utils/wallet";
import Song from "./pages/Song";
import NewArtist from "./pages/NewArtist";
import Wrap from "./pages/Wrap";
import Outlet from "./pages/Outlet";
import GlobalStyle from "./theme/GlobalStyle";
import ThemeProvider from "./theme/ThemeProvider";
import VideoJS from './components/Video'
import NewSong from "./pages/NewSong";
import UserProfile from "./pages/UserProfile"

const StyledLink = styled(Link)`
    color: white;
    transition: all 200ms ease-in-out;
    &:hover: {
        color: ${p=>p.theme.primary};
    }
`

library.add(faHouse, faUser, faMagnifyingGlass, faSignOutAlt)

const Container = styled(Card)`
    max-width: 500px;
    margin: auto;
    margin-bottom: 4em;
    @media (max-width: 768px) {
      margin: 0.5em;
    }
`

const Nav = styled.div`
    display: flex;
    justify-content: end;
    padding: 0.5em;
    margin-bottom: 1em;
`

const BottomNav = styled.div`
    position: fixed;
    bottom: 0;
    height: 3em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${p=>p.theme.lightBackground};
    width: 100vw;
    box-sizing: border-box;
    padding: 0 3em;
`

function App() {
    const { setAuthToken, toast } = useWallet()
    const [profile, setProfile] = useState({})

    return (
            <ApolloProvider>
                <ThemeProvider>
                    <GlobalStyle />
                    <Toast type={toast.type}>{toast.msg}</Toast>

                    <Nav>
                        <Wallet setProfile={setProfile} profile={profile}/>
                    </Nav>
                    <Routes>
                        <Route path="song" element={<Outlet />}>
                            <Route path=":id" element={<Song />} />
                        </Route>
                    </Routes>
                    
                    <Container>
                        <Routes>
                            <Route path="new-artist" element={<NewArtist/>}/>
                            <Route path="/" element={<>
                                <h1>Home</h1>
                            </>}/>
                            <Route path="user" element={<UserProfile />}/>
                            <Route path="wrap" element={<Wrap/>}/>
                            <Route path="new-song" element={<NewSong/>}/>
                        </Routes>
                    </Container>
                    <BottomNav>
                        <StyledLink to="/">
                            <FontAwesomeIcon icon="fa-house" size="lg" />
                        </StyledLink>
                        <FontAwesomeIcon icon="fa-magnifying-glass" size="lg"/>
                        <FontAwesomeIcon icon="fa-user" size="lg"/>
                        <FontAwesomeIcon icon="fa-sign-out-alt" size="lg" onClick={() => {
                            window.sessionStorage.removeItem('lensToken')
                            window.sessionStorage.removeItem('signature')
                            setAuthToken('')
                            console.log('logged out')
                        }}/>
                    </BottomNav>
                </ThemeProvider>
            </ApolloProvider>
    );
}

export default App;
