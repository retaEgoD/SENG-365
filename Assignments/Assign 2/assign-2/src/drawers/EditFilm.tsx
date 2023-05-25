import { useState } from "react";
import axios from 'axios'
import FilmDrawer from "./FilmDrawer";
import { useToast } from '@chakra-ui/react'
import removeEmpty from "../hooks/removeEmpty";

const url = 'https://seng365.csse.canterbury.ac.nz/api/v1';

export default function EditFIlm({film, getFilms, isOpen, onClose}: any) {

    const Toast = useToast()

    const [imageFile, setImageFile] = useState<any>(null);
    const [filmInfo, setFilmInfo] = useState({title: '', genreId: -1, ageRating: '', releaseDate: '', description: '', runtime: -1})

    const putImage = () => {
        if (imageFile !== null && ['jpg', 'jpeg', 'png', 'gif'].includes(imageFile.type.split('/').pop())) {
            axios.put(url + '/films/' + film.filmId + '/image', 
                        imageFile, 
                        { headers: {'X-Authorization': localStorage.authToken, 'Content-Type': imageFile.type}})
                    .then(() => {
                        Toast({
                            title: 'Image Posted.',
                            description: 'Why',
                            status: 'success',
                            duration: 9000,
                            isClosable: true
                        })
                        getFilms();
                        onClose()
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

    const patchFilm = () => {
        const patchInfo = removeEmpty(filmInfo)
        axios.patch(url + '/films/' + film.filmId, 
                removeEmpty(patchInfo), 
                { headers: {'X-Authorization': localStorage.authToken}})
            .then((_) => {
                Toast({
                    title: 'Jack Erskine',
                    description: 'Is Hell',
                    status: 'success',
                    duration: 9000,
                    isClosable: true
                })
                getFilms();
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

    return (
        <FilmDrawer
            heading={'Edit ' + film.title}
            isOpen={isOpen}
            onClose={onClose}
            setFilmInfo={setFilmInfo}
            setImageFile={setImageFile}
            buttonEvent={patchFilm}
            imageButton={true}
            imageButtonEvent={putImage}/>
    )
}