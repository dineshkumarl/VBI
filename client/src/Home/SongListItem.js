import { Box, Center, Flex,Text } from "@chakra-ui/layout";
import {listItemInteractive} from '../App/styles/global';

export const SongListBox = ({children ,...rest})=>(
    <Flex  borderWidth="1px" marginLeft="10" marginRight="10" mt="2" mb="3" px="4px" {...listItemInteractive} {...rest} >
       {children}
    </Flex>)

export const SecondaryText = ({children ,...rest})=>(
    <Text fontStyle="italic" paddingLeft="2" paddingBottom="1" fontSize="xs" color={children.color || "gray.500"} {...rest}>{children}</Text>
)

export const SongInfo = ()=>{
    return ([
            <Text padding="2">Song Title</Text>,
            <SecondaryText>Singers</SecondaryText>,
            <SecondaryText color="gray.300">Album</SecondaryText>
        ])
}

export const SongDurationText = ()=>{
    return (<Text>{"00:10:00"}</Text>)
}

export const SongListItemWithAction = ({actionComponent})=>{
    return (<SongListBox >
        <Box w="70%">
            <SongInfo></SongInfo>
        </Box>
        <Center w="20%">
            <SongDurationText></SongDurationText>
        </Center>
        <Center w="10%">
           {actionComponent()}
        </Center>
    </SongListBox>)
}

const SongListItem = (props)=>{
    let i =0;
    return (<SongListBox cursor="default" >
        <Box w="70%">
            <SongInfo key={'sample_'+i}></SongInfo>
        </Box>
        <Center w="30%">
            <SongDurationText></SongDurationText>
        </Center>
    </SongListBox>)
}

export default SongListItem;