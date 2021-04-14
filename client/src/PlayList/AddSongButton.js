import {Link, useToast} from '@chakra-ui/react';
import {useCallback } from 'react';
import { useStore } from '../App/store/useStore';
import { addSongIdInPlaylist } from './actions/playlist';
import _get from 'lodash.get';
import { useProgressIndicator } from '../App/Common/AppProgressIndicator';

const AddSongButton = ({playlistId, songId})=>{
    const {dispatch} = useStore();
    const toast = useToast();
    const { showProgressIndicator, hideProgressIndicator} = useProgressIndicator();
    const addSongInPlaylist = useCallback(async (songId, playlistId)=>{
        showProgressIndicator();
       const [error]  = await addSongIdInPlaylist(songId, playlistId);
       if(!error){
        toast({
            title:"Song added successfully",
            status: "success",
            duration:3000
        });
       }else{
           toast({
               title:(_get(error,'0.message') || "Error in adding song to the playlist"),
               status:"error",
               duration:3000,
               isClosable:true
            })
       }
       hideProgressIndicator();
    },[dispatch])
    return (<Link onClick={()=>addSongInPlaylist(songId, playlistId)}>Add</Link>)
}

export default AddSongButton