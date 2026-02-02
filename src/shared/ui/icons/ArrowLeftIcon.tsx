import { Icon, type IconProps } from "@chakra-ui/react";

export const ArrowLeftIcon = (props: IconProps) => {
    return (
        <Icon asChild width="6" height="6" color="icon" {...props}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none">
                <path d="M18.5 8.875L1 8.875M1 8.875L8.875 16.75M1 8.875L8.875 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </Icon>
    );
};
