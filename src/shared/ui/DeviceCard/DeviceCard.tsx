import { Box, Heading, HStack, Text } from "@chakra-ui/react";

export interface DeviceCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}


export const DeviceCard = ({ title, description, icon }: DeviceCardProps) => {
    return (
        <Box p={{ base: "20px", lg: "40px", xl: "50px" }} rounded={{ base: "10px", xl: "12px" }} bg="linear-gradient(45deg, rgb(0, 0, 0) 65%, rgb(90, 2, 2) 100%)">
            <HStack>
                <Box p={{ base: "10px", lg: "12px", xl: "16px" }} bg="bg.global" rounded="10px" border="2px solid" borderColor="bg.partical">
                    {icon}
                </Box>
                <Heading textStyle="h3">{title}</Heading>
            </HStack>
            <Text textStyle="body" mt={{ base: "20px", lg: "24px", xl: "30px" }}>{description}</Text>
        </Box>
    );
};