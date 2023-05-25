import { useState} from 'react'
import axios from 'axios'
import AvatarUpload from '../components/AvatarUpload'

import { Text, Button, VStack, useToast, Flex, Spacer} from '@chakra-ui/react'
import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton} from '@chakra-ui/react'

const url = 'http://localhost:4941/api/v1';

export default function AddImageModal({isOpen, onClose, parentOnClose}: any) {

    const [imageFile, setImageFile] = useState<any>(null);
    const [imageUrl, setImageUrl] = useState<any>(null);
    const Toast = useToast();

    const uploadPhoto = () => {
        if (imageFile !== null && ['jpg', 'jpeg', 'png', 'gif'].includes(imageFile.type.split('/').pop())) {
            axios.put(url + '/users/' + localStorage.userId + '/image', 
                    imageFile, 
                    { headers: {'X-Authorization': localStorage.authToken, 'Content-Type': imageFile.type}})
            .then((_) => {
                Toast({
                    title: 'Uploaded.',
                    description: 'Your face has been replaced.',
                    status: 'success',
                    duration: 9000,
                    isClosable: true
                })
                onClose();
                parentOnClose();
            }, (error) => {
                Toast({
                    title: 'Something went wrong. Here\'s a helpful error message.',
                    description: `${error.toString()}`,
                    status: 'error',
                    duration: 9000,
                    isClosable: true
                })
            });
        } else {
            Toast({
                title: 'Something went wrong. Here\'s a helpful error message.',
                description: 'Your image isn\'t ValidityState.',
                status: 'error',
                duration: 9000,
                isClosable: true
            })
        }
    }

    const handleClose = () => {
        onClose();
        parentOnClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize='3xl' fontStyle='italic'>Add a Photo?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Flex justify='center'>
                <VStack>
                    <AvatarUpload setImageFile={setImageFile} imageUrl={imageUrl} setImageUrl={setImageUrl}/>
                    <Text>This could be you.</Text>
                </VStack>
            </Flex>
          </ModalBody>

          <ModalFooter>
                <Flex pt='1rem' w='100%'> 
                    <Button colorScheme='red' onClick={handleClose}>No.</Button>
                    <Spacer/>
                    <Button colorScheme='teal' onClick={uploadPhoto}>Yes. (Upload)</Button>
                </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}