import {Link as RouteLink} from 'react-router-dom';
import { Flex, Spacer, Box, Avatar, Menu, MenuButton, MenuList, MenuItem, Image } from "@chakra-ui/react"

import {useAuth} from '../../Login/hooks/auth'

const VBIMenu = ()=>{
    const {user} = useAuth();
    return (
        <Menu>
            <MenuButton
                as={Avatar}
                aria-label="Options"
                size="sm"
            />
            <MenuList>
                {(!user.name)&&(<MenuItem id="loginButton" as={RouteLink} to="/login">Login</MenuItem>)}
                {(user.name)&&(<MenuItem as={RouteLink} to="/login">Logout</MenuItem>)}
            </MenuList>
        </Menu>
    )
}

const Header = ()=>{
    return <header>
        <Flex>
            <Box p="4">
                <Image src="/logo-v1.jpg" width="10" height="10" />
            </Box>
            <Spacer />
            <Box p="4">
               <VBIMenu />
            </Box>
        </Flex> 
        
    </header>
}
export default Header;