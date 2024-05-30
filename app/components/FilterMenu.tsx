import { useState, FormEvent } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Show,
  Hide,
  Select,
  HStack,
} from "@nycplanning/streetscape";
import { ChevronDownIcon } from "@chakra-ui/icons";

export type GeographyType = "cd" | "ccd" | null;

export const FilterMenu = ({ onClose }: FilterMenuProps) => {
  const [geographyType, setGeorgaphyType] = useState<GeographyType>("cd");
  return (
    <Flex
      borderRadius={"base"}
      padding={{ base: 3, lg: 4 }}
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
            Filter by Geography
          </Heading>
        </Show>
        <FormControl id="geographyType">
          <FormLabel>Geography Type</FormLabel>
          <Select
            placeholder="-Select-"
            variant="base"
            onChange={(e: FormEvent<HTMLSelectElement>) => {
              setGeorgaphyType(e.currentTarget.value as GeographyType);
            }}
            value={geographyType}
          >
            <option value={"cd"}>Community District</option>
            <option value={"ccd"}>City Council District</option>
          </Select>
        </FormControl>
        <HStack spacing={2} width={"full"}>
          {geographyType !== "ccd" ? (
            <FormControl id="borough">
              <FormLabel>Borough</FormLabel>
              <Select
                isDisabled={true}
                placeholder="-Select-"
                variant="base"
              ></Select>
            </FormControl>
          ) : null}
          <FormControl id="district">
            <FormLabel>District</FormLabel>
            <Select
              placeholder="-Select-"
              variant="base"
              isDisabled={true}
            ></Select>
          </FormControl>
        </HStack>
        <Button width="full" isDisabled={true}>
          Go to Selected Geography
        </Button>
      </Flex>
    </Flex>
  );
};

export interface FilterMenuProps {
  onClose: () => void;
}