import { Box, Center, Flex,Text } from "@chakra-ui/layout";
import {listItemInteractive} from '../App/styles/global';
import _get from 'lodash.get';

export const SongListBox = ({children ,...rest})=>(
    <Flex  borderWidth="1px" marginLeft="10" marginRight="10" mt="2" mb="3" px="4px" {...listItemInteractive} {...rest} >
       {children}
    </Flex>)

export const SecondaryText = ({children ,...rest})=>(
    <Text fontStyle="italic" paddingLeft="2" paddingBottom="1" fontSize="xs" color={rest.color || "gray.500"} {...rest}>{children}</Text>
)

export const SongInfo = ({title, singers, albumName})=>{
    const singersNames = (singers || []).map((singer)=>singer.name).join(', ')
    return (<>
            <Text padding="2">{title}</Text>
            <SecondaryText>{singersNames}</SecondaryText>
            <SecondaryText color="gray.300">{albumName}</SecondaryText>
    </>)
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

const SongListItem = ({id, title, singers, album})=>{
    return (<SongListBox cursor="default" >
        <Box w="70%">
            <SongInfo title={title} singers={singers} albumName={_get(album,'name')} key={'song_'+id}></SongInfo>
        </Box>
        <Center w="30%">
            <SongDurationText></SongDurationText>
        </Center>
    </SongListBox>)
}

export default SongListItem;