import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';



export const Nav = styled.nav`
background: #36A3CF;  //#63D471 was original
height: 55px; /* originally 85px */
display: flex;
justify-content: space-between;
padding: 0.2rem calc((100vw - 1000px) / 2);
z-index: 12;
/* Third Nav */
/* justify-content: flex-start; */
`;

export const NavLink = styled(Link)`
color: white; //#808080 was original
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1rem;
height: 100%;
cursor: pointer;
&.active {
	color: #000000;
}
`;

export const Bars = styled(FaBars)`
display: none;
color: #808080;
@media screen and (max-width: 768px) {
	display: block;
	position: absolute;
	top: 0;
	right: 0;
	transform: translate(-100%, 75%);
	font-size: 1.8rem;
	cursor: pointer;
}
`;

export const NavMenu = styled.div`
display: flex;
align-items: center;
margin-right: -24px;
margin-left: 175px;
/* Second Nav */
/* margin-right: 24px; */
/* Third Nav */
/* width: 100vw;
white-space: nowrap; */
@media screen and (max-width: 768px) {
	display: none;
}
`;

export const NavBtn = styled.button`
border-radius: 4px;
background: white;  //#808080 was original
padding: 10px 22px;
color: #36A3CF; //#000000 was original
font-weight: bold;
outline: none;
border: none;
vertical-align: middle;
height: 35px;
margin-top: 10px;
align-items: center;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration: none;
/* Second Nav */
margin-left: 24px;
&:hover {
	transition: all 0.2s ease-in-out;
	background: #fff;
	color: #808080;
}
`;

export const NavGenericLink = styled(Link)`
`;

export const WalletButton = styled.button`
border - radius: 4px;
background: #F9FBFC;  //#808080 was original
padding: 10px 22px;
color: #36A3CF; //#000000 was original
font - weight: bold;
outline: none;
border: none;
vertical - align: middle;
height: 35px;
margin - top: 10px;
margin - right: 24px;
align - items: center;
cursor: pointer;
transition: all 0.2s ease -in -out;
text - decoration: none;
/* Second Nav */
margin - left: 24px;
&:hover {
	transition: all 0.2s ease -in -out;
	background: #fff;
	color: #808080;
}
`;

