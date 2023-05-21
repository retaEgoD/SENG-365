import { useState, useEffect } from 'react'
import axios from 'axios'
import DisplayFilms from '../components/DisplayFilms'

import {Heading, Text, Input,  Button, HStack} from '@chakra-ui/react'

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'

import {ChevronDownIcon} from '@chakra-ui/icons'
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
            <DisplayFilms filmData={filmData} pageLength={10} h='40rem'/>
        </>
    )

}