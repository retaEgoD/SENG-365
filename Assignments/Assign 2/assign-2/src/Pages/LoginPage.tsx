import { useState, useContext } from 'react'
import axios from 'axios'

import {Box, Heading, Text, Input, InputGroup, InputRightElement, IconButton, Button, HStack, VStack, useToast} from '@chakra-ui/react'
import {Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react'
import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton} from '@chakra-ui/react'
import {ViewIcon, MinusIcon} from '@chakra-ui/icons'

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'

const url = 'https://seng365.csse.canterbury.ac.nz/api/v1';


function GenericField({fieldName, type, value, handleFieldChange}: any) {
    return (
        <>
            <FormControl pt='4' isRequired>
                <FormLabel>{fieldName}</FormLabel>
                    <Input type={type} placeholder={fieldName} value={value} onChange={handleFieldChange}/>
            </FormControl>
        </>
    )
}

function PasswordField({password, setPassword}: any) {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    
    return (
        <>
            <FormControl isRequired>
                <FormLabel mb='12px' pt='20px'>Password:</FormLabel>
                <InputGroup>
                    <Input 
                        pr='20rem'
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
            </FormControl>
        </>
    )
}

function LoginBox() {

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

    function login() {
        const body = {'email': loginEmail, 'password': loginPassword};
        axios.post(url + '/users/login', body)
            .then((response) => {
                Toast({
                    title: 'You\'re in.',
                    description: 'Do you think your father is proud of you?',
                    status: 'success',
                    duration: 9000,
                    isClosable: true
                })
                localStorage.setItem("authToken", response.data.token)
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
        const loginBody = {'email': loginEmail, 'password': loginPassword};
        axios.post(url + '/users/register', registerBody)
            .then((_) => {
                Toast({
                    title: 'Registered.',
                    description: '... Why are you here?',
                    status: 'success',
                    duration: 9000,
                    isClosable: true
                })
            }, (error) => {
                Toast({
                    title: 'Something went wrong. Here\'s a helpful error message.',
                    description: `${error.toString()}`,
                    status: 'error',
                    duration: 9000,
                    isClosable: true
                })
            });
        axios.post(url + '/users/login', loginBody)
        .then((response) => {
            localStorage.setItem("authToken", response.data.token)
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
                        <Heading>Login</Heading>
                        <GenericField fieldName="Email" type='email' value={loginEmail} handleFieldChange={handleLoginEmailChange} width='20'/>
                        <PasswordField password={loginPassword} setPassword={handleLoginPasswordChange}/>
                        <HStack pt='1rem' justify='right'> 
                            <Button colorScheme='gray'>Cancel</Button>
                            <Button colorScheme='teal' onClick={login}>Login</Button>
                        </HStack>
                    </TabPanel>
                    <TabPanel>
                        <Heading>Register</Heading>
                        <HStack>
                            <GenericField fieldName="First name" type='text' value={fName} handleFieldChange={handleFNameChange}/>
                            <GenericField fieldName="Last name" type='text' value={lName} handleFieldChange={handleLNameChange}/>
                        </HStack>
                        <GenericField fieldName="Email" type='email' value={registerEmail} handleFieldChange={handleRegisterEmailChange}/>
                        <PasswordField password={registerPassword} setPassword={handleRegisterPasswordChange}/>
                        <HStack pt='1rem' justify='right'> 
                            <Button colorScheme='gray'>Cancel</Button>
                            <Button colorScheme='teal' onClick={register}>Register</Button>
                        </HStack>
                    </TabPanel>
                </TabPanels>

                
            </Tabs>
        </Box>
    )
}

export default function LoginPage() {
    return (
        <LoginBox />
    )
}