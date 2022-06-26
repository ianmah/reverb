import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHouse, faUser, faMagnifyingGlass, faSignOutAlt, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './App.css'
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
import NewSong from "./pages/NewSong";
import UserProfile from "./pages/UserProfile"
import Home from "./pages/Home";

const StyledLink = styled(Link)`
    color: white;
    transition: all 200ms ease-in-out;
    &:hover: {
        color: ${p=>p.theme.primary};
    }
`

library.add(faHouse, faUser, faMagnifyingGlass, faSignOutAlt, faSquarePlus)

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
                        <Route path="new-song" element={<NewSong/>}/>
                    </Routes>
                    
                        <Routes>
                            <Route path="new-artist" element={<Container><NewArtist/></Container>}/>
                            <Route path="/" element={<Container><Home/></Container>}/>
                            <Route path="user" element={<Container><UserProfile  profile={profile} /></Container>}/>
                            <Route path="wrap" element={<Container><Wrap/></Container>}/>
                        </Routes>
                    
                    <BottomNav>
                        <StyledLink to="/">
                            <FontAwesomeIcon icon="fa-house" size="lg" />
                        </StyledLink>
                        <FontAwesomeIcon icon="fa-magnifying-glass" size="lg"/>
                        <StyledLink to="/new-song">
                            <FontAwesomeIcon icon="fa-square-plus" size="lg"/>
                        </StyledLink>
                        <StyledLink to="/user">
                            <FontAwesomeIcon icon="fa-user" size="lg"/>
                        </StyledLink>
                        <StyledLink to="#">
                            <FontAwesomeIcon icon="fa-sign-out-alt" size="lg" onClick={() => {
                                window.sessionStorage.removeItem('lensToken')
                                window.sessionStorage.removeItem('signature')
                                setAuthToken('')
                                console.log('logged out')
                            }}/>
                        </StyledLink>
                    </BottomNav>
                </ThemeProvider>
            </ApolloProvider>
    );
}

export default App;
