import {Flex} from '@chakra-ui/react';

import {Sidebar} from "@/components/Sidebar";
import {CardDetails} from "@/components/CardDetails";
import {CardPopular} from "@/components/CardPopular";

export default function Home() {

    return (
        <Flex p={4} h="100vh">
            <Sidebar/>
            <Flex marginLeft={'calc(232px + 1rem)'} w={'100%'} alignItems={'flex-start'}>
                {/*<CardDetails/>*/}
                <CardPopular/>
            </Flex>
        </Flex>
    )
}
