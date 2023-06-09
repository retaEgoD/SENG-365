import { useState, useEffect } from 'react'
import axios from 'axios'
import DisplayFilms from '../components/DisplayFilms'
import Banner from '../components/Banner'

import {Heading, Text, Input,  Button, HStack, Box} from '@chakra-ui/react'

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'

import {ChevronDownIcon} from '@chakra-ui/icons'
import {Select} from "chakra-react-select";

const url = 'http://localhost:4941/api/v1';

function Search({searchTerm, setSearchTerm, 
                 sort, setSort,
                 tags, setTags,
                 getFilms}: any) {

    const handleSearchTermChange = (event: { target: { value: any; }; }) => {
        setSearchTerm(event.target.value);
        if (event.target.value === '') {
            setSearchTerm(null)
        }
    }

    const handleSortChange = (sort: any) => {
        setSort(sort);
    }

    const handleTagsChange = (selected: any) => {
        setTags(selected);
    }

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

    useEffect(() => {
        getFilms()
    }, [searchTerm, sort, tags])
    
    const ageRatingOptions = {"label": "Age Rating",
                              "options": ageRatings.map(x => ({"value": x, "label": x}))};
    const genreOptions = {"label": "Genre", 
                          "options": genres.map(x => ({"value": x.genreId, "label": x.name}))}
    const tagOptions = [ageRatingOptions, genreOptions];
    

    return (
        <Box pt='10'>
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
                    value={tags}
                    onChange={handleTagsChange}
                />
            </HStack>
            
        </Box>
    )
}

export default function FilmsPage() {
    
    const [filmData, setFilmData] = useState <Array<BasicFilm>> ([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sort, setSort] = useState(null)
    const [tags, setTags] = useState<Array<any>>([])
    
    const getFilms = () => {
        const genres = tags.filter(x => typeof x.value === 'number').map(x => x.value)
        const ageRatings = tags.filter(x => typeof x.value === 'string').map(x => x.value)
        axios.get(url + '/films', {
            params: {q: searchTerm === '' ? null : searchTerm, sortBy: sort, genreIds: genres, ageRatings: ageRatings}})
            .then((response) => {
                setFilmData(response.data.films)
            })
        }

    useEffect(() => {
        getFilms()
    }, [])

    return (
        <Box className='page'>
            <Banner />
            <>
                <Search 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm} 
                    sort={sort} 
                    setSort={setSort} 
                    tags={tags} 
                    setTags={setTags}
                    getFilms={getFilms}/>
                <Heading textAlign='left' pb='0.5rem' fontStyle='italic' fontWeight='light' fontSize='5xl'>Results</Heading>
                <Text textAlign='left'>Click a film to expand.</Text>
                <Text as='i'>{filmData.length} results</Text>
                <DisplayFilms filmData={filmData} getFilms={getFilms} pageLength={10} h='40rem'/>
            </>
            
        </Box>
    )

}