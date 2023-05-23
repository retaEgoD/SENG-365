import { useState} from 'react'
import axios from 'axios'
import AvatarUpload from '../components/AvatarUpload'

import {Box, Heading, Text, Input, InputGroup, InputRightElement, IconButton, Button, HStack, VStack, useToast, Avatar, Flex, Spacer} from '@chakra-ui/react'
import {Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react'
import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton} from '@chakra-ui/react'
import {ViewIcon, MinusIcon} from '@chakra-ui/icons'

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
import FallbackAvatar from '../components/FallbackAvatar'

const url = 'https://seng365.csse.canterbury.ac.nz/api/v1';


function GenericField({fieldName, type, value, handleFieldChange}: any) {
    return (
        <>
            <FormControl pt='4'>
                <FormLabel>{fieldName}:</FormLabel>
                    <Input type={type} placeholder={fieldName} value={value} onChange={handleFieldChange}/>
            </FormControl>
        </>
    )
}

function PasswordField({password, setPassword, isCurrent}: any) {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    
    return (
        <>
            <FormControl>
                <FormLabel mb='12px' pt='20px'>{isCurrent ? 'Current Password' : "New Password"}:</FormLabel>
                <InputGroup>
                    <Input 
                        placeholder={isCurrent ? 'Current Password' : "New Password"}
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

function UserBox({user, getUser}: any) {

    const Toast = useToast();

    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')

    const handlecurrentPasswordChange = (event: { target: { value: any; }; }) => setCurrentPassword(event.target.value)
    const handleNewPasswordChange = (event: { target: { value: any; }; }) => setNewPassword(event.target.value)
    const handlerEmailChange = (event: { target: { value: any; }; }) => setEmail(event.target.value)
    const handleFNameChange = (event: { target: { value: any; }; }) => setFName(event.target.value);
    const handleLNameChange = (event: { target: { value: any; }; }) => setLName(event.target.value);

    const patchInfo = {
        "email": email,
        "firstName": fName,
        "lastName": lName,
        "password": newPassword,
        "currentPassword": currentPassword
        };

    const clearForms = () => {
        setEmail('');
        setCurrentPassword('');
        setNewPassword('');
        setFName('');
        setLName('');
    }

    const removeEmpty = (obj: any) => {
        const newJSON: any = {}
        for (let key in obj) {
            if (obj[key] !== '') {
                newJSON[key] = obj[key];
            }
        }
        return newJSON
    }

    const changeInfo = () => {
        axios.patch(url + '/users/' + JSON.parse(localStorage.userId), 
                    removeEmpty(patchInfo), 
                    { headers: {'X-Authorization': localStorage.authToken}})
                .then((_) => {
                    console.log(removeEmpty(patchInfo))
                    Toast({
                        title: 'Info Changed.',
                        description: 'But you haven\'t.',
                        status: 'success',
                        duration: 9000,
                        isClosable: true
                    })
                    getUser();
                    clearForms();
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

    const infoTab = () => {
        return (
        <TabPanel>
            <Flex justifyContent='center'>
                <VStack>
                    <FallbackAvatar 
                            name={user.firstName + ' ' + user.lastName} 
                            src={url + '/users/' + localStorage.userId + '/image'}
                            size='xl'/>
                    <Text>This is you.</Text>
                </VStack>
            </Flex>
            <FormControl>
                <FormLabel pt='10px' fontSize='xl'>
                    First Name:
                </FormLabel>
                <Text pl='16px' fontSize='lg' fontStyle='italic'>{user.firstName}</Text>
            </FormControl>
            <FormControl>
                <FormLabel pt='10px' fontSize='xl'>
                    Last Name:
                </FormLabel>
                <Text pl='16px' fontSize='lg' fontStyle='italic'>{user.lastName}</Text>
            </FormControl>
            <FormControl>
                <FormLabel pt='10px' fontSize='xl'>
                    Email:
                </FormLabel>
                <Text pl='16px' fontSize='lg' fontStyle='italic'>{user.email}</Text>
            </FormControl>
        </TabPanel>
        )
    }

    

    const changeTab = () => {
        const [imageFile, setImageFile] = useState<any>(null);
        const [imageUrl, setImageUrl] = useState<any>(null);
        
        const uploadPhoto = () => {
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
                getUser();
                setImageFile(null);
                setImageUrl(null);
            }, (error) => {
                Toast({
                    title: 'Something went wrong. Here\'s a helpful error message.',
                    description: `${error.response.statusText.toString()}`,
                    status: 'error',
                    duration: 9000,
                    isClosable: true
                })
            });
        }

        return (
            <TabPanel>
                <Flex justify='center'>
                    <VStack>
                        <AvatarUpload setImageFile={setImageFile} imageUrl={imageUrl} setImageUrl={setImageUrl}/>
                        <Text>This could be you.</Text>
                    </VStack>
                </Flex>
                <HStack>
                    <GenericField fieldName="First name" type='text' value={fName} handleFieldChange={handleFNameChange}/>
                    <GenericField fieldName="Last name" type='text' value={lName} handleFieldChange={handleLNameChange}/>
                </HStack>
                <GenericField fieldName="Email" type='email' value={email} handleFieldChange={handlerEmailChange}/>
                <PasswordField password={currentPassword} setPassword={handlecurrentPasswordChange} isCurrent={true}/>
                <PasswordField password={newPassword} setPassword={handleNewPasswordChange}/>
                <Flex pt='1rem'> 
                    <Button colorScheme='teal' onClick={uploadPhoto}>Upload Photo</Button>
                    <Spacer/>
                    <Button colorScheme='teal' onClick={changeInfo}>Save Info</Button>
                </Flex>
            </TabPanel>
        )
    }


    return (
        <Box>
            <Tabs>
                <TabList pb='1'>
                    <Tab>Your Info</Tab>
                    <Tab>Change Info</Tab>
                </TabList>

                <TabPanels>
                    {infoTab()}
                    {changeTab()}
                </TabPanels>
            </Tabs>
        </Box>
    )
}

export default function UserModal({isOpen, onClose, user, getUser}: any) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize='3xl' fontStyle='italic'>Despite Everything, It's Still You.</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
                <UserBox onClose={onClose} user={user} getUser={getUser}/>
          </ModalBody>
        </ModalContent>
      </Modal>
    )
}