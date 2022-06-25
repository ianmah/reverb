import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

import { WalletContextProvider } from "./utils/wallet";
import Wallet from "./components/Wallet";
import ApolloProvider from "./components/Apollo";
import GlobalStyle from "./theme/GlobalStyle";
import ThemeProvider from "./theme/ThemeProvider";

function App() {
    return (
        <WalletContextProvider>
            <ApolloProvider>
                <ThemeProvider>
                    <GlobalStyle />
                    <Wallet />
                    GM
                </ThemeProvider>
            </ApolloProvider>
        </WalletContextProvider>
    );
}

export default App;
