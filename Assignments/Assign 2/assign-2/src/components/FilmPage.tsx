import { useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from './AuthContext'

import {Box, Heading, Text, Input, InputGroup, InputRightElement, IconButton, Button, HStack, VStack, useToast} from '@chakra-ui/react'


function FilmPage() {
    
    const [filmData, setFilmData] = useState <Array<Film>> ([]); 

    axios.get('http://localhost:3000/api/users')
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                setUsers(response.data)
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })


}