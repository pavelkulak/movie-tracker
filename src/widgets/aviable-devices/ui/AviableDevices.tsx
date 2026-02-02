import { Box, Heading, Text, VStack, SimpleGrid } from "@chakra-ui/react";
import { locales } from '../locales'
import { useTranslate } from "@/shared/i18n";
import { DeviceCard } from "@/shared/ui/";
import { DEVICE_ITEMS } from "../constants";

export const AviableDevices = () => {
    const t = useTranslate(locales)
    return (
        <Box>
            <VStack justify="flex-start" alignItems="flex-start" mb={{ base: "40px", lg: "60px", xl: "80px" }}>
                <Heading textStyle="h2">{t("heading")}</Heading>
                <Text textStyle="body">{t("subtitle")}</Text>
            </VStack>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: "20px", lg: "30px" }} >
                {DEVICE_ITEMS.map((device) => (
                    <DeviceCard key={device.key} icon={device.icon} title={t(`devices.${device.key}.name`)} description={t(`devices.${device.key}.description`)} />
                ))}
            </SimpleGrid>
        </Box>
    );
};