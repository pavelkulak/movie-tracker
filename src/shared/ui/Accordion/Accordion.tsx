import { Accordion as ChakraAccordion, SimpleGrid, Span, Box, Text } from '@chakra-ui/react'
import { PlusIcon, MinusIcon } from '@/shared/ui/icons'
export interface AccordionProps {
    items: {
        title: string;
        text: string;
        value: string;
    }[];
}



export const Accordion = ({ items }: AccordionProps) => {
    return (
        <ChakraAccordion.Root multiple>

            <SimpleGrid columns={{ base: 1, lg: 2 }} columnGap={{ base: "20px", lg: "40px", xl: "80px" }} rowGap={{ base: "20px", lg: "20px", xl: "34px" }} >
                {items.map((item, index) => (
                    <ChakraAccordion.Item key={index} value={item.value} borderBottom="1px solid" borderColor="primary.45" css={{
                        "&:nth-last-child(-n+2)": {
                            borderBottom: { lg: "none" }
                        },
                        "&:last-child": {
                            borderBottom: "none"
                        }
                    }} py={{ base: "4", lg: "5" }}>
                        <ChakraAccordion.Context>
                            {(accordion) => {
                                const isOpen = accordion.value.includes(item.value);
                                return (
                                    <>
                                        <ChakraAccordion.ItemTrigger textStyle="h3" cursor="pointer" >
                                            <Box p={{ base: "12px", lg: "16px", xl: "20px" }} bg="bg.global" borderRadius="10px" border="2px solid" borderColor="bg.partical">
                                                <Text textStyle="h3">{String(index + 1).padStart(2, '0')}</Text>
                                            </Box>
                                            <Span flex="1" textAlign="left">{item.title}</Span>
                                            {isOpen ? <MinusIcon /> : <PlusIcon />}
                                        </ChakraAccordion.ItemTrigger>
                                        <ChakraAccordion.ItemContent>
                                            <ChakraAccordion.ItemBody textStyle="body">{item.text}</ChakraAccordion.ItemBody>
                                        </ChakraAccordion.ItemContent>
                                    </>
                                );
                            }}
                        </ChakraAccordion.Context>
                    </ChakraAccordion.Item>
                ))}
            </SimpleGrid>
        </ChakraAccordion.Root >
    )
};