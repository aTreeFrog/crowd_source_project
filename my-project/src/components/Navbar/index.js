import React from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
    WalletButton,
    NavGenericLink
} from './NavbarElements';

import logo from '../../logo.svg';
import { connectWallet, getCurrentWalletConnected } from "../../utils/interact.js";
import { useEffect, useState } from 'react';
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";



//I think this creates the /about to the websight page. So it opens a new page which is cool. 
export const Navbar = () => {
    const [walletAddress, setWallet] = useState("");
    const [searchValue, setSearch] = useState("");

    const connectWalletPressed = async () => {

        const walletResponse = await connectWallet();
        setWallet(walletResponse.address);
    };

    return (
        <>
            <Nav>
                <NavGenericLink to=''>
                    <img style={{ width: '100px', height: '50px' }} src={logo} className="App-logo" alt="logo" />
                </NavGenericLink>
                <Bars />
                <div className="search">
                    <div className="searchInputs">
                        <input type="text" placeholder="search" />
                        <div className="searchIcon">
                            <SearchIcon />
                        </div>
                    </div>
                </div>

                <NavGenericLink to='/createprojectpage'>
                    <NavBtn >Create Project </NavBtn>
                </NavGenericLink>
                <NavBtn onClick={connectWalletPressed}>
                    {walletAddress.length > 0 ? (
                        "Connected: " +
                        String(walletAddress).substring(0, 6) +
                        "..." +
                        String(walletAddress).substring(38)
                    ) : (
                        <span>Connect Wallet</span>
                    )}
                </NavBtn>
            </Nav>
        </>
    );
};

export const Navbar2 = () => {
    return (
        <>
            <Nav>
                <Bars />

                <NavMenu>
                    <NavLink to='/myprojects' activeStyle>
                        My Projects
                    </NavLink>
                    <NavLink to='/trending' activeStyle>
                        Trending
                    </NavLink>
                    <NavLink to='/new' activeStyle>
                        New
                    </NavLink>
                    <NavLink to='/all' activeStyle>
                        All
                    </NavLink>
                    {/* Second Nav */}
                    {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;

