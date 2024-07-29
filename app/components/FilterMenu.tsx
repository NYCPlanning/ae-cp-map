import { ReactNode } from "react";
import { Button, Flex, Heading, Show, Hide } from "@nycplanning/streetscape";
import { ChevronDownIcon } from "@chakra-ui/icons";

export const FilterMenu = ({
  onClose = () => {
    return;
  },
  children,
}: FilterMenuProps) => {
  return (
    <Flex
      borderRadius={"base"}
      padding={{ base: 3, lg: 4 }}
      marginBottom={{ base: 3, lg: "unset" }}
      background={"white"}
      direction={"column"}
      width={{ base: "full", lg: "21.25rem" }}
      maxW={{ base: "21.25rem", lg: "unset" }}
      boxShadow={"0px 8px 4px 0px rgba(0, 0, 0, 0.08)"}
    >
      <Hide above="lg">
        <ChevronDownIcon
          onClick={() => {
            onClose();
          }}
          role={"button"}
          width={"full"}
          height={8}
          color={"gray.300"}
          aria-label="Close geography filter menu"
        />
      </Hide>
      <Flex gap={4} direction={"column"}>
        <Show above="lg">
          <Heading
            fontSize={"lg"}
            textAlign={"left"}
            fontWeight={"medium"}
            width={"full"}
            borderBottomStyle={"dotted"}
            borderBottomWidth={"1px"}
            borderBottomColor={"gray.400"}
          >
            Filter by District
          </Heading>
        </Show>
        {children}
        <Button width="full" isDisabled={true}>
          Go to Selected District
        </Button>
      </Flex>
    </Flex>
  );
};

export interface FilterMenuProps {
  onClose?: () => void;
  children: ReactNode;
}
