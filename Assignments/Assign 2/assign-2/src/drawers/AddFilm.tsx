import { useState } from "react";
import axios from 'axios'
import FilmDrawer from "./FilmDrawer";
import { useToast } from '@chakra-ui/react'
import removeEmpty from "../hooks/removeEmpty";

const url = 'https://seng365.csse.canterbury.ac.nz/api/v1';

export default function AddFilm({isOpen, onClose}: any) {

    const Toast = useToast()

    const [imageFile, setImageFile] = useState<any>(null);
    const [filmInfo, setFilmInfo] = useState({title: '', genreId: -1, ageRating: '', releaseDate: '', description: '', runtime: -1})

    const putImage = (id: any) => {
        axios.put(url + '/films/' + id + '/image', 
                    imageFile, 
                    { headers: {'X-Authorization': localStorage.authToken, 'Content-Type': imageFile.type}})
                .then(() => {
                    Toast({
                        title: 'Image Posted.',
                        description: ':):',
                        status: 'success',
                        duration: 9000,
                        isClosable: true
                    })
                }, (error) => {
                    Toast({
                        title: 'Something went wrong. Here\'s a helpful error message.',
                        description: `${error.toString()}`,
                        status: 'error',
                        duration: 9000,
                        isClosable: true
                    })
                });
    }

    const postFilm = () => {
        if (imageFile !== null && ['jpg', 'jpeg', 'png', 'gif'].includes(imageFile.type.split('/').pop())) {
            const postInfo = removeEmpty(filmInfo)
            axios.post(url + '/films', 
                    removeEmpty(postInfo), 
                    { headers: {'X-Authorization': localStorage.authToken}})
                .then((response) => {
                    Toast({
                        title: 'Film Posted.',
                        description: 'Refresh to see it.',
                        status: 'success',
                        duration: 9000,
                        isClosable: true
                    })
                    putImage(response.data.filmId);
                    onClose();
                }, (error) => {
                    Toast({
                        title: 'Something went wrong. Here\'s a helpful error message.',
                        description: `${error.toString()}`,
                        status: 'error',
                        duration: 9000,
                        isClosable: true
                    })
                });
        } else {
            Toast({
                title: 'Something went wrong. Try harder next time.',
                description: 'Your image is in the wrong format.',
                status: 'error',
                duration: 9000,
                isClosable: true
            })
        }
    }

    return (
        <FilmDrawer
            required
            heading='Add a New Film'
            isOpen={isOpen} 
            onClose={onClose} 
            setFilmInfo={setFilmInfo} 
            setImageFile={setImageFile} 
            buttonEvent={postFilm}/>
    )
}