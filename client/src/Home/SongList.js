import { Box } from '@chakra-ui/react';
// import { useState } from 'react';
// import {songListItemFactory} from './actions/songlists';
import Song from './SongListItem';
import SongSearchInput from './SongSearchInput';

const Songs =({songs})=>{

    // const [songsList, setSongsList] = useState(()=>[]);
    return (<Box>
        <SongSearchInput/>
       { [<Song key="1"></Song>, <Song key="2"></Song>, <Song key="3"></Song>, <Song key="4"></Song>]}
    </Box>)
}

export default Songs;