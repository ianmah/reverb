import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

import ApolloProvider from "./components/Apollo";
import GlobalStyle from "./theme/GlobalStyle";
import ThemeProvider from "./theme/ThemeProvider";

function App() {
    return (
        <ApolloProvider>
            <ThemeProvider>
                <GlobalStyle />
                GM
            </ThemeProvider>
        </ApolloProvider>
    );
}

export default App;
