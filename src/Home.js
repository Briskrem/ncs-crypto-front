import {NavItem, NavLinks} from './/NavComponents/Navbar/NavbarElements'
import styled from 'styled-components'
import {Link as LinkR} from 'react-router-dom'
import './styles/Home.css'


export const Home = () => {
    console.log('REFRESHES IN HOME.JS')

    const NavLinks = styled(LinkR)`
    position: relative;
    color: yellow;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 15rem;
    width: 15rem;
    cursor: pointer;
    border: 1px solid black;
    border-radius: 50%;
    background: rgba(23, 23, 23, .5);
    box-shadow: 0 0 10px black,
    0 0 20px black,
    0 0 40px black;
    justify-content: center;
    animation: swell 2s ease infinite;
    animation-timing-function: linear;

    &:after{
        position: absolute;
        content: '';
        height: 100%;
        width: 100%;
        border-radius: 50%;
        border: 2px solid black;
        animation: pulse 2s ease infinite;
    }

    &.active{
        border-bottom: 3px solid #01bf71;
    }
`
    return (
        <div className="Home" onClick={()=>console.log('uome')}>
            HOME PAGE WELCOME TO CRYPTO

            <NavLinks to='/crypto'>CRYPTO</NavLinks>
            <a href="https://www.freepik.com/free-vector/royal-watercolor-valentine-red-background_1541365.htm#query=red%20background&position=5&from_view=keyword">Image by Sketchepedia</a> on Freepik
        </div>
    )
}