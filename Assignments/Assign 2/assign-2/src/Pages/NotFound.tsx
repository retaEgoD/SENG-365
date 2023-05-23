import { Box, Heading, Text } from "@chakra-ui/react";

const NotFound = () => {
    return (
        <Box>
            <Heading fontStyle='italic' fontWeight='light' fontSize='120'>404: NOT FOUND</Heading>
            <Text>...Or you navigated to this page from the sidebar. 404's are boring, so please sample some music I like while you're here.</Text>
        </Box>
        
    )
}

export default NotFound;