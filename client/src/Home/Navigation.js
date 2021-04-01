import {Button, ButtonGroup} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import {
    Link as RouteLink,
    useLocation
  } from "react-router-dom";

const PLAYLIST_REGEX = /^\/playlists\// 

const ROUTE_MAP = {
    '/':0,
    '/playlists':1
}

const NavButton = (props)=>(<Button height="55px" width="200px" size="lg" borderColor="green.500" {...props} ></Button>)

const Navigation = ()=>{
    const {pathname} = useLocation();

    const getSanitizedPathName = useCallback(()=>{
        let pathNameCopy = pathname;
        if(PLAYLIST_REGEX.test(pathNameCopy)){
            pathNameCopy = '/playlists';
        }
        return pathNameCopy;
    },[pathname]);

    const [activeElementIndex, setActiveElementIndex] = useState(()=>{
        return ROUTE_MAP[getSanitizedPathName()]
    })
    useEffect(()=>{
        console.log()
        setActiveElementIndex(ROUTE_MAP[getSanitizedPathName()]);
    },[getSanitizedPathName])

    return (<ButtonGroup colorScheme="teal" isAttached={true}>
        <NavButton  as={RouteLink} to="/" isActive={activeElementIndex===0}>Songs</NavButton>
        <NavButton as={RouteLink} to="/playlists" isActive={activeElementIndex === 1}>Playlists</NavButton>
</ButtonGroup>)
}

export default Navigation;