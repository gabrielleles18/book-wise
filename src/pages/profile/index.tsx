import {Sidebar} from "@/components/Sidebar";
import React from "react";
import {Avatar, Box, Flex, FormControl, Heading, Input, Text} from "@chakra-ui/react";
import {PiUser, PiUserListBold} from "react-icons/pi";
import {theme} from "@/styles/themes/default";
import {useQuery} from "react-query";
import {api} from "@/lib/axios";
import Image from "next/image";
import {StarRating} from "@/components/StarRating";
import {IoBookmarkOutline, IoBookOutline} from "react-icons/io5";
import {GiBookshelf} from "react-icons/gi";
import AnalyticItem from "@/pages/profile/components/AnalyticItem";
import {getRelativeTime} from "@/lib/dayjs";

export default function Profile() {
    const [search, setSearch] = React.useState<string | null>(null);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

    const {data: rating} = useQuery({
        queryKey: ['ratingByUser', search],
        queryFn: async () => {
            const response = await api.get(`/rating/4383f783-6ce1-4f92-b1dd-7a7a693c4aef`, {
                params: {
                    search
                }
            })

            return response.data
        },
    });

    const boxCardStyles = {
        w: '100%',
        px: 6,
        py: 5,
        bg: 'gray.800',
        borderRadius: '8',
        flexDirection: 'column',
        gap: 6,
    }

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
                                placeholder='Buscar livro avaliado'
                                _placeholder={{color: 'green.100'}}
                                borderColor={'green.700'}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Flex>
                    <Flex className={'content'} gap={16}>
                        <Flex gap={6} flexDirection={'column'} flex={1}>
                            {rating?.map((rate: any) => {
                                const imageSrc = `http://localhost:3000/${rate.book.cover_url}`;

                                return (
                                    <Flex flexDirection={'column'}>
                                        <Text
                                            mb={1}
                                            color={'gray.100'}
                                            textTransform={'capitalize'}
                                        >
                                            {getRelativeTime(rate.created_at)}
                                        </Text>
                                        <Flex sx={boxCardStyles}>
                                            <Flex gap={5}>
                                                <Image
                                                    src={imageSrc}
                                                    alt={''}
                                                    width={98}
                                                    height={134}
                                                    objectFit={'contain'}
                                                />
                                                <Flex w={'100%'} flexDirection={'column'}>
                                                    <Heading
                                                        color={'gray.50'}
                                                        fontSize={'lg'}
                                                        mb={1}
                                                    >
                                                        {rate.book.name}
                                                    </Heading>
                                                    <Text color={'gray.200'}>{rate.book.author}</Text>

                                                    <Flex flex={1} alignItems={'flex-end'}>
                                                        <StarRating rate={parseInt(rate.rate)}/>
                                                    </Flex>
                                                </Flex>
                                            </Flex>
                                            <Text fontSize={'lg'} lineHeight={7}>{rate.description}</Text>
                                        </Flex>
                                    </Flex>
                                )
                            })}
                        </Flex>

                        <Flex
                            className={'sidebar'}
                            flexBasis={'360px'}
                            px={16}
                            py={5}
                            gap={12}
                            borderLeftColor={'gray.800'}
                            borderLeftWidth={'1px'}
                            flexDirection={'column'}
                        >
                            <Flex alignItems={'center'} flexDirection={'column'} width={'100%'} gap={1}>
                                <Avatar
                                    name='Dan Abrahmov'
                                    src='https://bit.ly/dan-abramov'
                                    size={'lg'}
                                    mb={4}
                                />
                                <Heading as={'h5'} size={'md'}>Dan Abrahmov</Heading>
                                <Text fontSize={'xs'} color={'gray.100'}>membro desde 2019</Text>
                                <Box w={'40px'} h={'5px'} bg={'green.500'} borderRadius={999} mt={10}></Box>
                            </Flex>

                            <Flex flexDirection={'column'} gap={14}>
                                <AnalyticItem
                                    icon={<IoBookOutline size={32} color={theme.colors.green['300']}/>}
                                    title={'Livros avaliados'}
                                    value={'8'}
                                />

                                <AnalyticItem
                                    icon={<GiBookshelf size={32} color={theme.colors.green['300']}/>}
                                    title={'Livros avaliados'}
                                    value={'4'}
                                />

                                <AnalyticItem
                                    icon={<PiUserListBold size={32} color={theme.colors.green['300']}/>}
                                    title={'Autores lidos'}
                                    value={'3'}
                                />

                                <AnalyticItem
                                    icon={<IoBookmarkOutline size={32} color={theme.colors.green['300']}/>}
                                    title={'Categoria mais lida'}
                                    value={'Horror'}
                                />
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}