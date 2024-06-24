import {MdMenuOpen} from "react-icons/md";
import {Drawer, DrawerContent, DrawerOverlay, Flex, useDisclosure} from "@chakra-ui/react";
import React from "react";
import {Sidebar} from "@/components/Sidebar";

export function MenuMobile() {
    const {isOpen, onOpen, onClose} = useDisclosure()
    return (
        <>
            <Flex
                p={2}
                borderRadius={4}
                bg={'gray.700'}
                _hover={{cursor: 'pointer', bg: 'gray.600'}}
                display={{base: 'flex', lg: 'none'}}
                onClick={onOpen}
            >
                <MdMenuOpen size={'24px'}/>
            </Flex>

            <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay/>
                <DrawerContent bg={'gray.800'}>
                    <Sidebar style={{h: '100%', w: '100%'}}/>
                </DrawerContent>
            </Drawer>
        </>
    )
}
