import { Icon, type IconProps } from "@chakra-ui/react";

export const MinusIcon = (props: IconProps) => {
    return (
        <Icon asChild width="6" height="6" color="icon" {...props}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="3" viewBox="0 0 20 3" fill="none">
                <path d="M18.75 0H1.25C0.918479 0 0.600537 0.131696 0.366117 0.366117C0.131696 0.600537 0 0.918479 0 1.25C0 1.58152 0.131696 1.89946 0.366117 2.13388C0.600537 2.3683 0.918479 2.5 1.25 2.5H18.75C19.0815 2.5 19.3995 2.3683 19.6339 2.13388C19.8683 1.89946 20 1.58152 20 1.25C20 0.918479 19.8683 0.600537 19.6339 0.366117C19.3995 0.131696 19.0815 0 18.75 0Z" fill="white" />
            </svg>
        </Icon>
    );
};
