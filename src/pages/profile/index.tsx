import {Sidebar} from "@/components/Sidebar";
import React from "react";
import {Flex, FormControl, Heading, Input, Text} from "@chakra-ui/react";
import {PiBinoculars, PiUser} from "react-icons/pi";
import {theme} from "@/styles/themes/default";
import {useQuery} from "react-query";
import {api} from "@/lib/axios";
import {CardPopular} from "@/components/CardPopular";

export default function Profile() {
    const [search, setSearch] = React.useState<string | null>(null);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

    const {data: books} = useQuery({
        queryKey: ['books', search],
        queryFn: async () => {
            const response = await api.get(`/rating/4383f783-6ce1-4f92-b1dd-7a7a693c4aef`)

            return response.data
        },
    });

    console.log(books);

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

                    {books?.map((book: any) => {
                        return (
                            <CardPopular
                                key={book.id}
                                name={book.book.title}
                                author={book.book.author}
                                coverUrl={book.book.cover_url}
                                rate={book.rate}
                            />
                        )
                    })}
                </Flex>
            </Flex>
        </Flex>
    )
}
