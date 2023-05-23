import useWindowDimensions from '../hooks/useWindowDimensions'
import { Center, Flex, Heading, IconButton, Box, Fade, SlideFade, useDisclosure } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import Sidebar from './SideBar';


export default function Banner() {

    const {height, width} = useWindowDimensions();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const bannerMessages = ['KILL ME',
                            'PUT MY HEAD IN A BLENDER',
                            'TOSS ME OFF A BRIDGE',
                            'SMEAR MY HEAD ACROSS THE PAVEMENT, LIKE JAM ON TOAST... MMM...',
                            'BLOW ME UP',
                            'FIRE ME INTO SPACE',
                            'SQUISH ME IN A HYDRAULIC PRESS',
                            'PUT ME IN A BATHTUB WITH A TOASTER. THANKS IN ADVANCE.',
                            'DON\'T MAKE ME DO THE SENG 365 PROJECT AGAIN (WORSE THAN DEATH)']

    return (
        <Box bg='teal' width='100vw' h='100' marginLeft={-(width-1280)/2}>
            <Sidebar isOpen={isOpen} onClose={onClose}/>
            <Flex h='100'>
                <Center>
                    {/* <Slide in={true} direction='left'> */}
                        <IconButton
                            borderLeftRadius='0'
                            borderRightRadius='full'
                            bg='teal.300'
                            aria-label='SideBar'
                            size='lg'
                            icon={<HamburgerIcon />}
                            onClick={onOpen}/>
                    {/* </Slide> */}
                    <Fade in={true} >
                        <Heading color='white' fontStyle='italic' fontFamily={Math.random() > 0.95 ? 'cursive' : 'serif'} marginLeft='600'>
                            PLEASE {bannerMessages[Math.floor(Math.random() * bannerMessages.length)]}
                        </Heading>
                    </Fade>
                    
                </Center>
            </Flex>
        </Box>
    )
}