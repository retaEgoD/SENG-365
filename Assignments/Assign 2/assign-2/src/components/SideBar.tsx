import {Box, Heading, Text, HStack, VStack, Stack, Divider, Image, Avatar, Flex, Spacer, useDisclosure, Button, Wrap, LinkOverlay } from '@chakra-ui/react'

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'

import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'

export default function Sidebar({isOpen, onClose}: any) {
    return (
        <Drawer
            isOpen={isOpen}
            placement='left'
            onClose={onClose}
            size='xl'
            colorScheme='teal'
          >
            <DrawerOverlay />
            <DrawerContent bg='gray.200'>
                <DrawerCloseButton />
                <DrawerHeader h='100px' bg='teal.400' fontStyle='italic' fontSize='3xl' textAlign='center'>
                    Navigation
                </DrawerHeader>
                <DrawerBody>
                <TableContainer w='100%'>
                    <Table variant='simple'>
                        <Tbody>
                        <Tr>
                            <Td>inches</Td>
                        </Tr>
                        <Tr>
                            <Td>feet</Td>
                        </Tr>
                        <Tr>
                            <Td>yards</Td>
                        </Tr>
                        </Tbody>
                    </Table>
                    
                </TableContainer>
                </DrawerBody>
        
                <DrawerFooter>
                </DrawerFooter>
            </DrawerContent>
          </Drawer>
    )
}