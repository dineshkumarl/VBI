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
import { useState } from 'react';

const CreatePlayListModal = (props)=>{
    
     const [name, setName] = useState('');

    return (<Modal {...props} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Please Enter a Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input autoComplete={false} variant="filled" placeholder="Name..." value={name} onChange={(e)=>{setName(e.target.value)}} />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={props.onClose}>
              Cancel
            </Button>
            <Button disabled={name.length===0} colorScheme="teal">Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>)
}

const PlayLists =()=>{
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (<Box>
                <CreatePlayListModal isOpen={isOpen} onClose={onClose} playListCreate={()=>{}} />
                {[<PlayListItem key="1"></PlayListItem>, <PlayListItem key="2"></PlayListItem>]}
                <Center>
                   <Button onClick={onOpen} leftIcon={<AddIcon />}>Create PlayList</Button>
                </Center>
            </Box>)
}

export default PlayLists;