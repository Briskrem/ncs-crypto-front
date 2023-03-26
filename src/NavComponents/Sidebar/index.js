import { SideBarContainer, Icon, CloseIcon, SideBarWrapper, SideBarLink, 
    SidebarRoute, SideBarMenu, SideBtnWrap , NavItem} from "./sbElements"

export const SideBar = ({isOpen, toggle}) => {

    return (
        // isOpen is used here and not in Navbar because here is the entry point to aside css conditionals
        <SideBarContainer isOpen={isOpen} onClick={toggle}>
            <Icon >
                <CloseIcon />
            </Icon>
            <SideBarWrapper>
                <SideBarMenu>
                    <NavItem>
                        <SideBarLink to='/'>HOME</SideBarLink>
                    </NavItem>
                    <NavItem>
                        <SideBarLink to='/crypto'>CRYPTO</SideBarLink>
                    </NavItem>
                    <NavItem>
                        <SideBarLink to='/'>STOCKS</SideBarLink>
                    </NavItem>
                    <NavItem>
                        <SideBarLink to='/'>LOGIN</SideBarLink>
                    </NavItem>
                    <NavItem>
                        <SideBarLink to='/'>LOGOUT</SideBarLink>
                    </NavItem>
                </SideBarMenu>
            </SideBarWrapper> 
        </SideBarContainer>
    )
}