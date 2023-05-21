import { useState, useEffect } from 'react'
import { Link as ReactLink } from "react-router-dom";
import axios from 'axios'

import {Box, Heading, Text, Input, InputGroup, InputRightElement, IconButton, Button, Stack, HStack, Image, Avatar, SlideFade, ScaleFade, Flex, Spacer, Link } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from '@chakra-ui/react'

import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'

import {ChevronDownIcon, StarIcon, ChevronLeftIcon, ArrowLeftIcon, ChevronRightIcon, ArrowRightIcon} from '@chakra-ui/icons'
import {Select} from "chakra-react-select";
import makeAnimated from "react-select/animated";


const url = 'https://seng365.csse.canterbury.ac.nz/api/v1';

function Search({searchTerm, setSearchTerm, 
                 sort, setSort,
                 tags, setTags,
                 getFilms}: any) {

    const handleSearchTermChange = (event: { target: { value: any; }; }) => {
        setSearchTerm(event.target.value);
        if (event.target.value === '') {
            setSearchTerm(null)
        }
        useEffect(() => {
            getFilms()
        }, [])
    }

    const handleSortChange = (sort: any) => {
        setSort(sort);
        useEffect(() => {
            getFilms()
        }, [])
    }

    const animatedComponents = makeAnimated();

    const sortMap = new Map([
        ['ALPHABETICAL_ASC', 'Alphabetical, Asc'],
        ['ALPHABETICAL_DESC', 'Alphabetical, Desc'],
        ['RELEASED_ASC', 'Release Date, Asc'],
        ['RELEASED_DESC', 'Release Date, Desc'],
        ['RATING_ASC', 'Rating, Asc'],
        ['RATING_DESC', 'Rating, Desc']
    ]);
    const ageRatings = ['G', 'PG', 'M', 'R13', 'R16', 'R18', 'TBC'];

    const [genres, setGenres] = useState <Array<Genre>> ([]);
    
    useEffect(() => {
        getGenres()
    }, [])

    const getGenres = () => {
        axios.get(url + '/films/genres')
            .then((response) => {
                setGenres(response.data)
        });
    }
    
    const ageRatingOptions = {"label": "Age Rating",
                              "options": ageRatings.map(x => ({"value": x, "label": x}))};
    const genreOptions = {"label": "Genre", 
                          "options": genres.map(x => ({"value": x.genreId, "label": x.name}))}
    const tagOptions = [ageRatingOptions, genreOptions];
    

    return (
        <>
            <Input 
                variant='flushed'
                pr='60rem'
                placeholder='Pick something...' 
                size='lg' value={searchTerm} 
                onChange={handleSearchTermChange} 
            />
            <HStack pt='0.5rem' pb='0.5rem'>
                <Menu >
                    <MenuButton
                        minW='13rem' 
                        textAlign='left' 
                        as={Button} 
                        rightIcon={<ChevronDownIcon />} 
                        color={sort === null ? 'gray.400' : 'teal.400'}
                    >
                            {sort === null ? 'Select a sort...' : sortMap.get(sort)}
                    </MenuButton>
                    <MenuList >
                        <MenuItem onClick={() => handleSortChange(null)}>Select a sort...</MenuItem>
                        <MenuItem onClick={() => handleSortChange('ALPHABETICAL_ASC')} command='A-Z'>Alphabetical, Asc</MenuItem>
                        <MenuItem onClick={() => handleSortChange('ALPHABETICAL_DESC')} command='Z-A'>Alphabetical, Desc</MenuItem>
                        <MenuItem onClick={() => handleSortChange('RELEASED_ASC')} command='99-00'>Release Date, Asc</MenuItem>
                        <MenuItem onClick={() => handleSortChange('RELEASED_DESC')} command='00-99'>Release Date, Desc</MenuItem>
                        <MenuItem onClick={() => handleSortChange('RATING_ASC')} command='0.0-5.0'>Rating, Asc</MenuItem>
                        <MenuItem onClick={() => handleSortChange('RATING_DESC')} command='5.0-0.0'>Rating, Desc</MenuItem>
                    </MenuList>
                </Menu>
                <Select
                    isMulti
                    name="colors"
                    variant='filled'
                    colorScheme="teal"
                    focusBorderColor='teal.500'
                    options={tagOptions}
                    placeholder="Select some tags..."
                    closeMenuOnSelect={false}
                />
            </HStack>
            
        </>
    )
}

