import {Flex, Text} from "@chakra-ui/react";
import React from "react";

interface AnalyticItemProps {
    icon: React.ReactNode;
    title: string;
    value: string;
}

export default function AnalyticItem({icon, title, value}: AnalyticItemProps) {
    return (
        <Flex alignItems={'center'} gap={4} w={'100%'}>
            {icon}
            <Flex flexDirection={'column'}>
                <Text color={'gray.50'} fontWeight={'bold'} fontSize={'xl'}>{value}</Text>
                <Text color={'gray.100'}>{title}</Text>
            </Flex>
        </Flex>
    )
}
