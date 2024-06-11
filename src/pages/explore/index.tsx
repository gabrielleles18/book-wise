import {Flex, Heading, FormControl, Input, InputGroup, InputLeftElement, InputRightElement} from "@chakra-ui/react";
import {Sidebar} from "@/components/Sidebar";
import {PiBinoculars} from "react-icons/pi";
import {theme} from "@/styles/themes/default";
import React from "react";
import {SearchIcon} from "@chakra-ui/icons";

export default function explore() {
    return (
        <Flex p={4} h="100vh">
            <Sidebar/>

            <Flex marginLeft={'calc(232px + 1rem)'} w={'100%'} alignItems={'flex-start'} flexDirection={'column'}>

                <Flex w={'100%'} maxW={'1100px'} flexDirection={'column'} m={'0 auto'} pb={4}>
                    <Flex mt={14} mb={10} justifyContent={'space-between'}>
                        <Flex gap={'10px'} alignItems={'center'}>
                            <PiBinoculars size={34} color={theme.colors.green['400']}/>
                            <Heading size={'lg'}>Explorar</Heading>
                        </Flex>

                        <FormControl w={'430px'}>
                            <InputGroup>
                                <Input type='search' placeholder='Phone number' />
                                <InputRightElement pointerEvents='none'>
                                    <SearchIcon color='gray.300' />
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
