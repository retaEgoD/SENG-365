import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import DisplayFilms from '../components/DisplayFilms';

import {Box, Heading, Text, HStack, VStack, Stack, Divider, Image, Avatar, Flex, Spacer, useDisclosure, Button, Wrap } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'

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
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'


import {StarIcon} from '@chakra-ui/icons'

const url = 'https://seng365.csse.canterbury.ac.nz/api/v1';

function Reviews({film}: any) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [reviews, setReviews] = useState <Array<Review>> ([])

    const getReviews = () => {
        axios.get(url + '/films/' + film.filmId + '/reviews')
        .then((response) => {
            setReviews(response.data);
        });
    }
    useEffect(() => {
        getReviews()
    }, [])

    const ReviewList = () => {
        return reviews.map((review: Review) => 
        <Tr key={review.reviewerId}>
            <Td>

                <Card maxW='sm'>
                    <CardHeader>
                        <HStack>
                            <Avatar 
                            name={review.reviewerFirstName + ' ' + review.reviewerLastName} 
                            src={url + '/users/' + review.reviewerId + '/image'}
                            />
                            <Box pl='2'>
                                <Text fontSize='28' pr='6'>{review.reviewerFirstName + ' ' + review.reviewerLastName} </Text>
                            </Box>
                        </HStack>
                        <HStack pt='1'>
                            <StarIcon color='teal' />
                            <Text>{review.rating + '/10'}</Text>
                        </HStack>
                    </CardHeader>
                    <CardBody>
                        {review.review === null ? <Text as='i'>No review provided.</Text> : <Text noOfLines={[1, 2, 3]}>{review.review}</Text>}
                    </CardBody>
                </Card>
            </Td>
        </Tr>
        )
    }

    return (
        <>
          <Button colorScheme='teal' onClick={onOpen}>
            See Reviews
          </Button>
          <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            size='md'
          >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>
                    Reviews for: <Text as='i'>{film.title}</Text>
                </DrawerHeader>
                <Box pl='6'>
                    {reviews.length === 0 ? 
                        <Text>No ratings for this film yet.</Text>:
                        <>
                            <HStack>
                                <StarIcon color='teal' />
                                <Text >{film.rating + '/10'}</Text>
                            </HStack>
                            <Text>{reviews.length} reviews.</Text>
                        </>
                    }
                </Box>
                <DrawerBody>
                <TableContainer>
                    <Table variant='simple'>
                        <Tbody>
                            {ReviewList()}
                        </Tbody>
                    </Table>
                </TableContainer>
                </DrawerBody>
        
                <DrawerFooter>
                </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </>
      )
}

function SimilarFilms({film, genre, directorFilms, genreFilms, pageLength}: any) {
    return (
        <Box>
            <Heading pt='10'>Find Similar Films:</Heading>
            <Tabs>
                <TabList>
                    <Tab>Films Directed By {film.directorFirstName + ' ' + film.directorLastName}</Tab>
                    <Tab>{genre} Films</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <DisplayFilms filmData={directorFilms} pageLength={pageLength} h='20rem'/>
                    </TabPanel>
                    <TabPanel>
                        <DisplayFilms filmData={genreFilms} pageLength={pageLength} h='20rem'/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

export default function SingleFilm() {

    const {id} = useParams()
    const [film, setFilm] = useState <DetailedFilm> ({filmId: -1, title: '', genreId: -1, ageRating: '', directorId: -1, directorFirstName: '', directorLastName: '', rating: -1, releaseDate: '', description: '', runtime: -1, numRatings: -1})
    const [genres, setGenres] = useState <Map<number, string>> (new Map([]));
    const [directorFilms, setDirectorFilms] = useState<Array<BasicFilm>> ([]);
    const [genreFilms, setGenreFilms] = useState<Array<BasicFilm>> ([]);

    const getFilm = () => { 
        axios.get(url + '/films/' + id)
            .then((response) => {
                setFilm(response.data)
                getGenres()
                getDirectorFilms()
                getGenreFilms()
            })
    }
    const getGenres = () => {
        axios.get(url + '/films/genres')
        .then((response) => {
            setGenres(new Map(response.data.map((x: Genre)  => [x.genreId, x.name])));
        });
    }

    const getDirectorFilms = () => {
        axios.get(url + '/films'
                    , {params: {directorId: film.directorId}})
            .then((response) => {
                setDirectorFilms(response.data.films)
            })
        }
    const getGenreFilms = () => {
        axios.get(url + '/films'
                    , {params: {genreIds: film.genreId}})
            .then((response) => {
                setGenreFilms(response.data.films)
            })
        }

    useEffect(() => {
        getFilm()
    }, [])

    return (
        <>
            <HStack textAlign='left' align='stretch' h='600px'>
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '600px' }}
                    h='600'
                    src={url + /films/ + film.filmId + '/image'}
                    fallbackSrc='https://pic-bstarstatic.akamaized.net/ugc/9f4faf208a6a902e28bb97a443eac31c51037b6e.jpg@1200w_630h_1e_1c_1f.webp'
                    alt={film.title}/> 
                <Divider orientation='vertical' px='1rem'/>
                <Flex direction={['row', 'column']}>
                    <Box>
                        <Heading size='3xl' pb='4'>{film.title}</Heading>
                        {film.rating === 0 ? 
                            <Text >Unrated</Text>:
                            <HStack>
                                <StarIcon color='teal' />
                                <Text >{film.rating + '/10'}</Text>
                            </HStack>
                        }
                        {new Date(film.releaseDate) > new Date() ?
                            <Text as='i' >Release Date: {film.releaseDate.slice(0, 10)}</Text> :
                            <Text as='i'>Released: {film.releaseDate.slice(0, 10)}</Text>}
                        <br/>
                        <Text as='i'>{genres.get(film.genreId)}</Text>
                        <br/>
                        <Text as='i'>Age Rating: {film.ageRating}</Text>
                    </Box>
                    <Spacer />
                    <Heading size='md' >About this film:</Heading>
                    <Text>{film.description}</Text>
                    <Spacer />
                    <HStack pb='5'>
                        <Avatar 
                            name={film.directorFirstName + ' ' + film.directorLastName} 
                            src={url + '/users/' + film.directorId + '/image'}
                            size='xl'/>
                        <Box pl='4'>
                            <Text as='i' fontSize='12'>Directed by: </Text>
                            <Text fontSize='28' pr='6'>{film.directorFirstName + ' ' + film.directorLastName} </Text>
                        </Box>
                    </HStack>
                    <Reviews film={film}/>
                </Flex>
            </HStack>
            <SimilarFilms film={film} genre={genres.get(film.genreId)} directorFilms={directorFilms} genreFilms={genreFilms} pageLength={5}/>
        </>
    )
    

}