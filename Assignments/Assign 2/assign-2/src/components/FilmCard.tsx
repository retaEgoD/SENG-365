import { useState, useEffect } from 'react'
import axios from 'axios'

import {Box, Heading, Text, IconButton, Button, Stack, HStack, Image, Avatar, Flex, Spacer, SlideFade, useDisclosure } from '@chakra-ui/react'
import { Card, CardBody, CardFooter } from '@chakra-ui/react'


import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'

import {StarIcon, ChevronLeftIcon, ArrowLeftIcon, ChevronRightIcon, ArrowRightIcon} from '@chakra-ui/icons'
import DeleteModal from '../modals/DeleteModal'
import EditFilm from '../drawers/EditFilm'
import React from 'react'

export default function FilmCard({film, genres, url, getFilms}: any) {
    

    const { isOpen: deleteIsOpen, 
        onOpen: deleteOnOpen, 
        onClose: deleteOnClose } = useDisclosure();

    const { isOpen: editIsOpen, 
            onOpen: editOnOpen, 
            onClose: editOnClose } = useDisclosure();

    return (
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
                    <Stack w='100%' px='8'>
                        <CardBody textAlign='left' w='100%' >
                            <Flex >
                                <Box>
                                    <Heading maxW='500px' size='xl' fontStyle='italic' fontWeight='light'>{film.title}</Heading>
                                        {new Date(film.releaseDate) > new Date() ?
                                            <Text as='i'>Release Date: {film.releaseDate.replace('T', ' ').slice(0, -5)}</Text> :
                                            <Text as='i'>Released: {film.releaseDate.replace('T', ' ').slice(0, -5)}</Text>}
                                        <br />
                                        <Text as='i'>Age Rating: {film.ageRating}</Text>
                                </Box>
                                <Spacer />
                                <HStack>
                                    <Box>
                                        <Text as='i' fontSize='12'>Directed by: </Text>
                                        <Text maxW='320px' fontSize='28' pr='6'>{film.directorFirstName + ' ' + film.directorLastName} </Text>
                                    </Box>
                                    <Avatar 
                                        name={film.directorFirstName + film.directorLastName} 
                                        src={url + '/users/' + film.directorId + '/image'}
                                        size='xl'/>
                                </HStack>
                            </Flex>
                        </CardBody>
                        <CardFooter>
                            <Flex w='100%'>
                                <Button colorScheme='teal' onClick={() => {window.location.href='/films/' + film.filmId}}>
                                    See more
                                </Button>
                                <Spacer />
                                {typeof localStorage.userId !== 'undefined' && JSON.parse(localStorage.userId) === film.directorId ? 
                                    <HStack>
                                        <Button colorScheme='red' onClick={deleteOnOpen}>
                                            Delete
                                        </Button>
                                        <Button colorScheme='teal' onClick={editOnOpen}>
                                            Edit
                                        </Button>
                                        <DeleteModal film={film} getFilms={getFilms} isOpen={deleteIsOpen} onClose={deleteOnClose}/>
                                        <EditFilm film={film} getFilms={getFilms} isOpen={editIsOpen} onClose={editOnClose}/>
                                    </HStack>
                                    :
                                    <></>
                                }

                            </Flex>
                            
                        </CardFooter>
                    </Stack>
                    </Card>
                </AccordionPanel>
            </AccordionItem>
    )
}