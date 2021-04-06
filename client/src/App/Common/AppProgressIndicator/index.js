import { Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import React, { useContext } from "react";
import {useAppProgressIndicator} from './hooks';

export const progressIndContext = React.createContext(false);

export const useProgressIndicator = ()=>{
    return useContext(progressIndContext);
}

export const AppProgressIndicatorProvider = ({children})=>{
    const value = useAppProgressIndicator(false);
    return (<progressIndContext.Provider value={value}>
        {children}
    </progressIndContext.Provider>)
}

export const AppProgressIndicator = ()=>{
    return (<Center width="100%" height="100%" as="section" zIndex={Number.MAX_SAFE_INTEGER} backgroundColor="rgba(0,0,0,0.6)" position="fixed">
    <Spinner size="lg"/>
</Center>)
}

export default AppProgressIndicator;