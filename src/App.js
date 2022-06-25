import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHouse, faUser, faMagnifyingGlass, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Wallet from "./components/Wallet";
import ApolloProvider from "./components/Apollo";
import Card from "./components/Card";
import { useWallet } from "./utils/wallet";
import Song from "./pages/Song";
import NewArtist from "./pages/NewArtist";
import Outlet from "./pages/Outlet";
import GlobalStyle from "./theme/GlobalStyle";
import ThemeProvider from "./theme/ThemeProvider";
import VideoJS from './components/Video'
import Upload from "./components/Upload";

library.add(faHouse, faUser, faMagnifyingGlass, faSignOutAlt)

const Container = styled(Card)`
    max-width: 500px;
    margin: auto;
    margin-bottom: 3em;
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
    const { setAuthToken } = useWallet()
    return (
            <ApolloProvider>
                <ThemeProvider>
                    <GlobalStyle />

                    <Nav>
                        <Wallet />
                    </Nav>
                    
                    <Container>
                        <Routes>
                            <Route path="new-artist" element={<NewArtist/>}/>
                            <Route path="song" element={<Outlet />}>
                                <Route path=":id" element={<Song />} />
                            </Route>
                            <Route path="/" element={<>
                                <h1>Home</h1>
                                <Upload />
                            </>}/>
                        </Routes>
                    </Container>
                    <BottomNav>
                        <FontAwesomeIcon icon="fa-house" size="lg" />
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
