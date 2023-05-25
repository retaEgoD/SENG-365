import { useState, useEffect } from 'react'
import axios from 'axios'
import DisplayFilms from '../components/DisplayFilms';
import Banner from '../components/Banner';

import { Box, Heading } from '@chakra-ui/react';

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

const url = 'http://localhost:4941/api/v1';

function YourFilms({directedFilms, reviewedFilms, getDirectedFilms, getReviewedFilms, pageLength}: any) {
    return (
        <Box>
            <Heading py='10' fontStyle='italic' fontWeight='light' size='3xl'>YOUR FILMS</Heading>
            <Tabs isFitted>
                <TabList>
                    <Tab >Films You Directed</Tab>
                    <Tab>Films You Reviewed</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <DisplayFilms filmData={directedFilms} getFilms={getDirectedFilms} pageLength={pageLength} h='20rem'/>
                    </TabPanel>
                    <TabPanel>
                        <DisplayFilms filmData={reviewedFilms} getFilms={getReviewedFilms} pageLength={pageLength} h='20rem'/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

export default function MyFilms() {
    
    const [directedFilms, setDirectedFilms] = useState<Array<BasicFilm>> ([]);
    const [reviewedFilms, setReviewedFilms] = useState<Array<BasicFilm>> ([]);

    const getDirectedFilms = () => {
        axios.get(url + '/films'
                    , {params: {directorId: JSON.parse(localStorage.userId)}})
            .then((response) => {
                setDirectedFilms(response.data.films)
            })
        }
    const getReviewedFilms = () => {
        axios.get(url + '/films'
                    , {params: {reviewerId: JSON.parse(localStorage.userId)}})
            .then((response) => {
                setReviewedFilms(response.data.films)
            })
        }

   
    useEffect(() => {
        getDirectedFilms()
        getReviewedFilms()
    }, [])

    return (
        <Box>
            <Banner />
            <YourFilms 
                directedFilms={directedFilms} 
                reviewedFilms={reviewedFilms} 
                getDirectedFilms={getDirectedFilms} 
                getReviewedFilms={getReviewedFilms} 
                pageLength={10}/>
        </Box>
    )
}