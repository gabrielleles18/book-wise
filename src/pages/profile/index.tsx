import {Sidebar} from "@/components/Sidebar";
import React from "react";
import {Flex, FormControl, Heading, Input, Text} from "@chakra-ui/react";
import {PiBinoculars, PiUser} from "react-icons/pi";
import {theme} from "@/styles/themes/default";

export default function Profile() {
    const [search, setSearch] = React.useState<string | null>(null);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

    return (
        <Flex p={4} h="100vh">
            <Sidebar/>
            <Flex marginLeft={'calc(232px + 1rem)'} w={'100%'} alignItems={'flex-start'} flexDirection={'column'}>
                <Flex w={'100%'} maxW={'1100px'} flexDirection={'column'} m={'0 auto'} pb={4}>
                    <Flex mt={14} mb={10} justifyContent={'space-between'}>
                        <Flex gap={'10px'} alignItems={'center'}>
                            <PiUser size={34} color={theme.colors.green['400']}/>
                            <Heading size={'lg'}>Perfil</Heading>
                        </Flex>

                        <FormControl w={'430px'}>
                            <Input
                                size='lg'
                                type='search'
                                color={'green.50'}
                                placeholder='Buscar por livro'
                                _placeholder={{color: 'green.100'}}
                                borderColor={'green.700'}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
