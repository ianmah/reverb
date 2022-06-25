import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHouse, faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { WalletContextProvider } from "./utils/wallet";
import Wallet from "./components/Wallet";
import ApolloProvider from "./components/Apollo";
import Card from "./components/Card";
import Song from "./pages/Song";
import NewArtist from "./pages/NewArtist";
import Outlet from "./pages/Outlet";
import GlobalStyle from "./theme/GlobalStyle";
import ThemeProvider from "./theme/ThemeProvider";

library.add(faHouse, faUser, faMagnifyingGlass)

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
    return (
        <WalletContextProvider>
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
                            </>}/>
                        </Routes>
                    </Container>
                    <BottomNav>
                        <FontAwesomeIcon icon="fa-house" size="lg" />
                        <FontAwesomeIcon icon="fa-magnifying-glass" size="lg"/>
                        <FontAwesomeIcon icon="fa-user" size="lg"/>
                    </BottomNav>
                </ThemeProvider>
            </ApolloProvider>
        </WalletContextProvider>
    );
}

export default App;
