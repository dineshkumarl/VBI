import {Link, useToast} from '@chakra-ui/react';
import {useCallback } from 'react';
import { useStore } from '../App/store/useStore';
import { addSongIdInPlaylist } from './actions/playlist';
import { useProgressIndicator } from '../App/Common/AppProgressIndicator';

const AddSongButton = ({playlistId, songId})=>{
    const {dispatch} = useStore();
    const toast = useToast();
    const { showProgressIndicator, hideProgressIndicator} = useProgressIndicator();
    const addSongInPlaylist = useCallback(async (songId, playlistId)=>{
        showProgressIndicator();
       const [error, data]  = await addSongIdInPlaylist(songId, playlistId);
       if(!error){
        toast({
            title:"Song added successfully",
            status: "success",
            duration:3000
        });
       }else{
           toast({
               title:"Error in adding song to the playlist",
               status:"error",
               duration:4000
            })
           console.log(error);
       }
       hideProgressIndicator();
    },[dispatch])
    return (<Link onClick={()=>addSongInPlaylist(songId, playlistId)}>Add</Link>)
}

export default AddSongButton