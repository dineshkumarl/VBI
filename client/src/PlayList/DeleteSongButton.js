import {Link, useToast} from '@chakra-ui/react';
import {useCallback } from 'react';
import { useStore } from '../App/store/useStore';
import { deleteSongIdInPlaylist } from './actions/playlist';
import _get from 'lodash.get';
import { useProgressIndicator } from '../App/Common/AppProgressIndicator';

const DeleteSongButton = ({playlistId, songId})=>{
    const {dispatch} = useStore();
    const toast = useToast();
    const { showProgressIndicator, hideProgressIndicator} = useProgressIndicator();
    const deleteSongInPlaylist = useCallback(async()=>{
        showProgressIndicator();
        const [error, data]  = await deleteSongIdInPlaylist(songId, playlistId);
        if(error || (data && data.errors)){
            toast({
                title:"Error in removing the song.",
                status: "error",
                duration:4000
            });
        }else{
            dispatch({type: 'UPDATE_CURRENT_SONG_LIST', value: _get(data,'songs')});
            toast({
                title:"Song deleted successfully",
                status: "success",
                duration:3000
            });
        }
        hideProgressIndicator();
    },[dispatch, songId, playlistId])

    return (<Link onClick={deleteSongInPlaylist}>Remove</Link>)
}

export default DeleteSongButton;