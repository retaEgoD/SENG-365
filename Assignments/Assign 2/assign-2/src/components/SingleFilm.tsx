import { useState, useContext, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'

import {Box, Heading, Text, Input, InputGroup, InputRightElement, IconButton, Button, Stack, HStack, Image, Avatar, SlideFade, ScaleFade, Flex, Spacer } from '@chakra-ui/react'
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

const url = 'https://seng365.csse.canterbury.ac.nz/api/v1';

export default function SingleFilm() {

    const {id} = useParams()
    const [film, setFilm] = useState <DetailedFilm> ({filmId: -1, title: '', genreId: -1, ageRating: '', directorId: -1, directorFirstName: '', directorLastName: '', rating: -1, releaseDate: '', description: '', runtime: -1, numRatings: -1})

    axios.get(url + '/films/' + id)
        .then((response) => {
            setFilm(response.data)
        })
    
    return (
        <>
            <Box>
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '200px' }}
                    src={url + /films/ + film.filmId + '/image'}
                    fallbackSrc='https://pic-bstarstatic.akamaized.net/ugc/9f4faf208a6a902e28bb97a443eac31c51037b6e.jpg@1200w_630h_1e_1c_1f.webp'
                    alt={film.title}/> 
            </Box>
        </>
    )
    

}