import {Flex, Text} from "@chakra-ui/react";
import Image from "next/image";
import Link, {LinkProps} from "next/link";

interface SocialButtonProps extends LinkProps {
    icon: string;
    text: string;
}

const boxStyles = {
    bg: 'gray.600',
    borderRadius: '8px',
    padding: 5,
    alignItems: 'center',
    gap: '20px',
    borderWidth: '1px',
    borderColor: 'gray.600',
    transaction: 'border-color 0.2s',

    ':hover': {
        borderColor: 'gray.400',
    }
}

export function SocialButton({icon, text, ...rest}: SocialButtonProps) {
    return (
        <Link target={'_blank'} {...rest}>
            <Flex sx={boxStyles}>
                <Image src={icon} alt={''} width={32} height={32} priority/>
                <Text color={'gray.50'} fontSize={'lg'} fontWeight={'bold'}>
                    {text}
                </Text>
            </Flex>
        </Link>
    )
}
