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
            <Text data-title={title} padding="2">{title}</Text>
            <SecondaryText>{singersNames}</SecondaryText>
            <SecondaryText color="gray.300">{albumName}</SecondaryText>
    </>)
}

export const SongDurationText = ({h, m, s})=>{
    const hrsTxt = `${h} h:`;
    const minTxt = `${m} m`;
    const scndsText = `${s} s`;
    return (<Text>{`${h?hrsTxt:''} ${m?minTxt:''} ${s?scndsText:''}`}</Text>)
}

SongDurationText.defaultProps = {h:0, m:0, s:0}

export const SongListItemWithAction = ({id, title, singers, album, duration, actionComponent})=>{
    return (<SongListBox key={id} >
        <Box w="70%">
            <SongInfo title={title} singers={singers} albumName={_get(album,'name')} key={'song_'+id}></SongInfo>
        </Box>
        <Center w="20%">
            <SongDurationText {...duration}></SongDurationText>
        </Center>
        <Center w="10%">
           {actionComponent()}
        </Center>
    </SongListBox>)
}

const SongListItem = ({id, title, singers, album, duration})=>{
    return (<SongListBox key={id} cursor="default" >
        <Box w="70%">
            <SongInfo title={title} singers={singers} albumName={_get(album,'name')} key={'song_'+id}></SongInfo>
        </Box>
        <Center w="30%">
            <SongDurationText {...duration}></SongDurationText>
        </Center>
    </SongListBox>)
}

export default SongListItem;