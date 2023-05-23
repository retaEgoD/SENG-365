import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

import FallbackAvatar from './FallbackAvatar'

import {Box, Heading, Text, IconButton, Button, Stack, HStack, Image, Avatar, Flex, Spacer, SlideFade } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'


import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'

import {StarIcon, ChevronLeftIcon, ArrowLeftIcon, ChevronRightIcon, ArrowRightIcon} from '@chakra-ui/icons'


const url = 'https://seng365.csse.canterbury.ac.nz/api/v1';



export default function DisplayFilms({filmData, pageLength, h}: any) {

    const [genres, setGenres] = useState <Map<number, string>> (new Map([]));
    const [pageNo, setPageNo] = useState(0);
    
    const getGenres = () => {
        axios.get(url + '/films/genres')
            .then((response) => {
                setGenres(new Map(response.data.map((x: Genre)  => [x.genreId, x.name])));
        });
    }


    useEffect(() => {
        getGenres()
    }, [])

    const FilmList = () => {
        return filmData.slice(0+pageLength*pageNo, pageLength*(pageNo+1)).map((film: BasicFilm) =>
            <AccordionItem key={film.filmId}>
                <h2>
                <AccordionButton _expanded={{bg: 'teal.400'}}>
                    <Box as="span" flex='1' textAlign='left' fontSize='lg'>
                    {film.title}
                    </Box>
                        <Text as='i' fontSize='sm' pr='0.5rem' >{genres.get(film.genreId)}</Text>
                        {film.rating === 0 ? 
                            <Text pr='0.5rem'>Unrated</Text>:
                            <>
                                <Text pr='0.5rem'>{film.rating + '/10'}</Text>
                                <StarIcon color='teal' />
                            </>
                        }
                    <AccordionIcon />
                </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='elevated'
                    >
                    <Image
                        objectFit='cover'
                        maxW={{ base: '100%', sm: '200px' }}
                        src={url + /films/ + film.filmId + '/image'}
                        fallbackSrc='https://pic-bstarstatic.akamaized.net/ugc/9f4faf208a6a902e28bb97a443eac31c51037b6e.jpg@1200w_630h_1e_1c_1f.webp'
                        alt={film.title}
                    />
                    <Stack>
                        <CardBody textAlign='left'>
                            <Flex w='55.5rem'>
                                <Box>
                                    <Heading size='xl' fontStyle='italic' fontWeight='light'>{film.title}</Heading>
                                        {new Date(film.releaseDate) > new Date() ?
                                            <Text as='i'>Release Date: {film.releaseDate.slice(0, pageLength)}</Text> :
                                            <Text as='i'>Released: {film.releaseDate.slice(0, pageLength)}</Text>}
                                        <br />
                                        <Text as='i'>Age Rating: {film.ageRating}</Text>
                                </Box>
                                <Spacer />
                                <HStack>
                                    <Box>
                                        <Text as='i' fontSize='12'>Directed by: </Text>
                                        <Text fontSize='28' pr='6'>{film.directorFirstName + ' ' + film.directorLastName} </Text>
                                    </Box>
                                    <FallbackAvatar 
                                        name={film.directorFirstName + film.directorLastName} 
                                        src={url + '/users/' + film.directorId + '/image'}
                                        size='xl'/>
                                </HStack>
                            </Flex>
                        </CardBody>
                        <CardFooter>
                        <Button variant='solid' colorScheme='teal' onClick={() => {window.location.href='/films/' + film.filmId}}>
                            See more
                        </Button>
                            
                        </CardFooter>
                    </Stack>
                    </Card>
                </AccordionPanel>
            </AccordionItem>
        )
    }


    return (
        <Flex direction={['row', 'column']} h={h}>
            <Accordion allowMultiple>
                {FilmList()}
            </Accordion>
            <Spacer />
            <HStack justify='center' pt={10}>
                <IconButton
                isDisabled={pageNo <= 0 || filmData.length === 0}
                color={pageNo <= 0 || filmData.length === 0 ? 'lightgray' : 'black'}
                variant='ghost'
                aria-label='Page 1'
                size='lg'
                borderRadius='full'
                icon={<ArrowLeftIcon />}
                onClick={() => setPageNo(0)}
                />
                <IconButton
                isDisabled={pageNo <= 0 || filmData.length === 0}
                color={pageNo <= 0 || filmData.length === 0 ? 'lightgray' : 'black'}
                variant='ghost'
                aria-label='Previous Page'
                size='lg'
                borderRadius='full'
                icon={<ChevronLeftIcon />}
                onClick={() => setPageNo(pageNo-1)}
                />
                <SlideFade in={true}>
                    <Text fontWeight='semibold' fontSize='3xl'>{pageNo+1}</Text>
                </SlideFade>
                
                <IconButton
                isDisabled={pageNo >= Math.ceil(filmData.length/pageLength)-1 || filmData.length === 0}
                color={pageNo >= Math.ceil(filmData.length/pageLength)-1 || filmData.length === 0 ? 'lightgray' : 'black'}
                variant='ghost'
                aria-label='Next Page'
                size='lg'
                borderRadius='full'
                icon={<ChevronRightIcon />}
                onClick={() => setPageNo(pageNo+1)}
                />
                <IconButton
                isDisabled={pageNo >= Math.ceil(filmData.length/pageLength)-1 || filmData.length === 0}
                color={pageNo >= Math.ceil(filmData.length/pageLength)-1 || filmData.length === 0 ? 'lightgray' : 'black'}
                variant='ghost'
                aria-label='Page n'
                size='lg'
                borderRadius='full'
                icon={<ArrowRightIcon />}
                onClick={() => setPageNo(Math.ceil(filmData.length/pageLength)-1)}
                />
            </HStack>
        </Flex>
        
    )
}