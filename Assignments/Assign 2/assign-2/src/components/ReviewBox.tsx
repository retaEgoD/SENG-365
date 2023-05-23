import {useState} from 'react'
import axios from 'axios'
import { Box, Heading, Textarea, Button, Tooltip, useToast } from "@chakra-ui/react"

import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
  } from '@chakra-ui/react'

const url = 'https://seng365.csse.canterbury.ac.nz/api/v1';

export default function ReviewBox({id, setReviewPosted}: any) {
    const [reviewRating, setReviewRating] = useState(5)
    const [reviewText, setReviewText] = useState('')
    const handleReviewTextChange = (event: { target: { value: any; }; }) => setReviewText(event.target.value)

    const [sliderValue, setSliderValue] = useState(5)
    const [showTooltip, setShowTooltip] = useState(false)

    const authToken = localStorage.authToken;

    const Toast = useToast()
    const data = reviewText === '' ? {rating: reviewRating} : {rating: reviewRating, review: reviewText}

    const submitReview = () => {
        axios.post(url + '/films/' + id + '/reviews', 
                   data,
                   { headers: {'X-Authorization': authToken}})
            .then((response) => {
                setReviewPosted(true);
                Toast({
                    title: 'Review posted.',
                    description: 'Do you think your father is proud of you?',
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

    const labelStyles = {
        mt: '2',
        ml: '-2.5',
        fontSize: 'sm',
      }

    return (
        <Box>
            <Heading pt='20' fontStyle='italic' fontWeight='light' size='2xl'>Leave a Review:</Heading>
            <Box py='5'>
                <Slider 
                    w='400px'
                    defaultValue={5} 
                    min={1} 
                    max={10} 
                    step={1} 
                    onChange={(v) => setSliderValue(v)}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    onChangeEnd={(v) => setReviewRating(v)}
                >
                    <SliderMark value={1} {...labelStyles}>
                        1
                    </SliderMark>
                    <SliderMark value={10} {...labelStyles}>
                        10
                    </SliderMark>
                    <SliderTrack bg='teal.100'>
                        <Box position='relative' right={10} />
                        <SliderFilledTrack bg='teal.400' />
                    </SliderTrack>
                    <Tooltip
                        hasArrow
                        bg='teal.400'
                        color='white'
                        placement='top'
                        isOpen={showTooltip}
                        label={sliderValue}
                    >
                        <SliderThumb boxSize={6} />
                    </Tooltip>
                </Slider>
            </Box>
            <Box pb='5'>
                <Textarea placeholder='Thoughts?' value={reviewText} onChange={handleReviewTextChange}/>
            </Box>
            <Button onClick={submitReview} colorScheme='teal' w='1280px'>Submit</Button>
        </Box>
    )
}