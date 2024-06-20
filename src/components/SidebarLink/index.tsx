import {Box, Flex, Text} from "@chakra-ui/react";
import Link, {LinkProps} from "next/link";
import React from "react";
import {useRouter} from "next/router";

interface SidebarLinkProps extends LinkProps {
    text: string;
    icon?: React.ReactNode;
}

const flexStyles = {
    gap: 4,
    alignItems: 'center',
    color: 'gray.200',
    paddingLeft: 4,
    transition: 'color 0.2s',
    ':hover': {
        color: 'gray.50'
    }
}

export function SidebarLink({text, icon, ...rest}: SidebarLinkProps) {
    const router = useRouter();
    const {asPath} = router;
    const {href} = rest;

    const isActive = asPath == href;

    return (
        <Link {...rest}>
            <Flex alignItems={'center'}>
                <Box
                    w={'4px'}
                    height={'24px'}
                    bgGradient={isActive ? "linear(to-t, #7FD1CC, #9694F5)" : 'transparent'}
                    borderRadius={999}
                />
                <Flex sx={flexStyles}>
                    {icon}
                    <Text fontSize={'xl'} color={isActive ? 'gray.50' : ''} fontWeight={'bold'}>{text}</Text>
                </Flex>
            </Flex>
        </Link>
    )
}
