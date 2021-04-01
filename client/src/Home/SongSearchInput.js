import { Input, Box } from '@chakra-ui/react';

const SongSearchInput = ()=>{
    // make song search call and update the callback
    return (<Box m="3"> 
    <Input placeholder="Search for Songs..." size="lg" />
</Box>)
}

export default SongSearchInput;