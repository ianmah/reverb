import { useEffect, useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

import { WalletContextProvider } from "./utils/wallet";
import Wallet from "./components/Wallet";
import ApolloProvider from "./components/Apollo";
import GlobalStyle from "./theme/GlobalStyle";
import ThemeProvider from "./theme/ThemeProvider";
import VideoJS from './components/Video'
import Upload from "./components/Upload";

function App() {

    return (
        <WalletContextProvider>
            <ApolloProvider>
                <ThemeProvider>
                    <GlobalStyle />
                    <Wallet />
                    {/* <VideoJS /> */}
                    <Upload />
                </ThemeProvider>
            </ApolloProvider>
        </WalletContextProvider>
    );
}

export default App;
