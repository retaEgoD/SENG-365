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
import FilmCard from './FilmCard'


const url = 'https://seng365.csse.canterbury.ac.nz/api/v1';



export default function DisplayFilms({filmData, getFilms, pageLength, h}: any) {

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

    useEffect(() => {
        setPageNo(0);
    }, [filmData])

    const FilmList = () => {
        return filmData.slice(0+pageLength*pageNo, pageLength*(pageNo+1)).map((film: BasicFilm) =>
            <FilmCard film={film} genres={genres} url={url} getFilms={getFilms}/>
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
                    <Text fontWeight='light' fontStyle='italic' fontSize='3xl'>{pageNo+1}</Text>
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