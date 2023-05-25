
import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useToast} from '@chakra-ui/react'
import axios from 'axios';

const url = 'http://localhost:4941/api/v1';

export default function DeleteModal({film, getFilms, isOpen, onClose}: any) {
    
    const Toast = useToast()

    const deleteFilm = () => {
        axios.delete(url + '/films/' + film.filmId, { headers: {'X-Authorization': localStorage.authToken}})
            .then(() => {
                Toast({
                    title: 'Deleted.',
                    description: 'Burn the evidence',
                    status: 'success',
                    duration: 9000,
                    isClosable: true
                })
                getFilms();
                onClose();
            }, (error) => {
                Toast({
                    title: 'An error has occured. All your fault.',
                    description: `${error.toString()}`,
                    status: 'error',
                    duration: 9000,
                    isClosable: true
                })
            });
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontSize='3xl' fontStyle='italic'>Delete It</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Do it.
                </ModalBody>
                <ModalFooter justifyContent='right'>
                <Button colorScheme='red' onClick={deleteFilm}>Delete</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>)
}