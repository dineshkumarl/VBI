import {Box,Button, Center, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,Input } from '@chakra-ui/react';
import PlayListItem from './PlayListItem';
import { AddIcon } from '@chakra-ui/icons';
import { useCallback,  useEffect,  useMemo,  useState } from 'react';
import {useStore} from '../../App/store/useStore';
import {createPlayList, getPlayLists} from '../actions/playlist';
import _get from 'lodash.get';

const CreatePlayListModal = ({onClose, playListCreateSuccess, payListCreateFailed, ...rest})=>{
    
     const [name, setName] = useState('');

     const createClick = useCallback(async ()=>{
       const [error, playlist] =  await createPlayList(name);
       if(error){
        payListCreateFailed && payListCreateFailed(error)
       }else{
         playListCreateSuccess && playListCreateSuccess(playlist);
       }
     },[name])

    return (<Modal {...rest} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Please Enter a Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input autoComplete="false" variant="filled" placeholder="Name..." onChange={(e)=>{setName(e.target.value)}} />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={name.length===0} onClick={createClick} colorScheme="teal">Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>)
}

const PlayLists =()=>{
    const { isOpen, onOpen, onClose } = useDisclosure();

    const {state, dispatch} = useStore();

    useEffect(async ()=>{
      const [error, {playlists}] =  await getPlayLists();
      if(!error){
        dispatch({type:'UPDATE_PLAYLISTS_LIST', value:playlists});
      }else{
        //TODO: show error message in popup
        console.error('Error retreiving playlists for your profile');
      }
    },[])

    const getPlayListsComponents = useCallback(()=>{
      return _get(state,'playLists.list',[]).map((value)=>(<PlayListItem name={value.name} created={value.created} id={value._id} key={value.id} />))
    },[_get(state,'playLists.list.length',0)]);

    const updatePlayList = useCallback((newPlayList)=>{
      let currentPlayLists = _get(state,'playLists.list',[]);
      currentPlayLists.push(newPlayList)
      dispatch({type:'UPDATE_PLAYLISTS_LIST', value: currentPlayLists});
      onClose();
    },[])
    
    return (<Box>
        <CreatePlayListModal isOpen={isOpen} onClose={onClose} playListCreateSuccess={updatePlayList} payListCreateFailed={()=>null} />
        {getPlayListsComponents()}
        <Center>
            <Button onClick={onOpen} leftIcon={<AddIcon />}>Create PlayList</Button>
        </Center>
    </Box>)
}

export default PlayLists;