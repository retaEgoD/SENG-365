import {useState} from 'react'
import LoginModal from './LoginModal'
import {Box, Heading, Text, HStack, VStack, Stack, Divider,  Avatar, Flex, Spacer,  Button, Center, LinkOverlay, LinkBox, Slide, useToast, useDisclosure } from '@chakra-ui/react'

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

function ProfileSection({user}: any) {
    return 
} 

export default function Sidebar({isOpen, onClose}: any) {

    const [user, setuser] = useState({
        id: -1,
        email: 'x@y.com',
        firstName: 'x',
        lastName: 'y',
        imageFilename: null,
        password: 'password',
        authToken: null
    })

    const { isOpen: loginIsOpen, 
            onOpen: loginOnOpen, 
            onClose: loginOnClose } = useDisclosure();

    const userId = typeof localStorage.userID === 'undefined' ? null : JSON.parse(localStorage.userId);

    return (
        <Drawer
            isOpen={isOpen}
            placement='left'
            onClose={onClose}
            size='lg'
            colorScheme='teal'
          >
            <DrawerOverlay />
            <DrawerContent bg='gray.700'>
                <DrawerCloseButton />
                <DrawerHeader h='100px' bg='teal.400' fontStyle='italic' fontWeight='light' fontSize='5xl' textAlign='center'>
                    Navigation
                </DrawerHeader>
                
                <DrawerBody>
                    <SideBarButton buttonText='Explore Films' buttonFunction={() => window.location.href='/films'} />
                    <SideBarButton buttonText='My Films' buttonFunction={loginOnOpen}/>
                    <SideBarButton buttonText='My Account' />
                    <SideBarButton buttonText='My Account' />
                </DrawerBody>
                <LoginModal isOpen={loginIsOpen} onClose={loginOnClose}/>
        
                <DrawerFooter>
                    <VStack justifyContent='left' w='100%'>
                        <Divider h='10px' />
                        <Flex>
                            <Flex w='100%' h='80px' alignItems='center' cursor='pointer'>
                                <Heading fontStyle='italic' fontWeight='light' >Logout</Heading>
                            </Flex>
                            <HStack>
                                <Box>
                                    <Text as='i' fontSize='12'>Directed by: </Text>
                                    <Text fontSize='12' pr='6'>{user.firstName + ' ' + user.lastName} </Text>
                                </Box>
                                <Avatar 
                                    name={user.firstName + ' ' + user.lastName} 
                                    src={url + '/users/' + userId + '/image'}
                                    size='md'/>
                            </HStack>

                        </Flex>
                        
                        <Divider h='10px' />
                    </VStack>
                    
                    
                </DrawerFooter>
            </DrawerContent>
          </Drawer>
    )
}