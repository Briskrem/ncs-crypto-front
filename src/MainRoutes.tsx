import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Home } from './Home'
import { Crypto } from './Crypto'
import { Navbar } from './NavComponents/Navbar'
import { SideBar } from './NavComponents/Sidebar'
import { useState } from 'react'


export const MainRoutes = () =>{

    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen) ;
    

    return (
        <div className='MainRouteContainer'>
            <BrowserRouter>
                <SideBar isOpen={isOpen} toggle={toggle} />
                <Navbar  toggle={toggle} />
                <Routes>
                    <Route  path={'/'} element={<Home />} />
                    <Route  path={'/crypto'} element={<Crypto />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}