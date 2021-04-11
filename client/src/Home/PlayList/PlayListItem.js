import { Box, Center, Flex,Text } from "@chakra-ui/layout";
import {SecondaryText} from '../SongListItem';
import {listItemInteractive} from '../../App/styles/global';
import { Link as RouteLink } from 'react-router-dom';
import dayjs from 'dayjs';
import { useCallback } from "react";

const PlayListItem =({id, name, created})=>{
    const creadtedDate = useCallback(()=>{
        return dayjs(new Date(created)).format('DD/MM/YYYY')
    },[created])
    return (<Flex id={id} as={RouteLink} to={`/playlists/${id}`} {...listItemInteractive} m="10" borderWidth="1px" mt="2" mb="3" p="5" pl="3">
    <Box w="70%">
        <Text>{name}</Text>
    </Box>
    <Center w="30%">
       <SecondaryText fontSize="xs">{creadtedDate()}</SecondaryText>
    </Center>
</Flex>)
}

export default PlayListItem;