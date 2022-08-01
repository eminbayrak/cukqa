import React from "react"
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Input,
    UnorderedList,
    ListIcon,
    ListItem,
    useDisclosure
} from "@chakra-ui/react"
import { CategoriesData } from "../data/data";
import { useRouter } from "next/router";

function DrawerBar() {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef<any>();

    return (
        <>
            <Button ref={btnRef} bg={'transparent'} onClick={onOpen}>
                Categories
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Categories</DrawerHeader>
                    <DrawerBody>
                        {CategoriesData?.map(({ value, label }) => (
                            <div key={value} onClick={() => router.push(`categories/${value}`)} className="text-gray-200 w-full cursor-pointer hover:bg-gray-600 px-2 py-2 rounded-md"># {label}</div>)
                        )}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default DrawerBar;