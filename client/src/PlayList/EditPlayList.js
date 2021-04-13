import { Box, Button, Flex, Spacer, Link, Center, useToast } from '@chakra-ui/react';
import SongSearchInput from '../Home/SongSearchInput';
import {SongListItemWithAction} from '../Home/SongListItem';
import { useCallback, useEffect, useState } from 'react';
import { Link as RouteLink, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import _get from 'lodash.get';
import {getPlayListDetailById, deleteSongIdInPlaylist} from './actions/playlist';

import {ToggleButton} from '../App/Common/ToggleButton'
import {useProgressIndicator} from '../App/Common/AppProgressIndicator';
import { useStore } from '../App/store/useStore';
import AddSongButton from './AddSongButton';
import DeleteSongButton from './DeleteSongButton';

const PlayListActionButton = (props)=>(<Button bg="teal.400" color="white" mr="4" _hover={
    {bg:"teal.500"}
} {...props} >{props.children}</Button>);


const EditPlayList =()=>{
    const {state:{playLists}, dispatch} = useStore();
    const [isOn, setToggleOn] = useState(false);
    const {id} = useParams();
    const toast = useToast();
    const [playlistName, setPlaylistName] = useState(()=>{
        return ""
    })
    const { showProgressIndicator, hideProgressIndicator} = useProgressIndicator();
    const playListDetailsMatch = useRouteMatch('/playlists/:id');

    const setSongsList = useCallback((list)=>{
        dispatch({type: 'UPDATE_CURRENT_SONG_LIST', value: list});
    },[dispatch])

    const setSearchedSongList = useCallback((list)=>{
        dispatch({type:'UPDATE_SEARCHED_SONG_LIST', value: list});
    },[dispatch])

    const updatePlayListDetail = useCallback(async ()=>{
        const [error, data] = await getPlayListDetailById(id);
        if(!error){
            setSongsList(_get(data,'[0].songs'));
            setPlaylistName(_get(data,'[0].name', ''))
        }else{
            setSongsList([]);
            toast({
                title:"Error in fetching the songs list",
                duration:3000,
                status:"error"
            });
        }
    },[id])

    useEffect(async ()=>{
        if(playListDetailsMatch.isExact){
            //landed on edit songs route, load the playlist detail
            showProgressIndicator();
            await updatePlayListDetail();
            hideProgressIndicator();
        }else{
            //landed on add songs route, so reset previosly searched list 
            setSearchedSongList([]);
        }
    },[playListDetailsMatch.isExact])


    const getSongListWithDeleteAction = useCallback(()=>{
        if(!playLists.currentSongList || playLists.currentSongList.length ===0){
            return <Center mt="30" color="gray.500" fontStyle="italic">No Songs in the playlist</Center>
        }else{
            return (playLists.currentSongList || []).map(
                (value)=>
                    <SongListItemWithAction
                    {...value}
                     actionComponent={
                         ()=><DeleteSongButton songId={value._id} playlistId={id}></DeleteSongButton>
                     }>
                     </SongListItemWithAction>)
        }
    },[playLists.currentSongList, id]);

    const getSongListWithAddAction = useCallback(()=>{
        if(!playLists.searchedSongList || playLists.searchedSongList.length ===0){
            return <Center mt="30" color="gray.500" fontStyle="italic">No Songs found for the search Term</Center>
        }else{
            return (playLists.searchedSongList || []).map(
                (value)=>
                    <SongListItemWithAction
                    {...value}
                     actionComponent={
                         ()=><AddSongButton songId={value._id} playlistId={id} ></AddSongButton>
                     }>
                     </SongListItemWithAction>)
        }
    },[playLists.searchedSongList, id])
    
    return (<Box>
                <Switch>
                    <Route exact path="/playlists/:id/addsongs">
                       <Box m={5}>{playlistName} - Editable</Box>
                       <SongSearchInput 
                       loadFlagUpdate = {()=>{}}
                       songListUpdate = {setSearchedSongList} 
                       rightElement={
                         <Button as={RouteLink} to={`/playlists/${id}`} size="sm" mt="2.5">Cancel</Button>
                       }/>
                       {getSongListWithAddAction()}
                    </Route>
                    <Route path="/">
                        <Box  m={5}>{playlistName} - Editable</Box>
                        <Flex>
                            <Spacer />
                            <Box m="2" mr="10">
                                <ToggleButton mr="4" isOn={isOn} onChange={()=>setToggleOn(!isOn)}>Shuffle Play {isOn? "on" :"off"}</ToggleButton>
                                <PlayListActionButton as={RouteLink} to={`/playlists/${id}/addsongs`}>Add Song</PlayListActionButton>
                            </Box>
                        </Flex>
                        <Box>
                            {getSongListWithDeleteAction()}
                        </Box>
                    </Route>
                </Switch>
            </Box>)
}

export default EditPlayList