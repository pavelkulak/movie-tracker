import { Accordion as ChakraAccordion, SimpleGrid, Span, Box, Text } from '@chakra-ui/react'
import { PlusIcon, MinusIcon } from '@/shared/ui/icons'

export interface AccordionProps {
    items: {
        title: string;
        text: string;
        value: string;
    }[];
}

/**
 * Вспомогательный компонент для одного элемента аккордеона
 */
const AccordionItem = ({
    item,
    index,
    isLast = false
}: {
    item: AccordionProps['items'][0],
    index: number
    isLast?: boolean
}) => (
    <ChakraAccordion.Item
        data-last={isLast ? '' : undefined}
        value={item.value}
        borderBottom="1px solid"
        borderColor="primary.45"
        py={{ base: "14px", xl: "18px" }}
    >
        <ChakraAccordion.Context>
            {(accordion) => {
                const isOpen = accordion.value.includes(item.value);
                return (
                    <>
                        <ChakraAccordion.ItemTrigger
                            textStyle="h3"
                            cursor="pointer"
                            display="flex"
                            gap="4"
                            alignItems="center"
                            px="0"
                        >
                            <Box
                                p={{ base: "10px", xl: "14px" }}
                                bg="bg.global"
                                borderRadius="10px"
                                border="1px solid"
                                borderColor="bg.partical"
                                minW={{ base: "52px", xl: "60px" }}
                                textAlign="center"
                            >
                                <Text textStyle="h3">
                                    {String(index + 1).padStart(2, '0')}
                                </Text>
                            </Box>

                            <Span flex="1" textAlign="left">{item.title}</Span>

                            <Box color="white">
                                {isOpen ? <MinusIcon /> : <PlusIcon />}
                            </Box>
                        </ChakraAccordion.ItemTrigger>

                        <ChakraAccordion.ItemContent>
                            <ChakraAccordion.ItemBody
                                textStyle="body"
                                pt="4"
                                color="text.secondary"
                                // Выравнивание текста под заголовком на десктопе
                                pl={{ base: "0", lg: "76px" }}
                            >
                                {item.text}
                            </ChakraAccordion.ItemBody>
                        </ChakraAccordion.ItemContent>
                    </>
                );
            }}
        </ChakraAccordion.Context>
    </ChakraAccordion.Item>
);

/**
 * Основной компонент аккордеона с разделением на две независимые колонки
 */
export const Accordion = ({ items }: AccordionProps) => {
    // Делим массив пополам для независимой работы колонок
    const half = Math.ceil(items.length / 2);
    const leftCol = items.slice(0, half);
    const rightCol = items.slice(half);

    return (
        <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            columnGap={{ base: "0", lg: "40px", xl: "80px" }}
            alignItems="start"
        >
            {/* Левая независимая колонка */}
            <ChakraAccordion.Root multiple variant="plain" css={{
                "& > :last-of-type": {
                    borderBottomWidth: { lg: "0" }
                }
            }}>
                {leftCol.map((item, index) => (
                    <AccordionItem key={item.value} item={item} index={index} />
                ))}
            </ChakraAccordion.Root>

            {/* Правая независимая колонка */}
            <ChakraAccordion.Root multiple variant="plain" css={{
                "& > [data-last]": {
                    borderBottomWidth: { base: "0", lg: "0" }
                }
            }}>
                {rightCol.map((item, index) => (
                    <AccordionItem key={item.value} item={item} index={index + half} isLast={index === rightCol.length - 1} />
                ))}
            </ChakraAccordion.Root>
        </SimpleGrid>
    )
};