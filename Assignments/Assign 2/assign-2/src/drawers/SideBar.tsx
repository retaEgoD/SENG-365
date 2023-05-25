import {useEffect, useState} from 'react'
import axios from 'axios'
import LoginModal from '../modals/LoginModal'
import UserModal from '../modals/UserModal'
import AddFilm from './AddFilm'
import {Box, Heading, Text, HStack, VStack, Divider,  Avatar, Flex, useToast, useDisclosure } from '@chakra-ui/react'

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'


const url = 'https://seng365.csse.canterbury.ac.nz/api/v1';

function SideBarButton({buttonText, buttonFunction}: any) {

    return (
        <Box>
            <Flex w='100%' h='80px' alignItems='center' onClick={buttonFunction} cursor='pointer'>
                <Heading fontStyle='italic' fontWeight='light' >{buttonText}</Heading>
            </Flex>
            <Divider h='10px' />
        </Box>
            
    )
}

function ProfileSection({user, userOpen, login}: any) {

    const NotLoggedIn = () => {
        return (
            <VStack justifyContent='left' w='100%'>
                <Divider h='10px' />
                <Flex w='100%' h='80px' alignItems='center' justifyContent='center' cursor='pointer' onClick={login}>
                    <Heading fontStyle='italic' fontWeight='light'>Login/Register</Heading>
                </Flex>
                <Divider h='10px' />
            </VStack>
        )
    }

    const LoggedIn = ({user}: any) => {

        const Toast = useToast();

        function logout() {
            axios.post(url + '/users/logout', null, { headers: {'X-Authorization': localStorage.authToken}})
                .then((_) => {
                    Toast({
                        title: 'Logged out.',
                        description: 'Get out.',
                        status: 'success',
                        duration: 1000,
                        isClosable: true
                    })
                    localStorage.clear()

                    setTimeout(() => {window.location.href='/films'}, 1300)
                }, (error) => {
                    Toast({
                        title: 'Something went wrong. Here\'s a helpful error message.',
                        description: `${error.toString()}`,
                        status: 'error',
                        duration: 9000,
                        isClosable: true
                    })
                });
        }

        return (
            <VStack justifyContent='left' w='100%'>
                <Divider h='10px' />
                <Flex w='100%' h='80px'>
                    <Flex w='100%' alignItems='center' cursor='pointer' onClick={logout}>
                        <Heading fontStyle='italic' fontWeight='light'>Logout</Heading>
                    </Flex>
                    <Divider orientation='vertical' px='1'/>
                    <HStack w='100%' justifyContent='right' pr='4' cursor='pointer' onClick={userOpen}>
                        <Box>
                            <Text as='i' fontSize='12'>You are logged in as: </Text>
                            <Text fontSize='18' pr='6'>{user.firstName + ' ' + user.lastName} </Text>
                        </Box>
                        <Avatar 
                            name={user.firstName + ' ' + user.lastName} 
                            src={url + '/users/' + localStorage.userId + '/image'}
                            size='md'/>
                    </HStack>
    
                </Flex>
                
                <Divider h='10px' />
            </VStack>
        )
    }
    return (
        (typeof localStorage.userId === "undefined" ? <NotLoggedIn /> : <LoggedIn user={user}/>)
    )

    
} 

export default function Sidebar({isOpen, onClose}: any) {
    
    const dummy = {
        firstName: 'x',
        lastName: 'y',
        email: null
    }
    const [user, setUser] = useState(dummy)

    const { isOpen: loginIsOpen, 
            onOpen: loginOnOpen, 
            onClose: loginOnClose } = useDisclosure();
    
    const { isOpen: userIsOpen, 
            onOpen: userOnOpen, 
            onClose: userOnClose } = useDisclosure();
    
    const { isOpen: addFilmIsOpen, 
            onOpen: addFilmOnOpen, 
            onClose: addFilmOnClose } = useDisclosure();
            

    const getUser = () => {
        if (typeof localStorage.userId !== 'undefined') {
            axios.get(url + '/users/' + JSON.parse(localStorage.userId), { headers: {'X-Authorization': localStorage.authToken}})
                .then((response) => {
                    setUser(response.data)
                })
        } else {
            setUser(dummy);
        }
    }

    const addFilm = () => {
        if (typeof localStorage.userId === "undefined") {
            loginOnOpen()
        } else {
            addFilmOnOpen()
        }
    }

    const myFilms = () => {
        if (typeof localStorage.userId === "undefined") {
            loginOnOpen()
        } else {
            (() => window.location.href='/myfilms')()
        }
    }

    const myAccount = () => {
        if (typeof localStorage.userId === "undefined" || user === dummy) {
            loginOnOpen()
        } else {
            userOnOpen()
        }
    }

    useEffect(() => {
        getUser()
    }, [localStorage.authToken, localStorage.userId])

    return (
        <Drawer
            isOpen={isOpen}
            placement='left'
            onClose={onClose}
            size='md'
            colorScheme='teal'
          >
            <DrawerOverlay />
            <DrawerContent bg='gray.700' textColor='gray.200'>
                <DrawerCloseButton />
                <DrawerHeader h='100px' bg='teal.400' fontStyle='italic' fontWeight='light' fontSize='5xl' textAlign='center'>
                    Navigation
                </DrawerHeader>
                <DrawerBody>
                    <SideBarButton buttonText='Explore Films' buttonFunction={() => window.location.href='/films'} />
                    <SideBarButton buttonText='Add a Film' buttonFunction={addFilm}/>
                    <SideBarButton buttonText='My Films' buttonFunction={myFilms}/>
                    <SideBarButton buttonText='My Account' buttonFunction={myAccount}/>
                </DrawerBody>
                <LoginModal isOpen={loginIsOpen} onClose={loginOnClose}/>
                <UserModal isOpen={userIsOpen} onClose={userOnClose} user={user} getUser={getUser}/>
                <AddFilm isOpen={addFilmIsOpen} onClose={addFilmOnClose}/>

                <DrawerFooter>
                    <ProfileSection user={user} userOpen={userOnOpen} login={loginOnOpen}/>
                </DrawerFooter>
            </DrawerContent>
          </Drawer>
    )
}