function Films({filmData}: any) {

    const [genres, setGenres] = useState <Map<number, string>> (new Map([]));
    const [pageNo, setPageNo] = useState(0);
    
    const getGenres = () => {
        axios.get(url + '/films/genres')
            .then((response) => {
                setGenres(new Map(response.data.map((x: Genre)  => [x.genreId, x.name])));
        });
    }
    getGenres()

    const FilmList = () => {
        return filmData.slice(0+10*pageNo, 10*(pageNo+1)).map((film: BasicFilm) =>
            <AccordionItem>
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
                                    <Heading size='xl'>{film.title}</Heading>
                                        {new Date(film.releaseDate) > new Date() ?
                                            <Text as='i'>Release Date: {film.releaseDate.slice(0, 10)}</Text> :
                                            <Text as='i'>Released: {film.releaseDate.slice(0, 10)}</Text>}
                                        <br />
                                        <Text as='i'>Age Rating: {film.ageRating}</Text>
                                </Box>
                                <Spacer />
                                <HStack>
                                    <Box>
                                        <Text as='i' fontSize='12'>Directed by: </Text>
                                        <Text fontSize='28' pr='6'>{film.directorFirstName + ' ' + film.directorLastName} </Text>
                                    </Box>
                                    <Avatar 
                                        name={film.directorFirstName + film.directorLastName} 
                                        src={url + '/users/' + film.directorId + '/image'}
                                        size='xl'/>
                                </HStack>
                            </Flex>
                        </CardBody>
                        <CardFooter>
                        <Link as={ReactLink} to={'/films/' + film.filmId}>
                            <Button variant='solid' colorScheme='teal' >
                                See more
                            </Button>
                        </Link>
                            
                        </CardFooter>
                    </Stack>
                    </Card>
                </AccordionPanel>
            </AccordionItem>
        )
    }


    return (
        <Flex direction={['row', 'column']} h='40rem'>
            <Accordion allowMultiple>
                {FilmList()}
            </Accordion>
            <Spacer />
            <HStack justify='center' pt={10}>
                <IconButton
                isDisabled={pageNo <= 0 || filmData.length === 0}
                color={pageNo <= 0 || filmData.length === 0 ? 'lightgray' : 'black'}
                variant='unstyled'
                aria-label='Page 1'
                size='lg'
                borderRadius='full'
                icon={<ArrowLeftIcon />}
                onClick={() => setPageNo(0)}
                />
                <IconButton
                isDisabled={pageNo <= 0 || filmData.length === 0}
                color={pageNo <= 0 || filmData.length === 0 ? 'lightgray' : 'black'}
                variant='unstyled'
                aria-label='Previous Page'
                size='lg'
                borderRadius='full'
                icon={<ChevronLeftIcon />}
                onClick={() => setPageNo(pageNo-1)}
                />
                <Text fontWeight='semibold' fontSize='3xl'>{pageNo+1}</Text>
                <IconButton
                isDisabled={pageNo >= Math.ceil(filmData.length/10)-1 || filmData.length === 0}
                color={pageNo >= Math.ceil(filmData.length/10)-1 || filmData.length === 0 ? 'lightgray' : 'black'}
                variant='unstyled'
                aria-label='Next Page'
                size='lg'
                borderRadius='full'
                icon={<ChevronRightIcon />}
                onClick={() => setPageNo(pageNo+1)}
                />
                <IconButton
                isDisabled={pageNo >= Math.ceil(filmData.length/10)-1 || filmData.length === 0}
                color={pageNo >= Math.ceil(filmData.length/10)-1 || filmData.length === 0 ? 'lightgray' : 'black'}
                variant='unstyled'
                aria-label='Page n'
                size='lg'
                borderRadius='full'
                icon={<ArrowRightIcon />}
                onClick={() => setPageNo(Math.ceil(filmData.length/10)-1)}
                />
            </HStack>
        </Flex>
        
    )
}

export default function FilmsPage() {
    
    const [filmData, setFilmData] = useState <Array<BasicFilm>> ([]);
    const [searchTerm, setSearchTerm] = useState(null);
    const [sort, setSort] = useState(null)
    const [tags, setTags] = useState(null)
    
    const getFilms = () => {
        axios.get(url + '/films', {
            params: {q: searchTerm, sortBy: sort}})
            .then((response) => {
                setFilmData(response.data.films)
            })
        }

    getFilms()

    return (
        <>
            <Search 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
                sort={sort} 
                setSort={setSort} 
                tags={tags} 
                setTags={setTags} 
                getFilms={getFilms}/>
            <Heading textAlign='left' pb='0.5rem'>Results</Heading>
            <Text as='i'>{filmData.length} results</Text>
            <Films filmData={filmData}/>
        </>
    )

}