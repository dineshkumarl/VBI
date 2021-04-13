import {Box,Button, Center, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Input,
    useToast,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton
  } from '@chakra-ui/react';
import PlayListItem from './PlayListItem';
import { AddIcon } from '@chakra-ui/icons';
import { useCallback,  useEffect,  useMemo,  useState } from 'react';
import {useStore} from '../App/store/useStore';
import {createPlayList, getPlayLists} from './actions/playlist';
import _get from 'lodash.get';
import { useProgressIndicator } from '../App/Common/AppProgressIndicator';

const CreatePlayListModal = ({onClose, playListCreateSuccess, payListCreateFailed, ...rest})=>{
    
     const [name, setName] = useState('');
     const [creatingFlag, setCreatingFlag] = useState(()=>{
       return false;
     })

     const [errorInCreatingPlayList, setErrorInCreatingPlayList] = useState(false);

     const createClick = useCallback(async ()=>{
       setCreatingFlag(true);
       const [error, playlist] =  await createPlayList(name);
       if(error){
         setErrorInCreatingPlayList(true);
         payListCreateFailed && payListCreateFailed(error)
       }else{
         playListCreateSuccess && playListCreateSuccess(playlist);
       }
       setCreatingFlag(false);
     },[name]);

    return (<Modal {...rest} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Please Enter a Name</ModalHeader>
          {(creatingFlag)&&(<ModalCloseButton />)}
          <ModalBody>
            {(errorInCreatingPlayList) && (<Alert mb={3} status="error">
              <AlertIcon />
              <AlertTitle mr={2}>Error in creating the playlist</AlertTitle>
              <CloseButton position="absolute" right="8px" top="8px" onClick={()=>setErrorInCreatingPlayList(false)} />
            </Alert>)}
            <Input  autoComplete="false" variant="filled" placeholder="Name..." onChange={(e)=>{setErrorInCreatingPlayList(false); setName(e.target.value)}} />
          </ModalBody>
          <ModalFooter>
            <Button disabled={creatingFlag} variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button isLoading={creatingFlag} disabled={name.length===0 || creatingFlag} onClick={createClick} colorScheme="teal">Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>)
}

const PlayLists =()=>{
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {state, dispatch} = useStore();
    const { showProgressIndicator, hideProgressIndicator} = useProgressIndicator();
    const toast = useToast();

    const currentPlayLists = _get(state,'playLists.list');
    const playListLength = _get(state, 'playLists.list.length', 0);

    useEffect(async ()=>{
      showProgressIndicator();
      const [error, playlists] =  await getPlayLists();
      if(!error){
        dispatch({type:'UPDATE_PLAYLISTS_LIST', value:playlists});
      }else{
        toast({
          title:"Error retreiving playlists for your profile",
          duration:3000,
          status:"error"
        });
      }
      hideProgressIndicator();
    },[])

    const getPlayListsComponents = useCallback(()=>{
      return _get(state,'playLists.list',[]).map((value)=>(<PlayListItem name={value.name} created={value.created} id={value._id} key={value.id} />))
    },[playListLength]);

    const updatePlayList = useCallback((newPlayList)=>{
      const newPlayLists = (currentPlayLists || []).concat([newPlayList])
      dispatch({type:'UPDATE_PLAYLISTS_LIST', value: newPlayLists});
      onClose();
    },[currentPlayLists])
    
    return (<Box>
        <CreatePlayListModal isOpen={isOpen} onClose={onClose} playListCreateSuccess={updatePlayList} payListCreateFailed={()=>null} />
        {getPlayListsComponents()}
        <Center mt="5">
            <Button onClick={onOpen} leftIcon={<AddIcon />}>Create PlayList</Button>
        </Center>
    </Box>)
}

export default PlayLists;