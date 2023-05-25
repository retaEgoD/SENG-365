import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";

const NotFound = () => {

    useEffect(() => {setTimeout(() => {window.location.href='/films'}, 3000)}, []
    )
    return (
        <Box>
            <Heading fontStyle='italic' fontWeight='light' fontSize='120'>404: NOT FOUND</Heading>
            <Text fontStyle='italic' fontWeight='light' >Returning to home page...</Text>
        </Box>
        
    )
}

export default NotFound;