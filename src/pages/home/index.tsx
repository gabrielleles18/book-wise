import {Box, Flex, Heading, Text, theme} from '@chakra-ui/react';

import {Sidebar} from "@/components/Sidebar";
import {CardDetails} from "@/components/CardDetails";
import {CardPopular} from "@/components/CardPopular";
import {PiChartLineUp} from "react-icons/pi";
import React from "react";
import Link from "next/link";
import {ArrowLeft, ArrowRight, CaretRight} from "phosphor-react";

export default function Home() {

    return (
        <Flex p={4} h="100vh">
            <Sidebar/>
            <Flex marginLeft={'calc(232px + 1rem)'} w={'100%'} alignItems={'flex-start'} flexDirection={'column'}>

                <Flex w={'100%'} maxW={'1100px'} flexDirection={'column'} m={'0 auto'} pb={4}>
                    <Flex mt={14} mb={10}>
                        <Flex gap={'10px'} alignItems={'center'}>
                            <PiChartLineUp size={34} color={theme.colors.purple['400']}/>
                            <Heading size={'lg'}>Início</Heading>
                        </Flex>
                    </Flex>

                    <Flex flexDirection={'row'} gap={14}>
                        <Flex flex={1} gap={'12px'} flexDirection={'column'}>
                            <Text mb={'4px'}>Avaliações mais recentes</Text>

                            <CardDetails />
                            <CardDetails />
                            <CardDetails />
                        </Flex>
                        <Flex w={'324px'} flexDirection={'column'} gap={3}>
                            <Flex w={'100%'} justifyContent={'space-between'} mb={1}>
                                <Text>Livros populares</Text>

                                <Flex alignItems={'center'} gap={1}>
                                    <Link href={''}>
                                        <Flex flexDirection={'row'} alignItems={'center'} gap={1}>
                                            <Text
                                                fontWeight={'bold'}
                                                _hover={{textDecoration: 'underline'}}
                                                color={theme.colors.purple['400']}
                                            >
                                                Ver todos
                                            </Text>
                                            <CaretRight size={20} color={theme.colors.purple['400']}/>
                                        </Flex>
                                    </Link>
                                </Flex>
                            </Flex>

                            <CardPopular/>
                            <CardPopular/>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
