import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import DisplayFilms from '../components/DisplayFilms';
import Banner from '../components/Banner';
import ReviewBox from '../components/ReviewBox';

import {Box, Heading, Text, HStack, Divider, Image, Avatar, Flex, Spacer, useDisclosure, Button } from '@chakra-ui/react'
import { Card, CardHeader, CardBody } from '@chakra-ui/react'

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
    Tbody,
    Tr,
    Td,
    TableContainer,
} from '@chakra-ui/react'

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'


import {StarIcon} from '@chakra-ui/icons'

const url = 'http://localhost:4941/api/v1';

function Reviews({film, reviewPosted}: any) {

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
    }, [film, reviewPosted])

    const ReviewList = () => {
        return reviews.map((review: Review) => 
        <Tr key={review.reviewerId}>
            <Td>

                <Card overflowX='scroll' maxW='3xl'>
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
                        {review.review === null ? <Text as='i'>No review provided.</Text> : <Text>{review.review}</Text>}
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
            size='xl'
          >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader fontSize='3xl'>
                    Reviews for: <Text as='i'>{film.title}</Text>
                    <Box pl='3' fontSize='md' fontWeight='normal'>
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
                </DrawerHeader>
                
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

function SimilarFilms({film, genre, directorFilms, genreFilms, getDirectorFilms, getGenreFilms, pageLength}: any) {
    return (
        <Box>
            <Heading pt='20' pb='4' fontStyle='italic' fontWeight='light' size='2xl'>Find Similar Films:</Heading>
            <Tabs isFitted>
                <TabList>
                    <Tab >More Films Directed By {film.directorFirstName + ' ' + film.directorLastName}</Tab>
                    <Tab>More {genre} Films</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <DisplayFilms filmData={directorFilms} getFilm={getDirectorFilms} pageLength={pageLength} h='20rem'/>
                    </TabPanel>
                    <TabPanel>
                        <DisplayFilms filmData={genreFilms} getFilm={getGenreFilms} pageLength={pageLength} h='20rem'/>
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
    const [reviewPosted, setReviewPosted] = useState(false);

    const getFilm = () => { 
        axios.get(url + '/films/' + id)
            .then((response) => {
                setFilm(response.data)
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
                setDirectorFilms(response.data.films.filter((x: BasicFilm) => x.filmId != film.filmId))
            })
        }
    const getGenreFilms = () => {
        axios.get(url + '/films'
                    , {params: {genreIds: film.genreId}})
            .then((response) => {
                setGenreFilms(response.data.films.filter((x: BasicFilm) => x.filmId != film.filmId))
            })
        }

    useEffect(() => {
        getFilm()
    }, [])

    useEffect(() => {
        getGenres()
        getDirectorFilms()
        getGenreFilms()
    }, [film])

    return (
        <Box className='page'>
            <Banner />
            <HStack textAlign='left' align='stretch' h='700px' pt='10'>
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '700px' }}
                    h='700'
                    src={url + /films/ + film.filmId + '/image'}
                    fallbackSrc='https://media.tenor.com/2LRO8xWwmuAAAAAC/american-psycho-patrick-bateman.gif'
                    alt={film.title}/> 
                <Divider orientation='vertical' px='1rem'/>
                <Flex direction={['row', 'column']}>
                    <Box>
                        <Heading size='3xl' pb='4' fontStyle='italic' fontWeight='light'>{film.title}</Heading>
                        {film.rating === 0 ? 
                            <Text >Unrated</Text>:
                            <HStack>
                                <StarIcon color='teal' />
                                <Text >{film.rating + '/10'}</Text>
                            </HStack>
                        }
                        {new Date(film.releaseDate) > new Date() ?
                            <Text fontStyle='italic'>Release Date: {film.releaseDate.replace('T', ' ').slice(0, -5)}</Text> :
                            <Text fontStyle='italic'>Released: {film.releaseDate.replace('T', ' ').slice(0, -5)}</Text>}
                        <Text fontStyle='italic'>{genres.get(film.genreId)}</Text>
                        <Text fontStyle='italic'>Age Rating: {film.ageRating}</Text>
                        <Text fontStyle='italic'>Runtime: {film.runtime} minutes</Text>
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
                    <Reviews film={film} reviewPosted={reviewPosted}/>
                </Flex>
            </HStack>
            <ReviewBox id={id} setReviewPosted={setReviewPosted}/>
            <SimilarFilms 
                film={film} 
                genre={genres.get(film.genreId)} 
                directorFilms={directorFilms} 
                genreFilms={genreFilms} 
                getDirectorFilms={getDirectorFilms} 
                getGenreFilms={getGenreFilms} 
                pageLength={5}/>
        </Box>
    )
    

}