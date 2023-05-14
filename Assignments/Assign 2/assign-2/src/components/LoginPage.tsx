import { useState } from 'react'
import axios from 'axios'
import {Box, Heading, Text, Input, InputGroup, InputRightElement, IconButton, Button, HStack, VStack} from '@chakra-ui/react'
import {Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react'
import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton} from '@chakra-ui/react'
import {ViewIcon, MinusIcon} from '@chakra-ui/icons'

const url = 'https://seng365.csse.canterbury.ac.nz/api/v1';


function GenericField({type, value, handleChange, width}) {
    return (
        <>
            <VStack>
                <Text mb='12px' pt='20px'>{type}:</Text>
                <Input pr={width+'rem'} placeholder={type + ', please.'} size='lg' value={value} onChange={handleChange} />
            </VStack>
        </>
    )
}

function PasswordField({password, handleChange}) {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    
    return (
        <>
            <Text mb='12px' pt='20px'>Password:</Text>
            <InputGroup>
                <Input 
                    pr='20rem'
                    placeholder='Password, please.' 
                    size='lg'
                    value={password}
                    onChange={handleChange}
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
        </>
    )
}

function LoginBox() {

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')

    const handleLoginEmailChange = (event: { target: { value: React.SetStateAction<string>; }; }) => setLoginEmail(event.target.value)
    const handleLoginPasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => setLoginPassword(event.target.value)
    const handleRegisterEmailChange = (event: { target: { value: React.SetStateAction<string>; }; }) => setRegisterEmail(event.target.value)
    const handleRegisterPasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => setRegisterPassword(event.target.value)
    const handleFNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => setFName(event.target.value);
    const handleLNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => setLName(event.target.value);

    function login() {
        const body = {'email': loginEmail, 'password': loginPassword};
        axios.post(url + 'login', body)
            .then();
    }

    function register() {
        const body = {'email': registerEmail, 'password': registerPassword, 'firstName': fName, 'lastName': lName};
        axios.post(url + 'register', body)
            .then();

    }


    return (
        <Box>
            <Tabs>
                <TabList>
                    <Tab>Login</Tab>
                    <Tab>Register</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Heading>Login</Heading>
                        <GenericField type="Email" value={loginEmail} handleChange={handleLoginEmailChange} width='20'/>
                        <PasswordField password={loginPassword} handleChange={handleLoginPasswordChange}/>
                        <HStack pt='1rem' justify='right'> 
                            <Button colorScheme='gray'>Cancel</Button>
                            <Button colorScheme='teal'>Login</Button>
                        </HStack>
                    </TabPanel>
                    <TabPanel>
                        <Heading>Register</Heading>
                        <HStack>
                            <GenericField type="First name" value={fName} handleChange={handleFNameChange} width='2.9'/>
                            <GenericField type="Last name" value={lName} handleChange={handleLNameChange} width='2.9'/>
                        </HStack>
                        <GenericField type="Email" value={registerEmail} handleChange={handleRegisterEmailChange} width='20'/>
                        <PasswordField password={registerPassword} handleChange={handleRegisterPasswordChange}/>
                        <HStack pt='1rem' justify='right'> 
                            <Button colorScheme='gray'>Cancel</Button>
                            <Button colorScheme='teal'>Register</Button>
                        </HStack>
                    </TabPanel>
                </TabPanels>

                
            </Tabs>
        </Box>
    )
}

export default function LoginPage() {
    return (
        <div>
            <LoginBox />
        </div>
    )
}