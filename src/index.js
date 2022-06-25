import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { WalletContextProvider } from "./utils/wallet";
ReactDOM.render(
  <React.StrictMode>
  <WalletContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </WalletContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
