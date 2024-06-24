import {Flex, Heading, Text, useBreakpoint} from '@chakra-ui/react';

import {Sidebar} from "@/components/Sidebar";
import {CardDetails} from "@/components/CardDetails";
import {CardPopular} from "@/components/CardPopular";
import {PiChartLineUp} from "react-icons/pi";
import React from "react";
import {CaretRight} from "phosphor-react";
import {theme} from "@/styles/themes/default";
import {api} from "@/lib/axios";
import {useQuery} from "react-query";
import {RatingPopularProps, RatingProps} from "@/@types/global";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {NextSeo} from "next-seo";
import {MenuMobile} from "@/components/MenuMobile";

export default function Home() {
    const session = useSession();
    const user = session.data?.user;
    const navigation = useRouter();
    const breakpoint = useBreakpoint();

    const {data: ratingByUser, status} = useQuery({
        queryKey: ['ratingByUserIdOnly'],
        queryFn: async () => {
            const response = await api.get(`/rating/${user?.id}`, {
                params: {
                    limit: 1
                }
            })

            return response.data
        },
        enabled: !!user
    });

    const {data: rating} = useQuery({
        queryKey: ['rating', ratingByUser],
        queryFn: async () => {
            const response = await api.get(`/rating`, {
                params: {
                    exclude: ratingByUser != undefined && ratingByUser.length > 0 ? ratingByUser[0]?.id : '',
                }
            })

            return response.data
        },
    });

    const {data: ratingPopular} = useQuery({
        queryKey: ['ratingPopular'],
        queryFn: async () => {
            const response = await api.get(`/rating/popular`)

            return response.data
        },
    });

    return (
        <>
            <NextSeo
                title="Início | Book Wise"
                description="Acompanhe suas avaliações e estatísticas de leitura."
            />

            <Flex p={4} h="100vh">
                {breakpoint != 'base' && breakpoint !== 'sm' && breakpoint !== 'md' && (
                    <Sidebar/>
                )}

                <Flex
                    marginLeft={{base: '0', lg: 'calc(232px + 1rem)'}}
                    w={'100%'}
                    alignItems={'flex-start'}
                    flexDirection={'column'}
                >
                    <MenuMobile/>
                    <Flex w={'100%'} maxW={'1100px'} flexDirection={'column'} m={'0 auto'} pb={4}>
                        <Flex
                            mt={{base: 4, lg: 14}}
                            mb={10}
                        >
                            <Flex gap={'10px'} alignItems={'center'}>
                                <PiChartLineUp size={34} color={theme.colors.green['400']}/>
                                <Heading size={'lg'}>Início</Heading>
                            </Flex>
                        </Flex>

                        <Flex flexDirection={{base: 'column', md: 'row'}} gap={{base: 4, xl: 14}}>
                            <Flex flex={1} gap={'12px'} flexDirection={'column'}>
                                {ratingByUser && (
                                    <Flex w={'100%'} justifyContent={'space-between'} mb={1}>
                                        <Text>Sua última leitura</Text>

                                        <Flex alignItems={'center'} gap={1} onClick={() => navigation.push('profile')}
                                              _hover={{cursor: 'pointer'}}>
                                            <Flex flexDirection={'row'} alignItems={'center'} gap={1}>
                                                <Text
                                                    fontWeight={'bold'}
                                                    color={theme.colors.purple['400']}
                                                >
                                                    Ver todos
                                                </Text>
                                                <CaretRight size={20} color={theme.colors.purple['400']}/>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                )}

                                {ratingByUser?.map((book: RatingProps) => (
                                    <CardDetails
                                        key={book.id}
                                        user={book.user}
                                        book={book.book}
                                        rate={book.rate}
                                        created_at={book.created_at}
                                        styles={{bg: 'gray.700', mb: 8}}
                                    />
                                ))}

                                <Text mb={'4px'}>Avaliações mais recentes</Text>

                                {rating?.map((book: RatingProps) => (
                                    <CardDetails
                                        key={book.id}
                                        user={book.user}
                                        book={book.book}
                                        rate={book.rate}
                                        created_at={book.created_at}
                                    />
                                ))}
                            </Flex>
                            <Flex w={{base: '100%', md: '324px'}} flexDirection={'column'} gap={3}>
                                <Flex w={'100%'} justifyContent={'space-between'} mb={1}>
                                    <Text>Livros populares</Text>

                                    <Flex alignItems={'center'} gap={1} onClick={() => navigation.push('explore')}
                                          _hover={{cursor: 'pointer'}}>
                                        <Flex flexDirection={'row'} alignItems={'center'} gap={1}>
                                            <Text
                                                fontWeight={'bold'}
                                                color={theme.colors.purple['400']}
                                            >
                                                Ver todos
                                            </Text>
                                            <CaretRight size={20} color={theme.colors.purple['400']}/>
                                        </Flex>
                                    </Flex>
                                </Flex>

                                {ratingPopular?.map((book: RatingPopularProps) => (
                                    <CardPopular
                                        key={book.id}
                                        name={book.book.name}
                                        author={book.book.author}
                                        coverUrl={book.book.cover_url}
                                        rate={book.rate}
                                        styles={{_hover: {cursor: 'unset', bg: 'gray.800'}}}
                                    />
                                ))}
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}
