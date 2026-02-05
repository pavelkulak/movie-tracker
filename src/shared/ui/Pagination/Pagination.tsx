// shared/ui/Pagination.tsx
import { HStack, IconButton, Box, Text } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@/shared/ui/icons";

interface PaginationProps {
    page: number;
    onPrev: () => void;
    onNext: () => void;
}

export const Pagination = ({ page, onPrev, onNext }: PaginationProps) => (
    <HStack justify="center" pt={8}>
        {page > 1 && (
            <IconButton size="xs" variant="ghost" onClick={onPrev}>
                <Box bg="bg.primary" rounded="6px" p="10px"><ArrowLeftIcon /></Box>
            </IconButton>
        )}
        <Box bg="bg.primary" rounded="6px" p="10px">
            <Text textStyle="primary">{page}</Text>
        </Box>
        <IconButton size="xs" variant="ghost" onClick={onNext}>
            <Box bg="bg.primary" rounded="6px" p="10px"><ArrowRightIcon /></Box>
        </IconButton>
    </HStack>
);