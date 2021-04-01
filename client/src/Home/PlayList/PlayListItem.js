import { Box, Center, Flex,Text } from "@chakra-ui/layout";
import {SecondaryText} from '../SongListItem';
import {listItemInteractive} from '../../App/styles/global';
import { Link as RouteLink } from 'react-router-dom';

const PlayListItem =()=>{
    return (<Flex as={RouteLink} to={'/playlists/1232'} {...listItemInteractive} m="10" borderWidth="1px" mt="2" mb="3" p="5" pl="3">
    <Box w="70%">
        <Text>PlayList name</Text>
    </Box>
    <Center w="30%">
       <SecondaryText fontSize="xs">Created at</SecondaryText>
    </Center>
</Flex>)
}

export default PlayListItem;