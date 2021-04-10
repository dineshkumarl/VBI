import { Box, Center, Spinner } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { useStore } from '../App/store/useStore';
import Song from './SongListItem';
import SongSearchInput from './SongSearchInput';

const Songs =()=>{
    const {state:{homePage}, dispatch} = useStore();
    const [isLoading, setIsLoading] = useState(false);
    
    const getSongsList = useCallback(()=>{
        return homePage.songsList.map((value, i)=><Song {...value} key={i}></Song>)
    },[homePage.songsList]);

    const songListUpdate = useCallback((list)=>{
        dispatch({type: 'UPDATE_SONG_LIST', value:list});
    },[dispatch])

    const updateLoading = useCallback((value)=> setIsLoading(value),[setIsLoading])

    return (
        <>
            {(<Box>
                <SongSearchInput songListUpdate={songListUpdate} loadFlagUpdate={updateLoading} />
                {(isLoading) && (<Center mt="100"><Spinner size="xl" /></Center>)}
                {(!isLoading) && (homePage.songsList.length > 0) && (getSongsList())}
            </Box>)}
        </>
    )
}

export default Songs;