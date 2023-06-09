import { useState } from 'react'
import axios from 'axios'
import RequiredField from '../components/RequiredField'
import AddImageModal from './AddImageModal'

import {Box, Input, InputGroup, InputRightElement, IconButton, Button, HStack, useToast, useDisclosure } from '@chakra-ui/react'
import {Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react'
import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton} from '@chakra-ui/react'
import {ViewIcon, MinusIcon} from '@chakra-ui/icons'

import {
    FormControl,
    FormLabel,
    FormHelperText,
  } from '@chakra-ui/react'

const url = 'http://localhost:4941/api/v1';

function PasswordField({password, setPassword}: any) {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    
    return (
        <>
            <FormControl isRequired>
                <FormLabel mb='12px' pt='20px'>Password:</FormLabel>
                <InputGroup>
                    <Input 
                        placeholder='Password' 
                        size='lg'
                        value={password}
                        onChange={setPassword}
                        type={show? 'text' : 'password'}
                    />
                    <InputRightElement pt='0.5rem' pr='0.5rem'>
                        <IconButton 
                            colorScheme='teal'
                            variant={show? 'solid' : 'outline'}
                            aria-label='Toggle Visibility' 
                            icon={show ? <ViewIcon /> : <MinusIcon />}
                            onClick={handleClick} 
                        />
                    </InputRightElement>
                </InputGroup>
                <FormHelperText>6 or more characters.</FormHelperText>
            </FormControl>
        </>
    )
}

function LoginBox({onClose}: any) {

    const Toast = useToast();

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')

    const handleLoginEmailChange = (event: { target: { value: any; }; }) => setLoginEmail(event.target.value)
    const handleLoginPasswordChange = (event: { target: { value: any; }; }) => setLoginPassword(event.target.value)
    const handleRegisterEmailChange = (event: { target: { value: any; }; }) => setRegisterEmail(event.target.value)
    const handleRegisterPasswordChange = (event: { target: { value: any; }; }) => setRegisterPassword(event.target.value)
    const handleFNameChange = (event: { target: { value: any; }; }) => setFName(event.target.value);
    const handleLNameChange = (event: { target: { value: any; }; }) => setLName(event.target.value);

    const { isOpen: imageIsOpen, 
        onOpen: imageOnOpen, 
        onClose: imageOnClose} = useDisclosure();

    function login() {
        const body = {'email': loginEmail, 'password': loginPassword};
        axios.post(url + '/users/login', body)
            .then((response) => {
                Toast({
                    title: 'You\'re in.',
                    description: 'Do you think your father\'s proud of you?',
                    status: 'success',
                    duration: 9000,
                    isClosable: true
                })
                localStorage.authToken = response.data.token
                localStorage.userId = JSON.stringify(response.data.userId)
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

    function register() {

        const registerBody = {'email': registerEmail, 'password': registerPassword, 'firstName': fName, 'lastName': lName};
        const loginBody = {'email': registerEmail, 'password': registerPassword};

        axios.post(url + '/users/register', registerBody)
            .then((_) => {
                Toast({
                    title: 'Registered.',
                    description: '...Why are you here?',
                    status: 'success',
                    duration: 9000,
                    isClosable: true
                })
                axios.post(url + '/users/login', loginBody)
                .then((response) => {
                    localStorage.authToken = response.data.token
                    localStorage.userId = JSON.stringify(response.data.userId)
                    imageOnOpen();
                });
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
        <Box>
            <Tabs>
                <TabList pb='1'>
                    <Tab>Login</Tab>
                    <Tab>Register</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <RequiredField fieldName="Email" type='email' value={loginEmail} handleFieldChange={handleLoginEmailChange} width='20'/>
                        <PasswordField password={loginPassword} setPassword={handleLoginPasswordChange}/>
                        <HStack pt='1rem' justify='right'> 
                            <Button colorScheme='gray' onClick={onClose}>Cancel</Button>
                            <Button colorScheme='teal' onClick={login}>Login</Button>
                        </HStack>
                    </TabPanel>
                    <TabPanel>
                        <HStack>
                            <RequiredField fieldName="First name" type='text' value={fName} handleFieldChange={handleFNameChange}/>
                            <RequiredField fieldName="Last name" type='text' value={lName} handleFieldChange={handleLNameChange}/>
                        </HStack>
                        <RequiredField fieldName="Email" type='email' value={registerEmail} handleFieldChange={handleRegisterEmailChange}/>
                        <PasswordField password={registerPassword} setPassword={handleRegisterPasswordChange}/>
                        <HStack pt='1rem' justify='right'> 
                            <Button colorScheme='gray' onClick={onClose}>Cancel</Button>
                            <Button colorScheme='teal' onClick={register}>Register</Button>
                        </HStack>
                        <AddImageModal isOpen={imageIsOpen} onClose={imageOnClose} parentOnClose={onClose}/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

export default function LoginModal({isOpen, onClose}: any) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize='3xl' fontStyle='italic'>Login/Register</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
                <LoginBox onClose={onClose}/>
          </ModalBody>

          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}