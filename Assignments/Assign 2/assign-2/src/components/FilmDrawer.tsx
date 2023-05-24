import {useEffect, useState} from 'react'
import axios from 'axios'
import RequiredField from "./RequiredField";
import UnrequiredField from "./UnrequiredField";
import ImageUpload from './ImageUpload';

import {Box, Heading, Text, HStack, VStack, Stack, Divider, Select, Flex, Spacer,  Button, Center, LinkOverlay, LinkBox, Slide, useToast, useDisclosure, FormControl, FormLabel, } from '@chakra-ui/react'

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'

import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'


const url = 'https://seng365.csse.canterbury.ac.nz/api/v1';



export default function FilmDrawer({isOpen, onClose}: any) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState(-1);
    const [imageFile, setImageFile] = useState('');
    const [imageUrl, setImageUrl] = useState('https://i.imgflip.com/7my1ae.jpg');
    const [releaseDate, setReleaseDate] = useState('');
    const [ageRating, setAgeRating] = useState('');
    const [runtime, setRuntime] = useState(0);

    const ageRatings = ['G', 'PG', 'M', 'R13', 'R16', 'R18', 'TBC'];
    const [genres, setGenres] = useState <Map<number, string>> (new Map([]));
    
    const handleTitleChange = (event: { target: { value: any; }; }) => setTitle(event.target.value)
    const handleDescriptionChange = (event: { target: { value: any; }; }) => setDescription(event.target.value)
    const handleGenreChange = (event: { target: { value: any; }; }) => setGenre(event.target.value)
    const handleReleaseDateChange = (event: { target: { value: any; }; }) => setReleaseDate(event.target.value)
    const handleAgeRatingChange = (event: { target: { value: any; }; }) => setAgeRating(event.target.value)


    const getGenres = () => {
      axios.get(url + '/films/genres')
      .then((response) => {
          setGenres(new Map(response.data.map((x: Genre)  => [x.genreId, x.name])));
      });
    }
        
    useEffect(() => {
      getGenres()
    }, [])

    const genreOptions = () => {
        return (
          [...genres].map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
          ))
        )
    }

    return (
        <Drawer
            isOpen={isOpen}
            placement='bottom'
            onClose={onClose}
            size='full'
            colorScheme='teal'
          >
            <DrawerOverlay />
            <DrawerContent bg='gray.700' textColor='gray.200'>
                <DrawerCloseButton />
                <DrawerHeader h='100px' bg='teal.400' fontStyle='italic' fontWeight='light' fontSize='5xl' textAlign='center'>
                    Add a New Film
                </DrawerHeader>
                <DrawerBody >
                  <Flex w='100%' px='10vh'>
                    <Box pr='10vh'><ImageUpload setImageFile={setImageFile} imageUrl={imageUrl} setImageUrl={setImageUrl}/></Box>
                    
                    <Box w='100%'>
                      <RequiredField fieldName='Title' type='text' value={title} handleFieldChange={handleTitleChange}/>
                      <RequiredField fieldName='Description' type='text' value={description} handleFieldChange={handleDescriptionChange}/>
                      <FormControl isRequired pt='4'>
                        <FormLabel>Genre:</FormLabel>
                        <Select placeholder='Select a genre...' value={genre} onChange={handleGenreChange} color='black'>
                          {genreOptions()}
                        </Select>
                      </FormControl>
                      <UnrequiredField fieldName='Release Date' type='text' value={releaseDate} handleFieldChange={handleReleaseDateChange}/>
                      <FormControl  pt='4'>
                        <FormLabel>Age Rating:</FormLabel>
                        <Select placeholder='Select an age rating...' value={ageRating} onChange={handleAgeRatingChange} color='black'>
                          {ageRatings.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl pt='4'>
                          <FormLabel>Runtime:</FormLabel>
                          <NumberInput defaultValue={0} min={0} value={runtime} onChange={(val) => setRuntime(parseInt(val, 10))}>
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                      </FormControl>
                      <UnrequiredField fieldName='Runtime' type='number' />
                    </Box>
                  </Flex>
                </DrawerBody>

                <DrawerFooter>
                </DrawerFooter>
            </DrawerContent>
          </Drawer>
    )
}

// genre, image, release date, age rating, runtime