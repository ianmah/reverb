import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

import { WalletContextProvider } from "./utils/wallet";
import Wallet from "./components/Wallet";
import ApolloProvider from "./components/Apollo";
import NewArtist from "./pages/NewArtist";
import GlobalStyle from "./theme/GlobalStyle";
import ThemeProvider from "./theme/ThemeProvider";

const Container = styled.div`
    max-width: 500px;
    margin: auto;
    background: #eeeeee18;
    padding: 1em 2em 2em 2em;
    border-radius: 1em;
`

const Nav = styled.div`
    display: flex;
    justify-content: end;
    padding: 0.5em;
    margin-bottom: 1em;
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
                        </Routes>
                    </Container>
                </ThemeProvider>
            </ApolloProvider>
        </WalletContextProvider>
    );
}

export default App;
