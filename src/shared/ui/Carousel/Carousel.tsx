import { Box, Carousel as ChakraCarousel, Heading, IconButton, Text } from "@chakra-ui/react"
import { useBreakpointValue } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@/shared/ui/icons";

export interface CarouselProps<T> {
    data: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    isLoading?: boolean;
    skeletonCount?: number;
    renderSkeleton?: (index: number) => React.ReactNode;
    heading?: string
    subtitle?: string
}




export const Carousel = <T,>({
    data,
    renderItem,
    heading,
    subtitle,
    isLoading = false,
    skeletonCount = 5,
    renderSkeleton
}: CarouselProps<T>) => {
    const slides = useBreakpointValue({
        base: 1.7,
        sm: 2,
        md: 4,
        lg: 5
    }) || 1;
    const isMobile = useBreakpointValue({
        base: true,
        md: false
    }) || false;

    const items = isLoading
        ? Array.from({ length: skeletonCount })
        : (Array.isArray(data) ? data : []);

    const hasData = items.length > 0;

    return (
        <ChakraCarousel.Root slideCount={hasData ? items.length : 1} allowMouseDrag slidesPerPage={slides} w="full">
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box mb={{ base: "40px", md: "60px" }}>
                    <Heading textStyle="h2">{heading}</Heading>
                    <Text textStyle="body" color="text.secondary">{subtitle}</Text>
                </Box>
                {!isMobile &&
                    <Box ml="auto" bg="primary" w="fit-content" border="1px solid" borderColor="bg.partical" rounded={{ lg: "10px", xl: "12px" }} p={{ lg: "16px", xl: "12px" }}>
                        <ChakraCarousel.Control justifyContent="center" gap="4">
                            <ChakraCarousel.PrevTrigger asChild>
                                <IconButton size="xs" variant="ghost" h="auto">
                                    <Box bg="bg.global" rounded={{ lg: "6px", xl: "8px" }} p={{ lg: "10px", xl: "14px" }}>
                                        <ArrowLeftIcon />
                                    </Box>
                                </IconButton>
                            </ChakraCarousel.PrevTrigger>
                            <ChakraCarousel.IndicatorGroup gap="0" w="full" display="flex">

                                <ChakraCarousel.Indicators _current={{ bg: "red.600" }} h="6px" w="24px" />

                            </ChakraCarousel.IndicatorGroup>
                            <ChakraCarousel.NextTrigger asChild>
                                <IconButton size="xs" variant="ghost" h="auto">
                                    <Box bg="bg.global" rounded={{ lg: "6px", xl: "8px" }} p={{ lg: "10px", xl: "14px" }}>
                                        <ArrowRightIcon />
                                    </Box>
                                </IconButton>
                            </ChakraCarousel.NextTrigger>
                        </ChakraCarousel.Control >
                    </Box>}
            </Box>
            <ChakraCarousel.ItemGroup>
                {items.map((item, index) => (
                    <ChakraCarousel.Item key={index} index={index}>
                        {isLoading && renderSkeleton
                            ? renderSkeleton(index)
                            : renderItem(item as T, index)
                        }
                    </ChakraCarousel.Item>
                ))}
            </ChakraCarousel.ItemGroup>
            {
                isMobile && hasData && (<Box bg="bg.global" rounded="full" mr={{ base: 4 }}>
                    <ChakraCarousel.IndicatorGroup gap="0" w="full" display="flex">
                        {Array.from({ length: items.length }, (_, index) => (
                            <ChakraCarousel.Indicator
                                key={index}
                                index={index}
                                rounded="full"
                                _current={{ bg: "primary.45" }}
                                bg="bg.global"
                                h="6px"
                                flex="1"
                            />
                        ))}
                    </ChakraCarousel.IndicatorGroup>
                </Box>)
            }
        </ChakraCarousel.Root >
    )
}

