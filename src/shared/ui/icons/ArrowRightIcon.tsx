import { Icon, type IconProps } from "@chakra-ui/react";

export const ArrowRightIcon = (props: IconProps) => {
  return (
    <Icon asChild width="6" height="6" color="icon" {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="13"
        viewBox="0 0 14 13"
        fill="none"
      >
        <path
          d="M0.5 6.125L13 6.125M13 6.125L7.375 0.5M13 6.125L7.375 11.75"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Icon>
  );
};
