import useWindowDimensions from '../hooks/useWindowDimensions'
import { Center, Flex, Heading, IconButton, Box, Fade, useDisclosure } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import Sidebar from '../drawers/SideBar';


export default function Banner() {

    const { height: _, width } = useWindowDimensions();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const bannerMessages = ['KILL ME',
                            'PUT MY HEAD IN A BLENDER',
                            'TOSS ME OFF A BRIDGE',
                            'SMEAR MY HEAD ACROSS THE PAVEMENT, LIKE JAM ON TOAST... MMM...',
                            'BLOW ME UP',
                            'FIRE ME INTO SPACE',
                            'SQUISH ME IN A HYDRAULIC PRESS',
                            'PUT ME IN A BATHTUB WITH A TOASTER. THANKS IN ADVANCE.',
                            'DON\'T MAKE ME DO THE SENG 365 PROJECT AGAIN (WORSE THAN DEATH)',
                            'POUR $1,000,000 IN PENNIES ONTO ME',
                            'DO NOT TAKE ANY OF THIS SERIOUSLY',
                            'I AM SO FUCKING BORED OF THIS ASSIGNMENT',
                            'REMOVE MY INTERNAL ORGANS',
                            'GET ME OUT OF THIS FUCKING HOLE']

    return (
        <Box>
            <IconButton
                position='fixed'
                ml='-50vw'
                mt='120px'
                borderLeftRadius='0'
                borderRightRadius='full'
                bg='teal.300'
                aria-label='SideBar'
                size='lg'
                icon={<HamburgerIcon />}
                onClick={onOpen}/>
            
            <Box bg='teal' width='99.52vw' h='100' marginLeft={-(width-1280)/2}>
                <Sidebar isOpen={isOpen} onClose={onClose}/>
                <Flex h='100'>
                    
                    <Center>
                        
                        <Fade in={true} >
                            <Heading color='white' fontStyle='italic' fontFamily='serif' fontWeight='light' marginLeft={(width-1280)/2}>
                                PLEASE {bannerMessages[Math.floor(Math.random() * bannerMessages.length)]}
                            </Heading>
                        </Fade>
                        
                    </Center>
                </Flex>
            </Box>
        </Box>
        
    )
}