import { FormEvent } from "react";
import { useSearchParams, useNavigate } from "@remix-run/react";
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

export const FilterMenu = ({
  onClose = () => {
    return;
  },
}: FilterMenuProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const districtType = searchParams.get("districtType");
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
            Filter by District
          </Heading>
        </Show>
        <FormControl id="districtType">
          <FormLabel
            onClick={() => {
              onClose();
            }}
          >
            District Type
          </FormLabel>
          <Select
            placeholder="-Select-"
            variant="base"
            onChange={(e: FormEvent<HTMLSelectElement>) => {
              if (e.currentTarget.value === "") {
                setSearchParams({}, { replace: true });
              } else {
                setSearchParams(
                  {
                    districtType: e.currentTarget.value,
                  },
                  { replace: true },
                );
              }
            }}
            value={districtType === null ? "" : districtType}
          >
            <option value={"cd"}>Community District</option>
            <option value={"ccd"}>City Council District</option>
          </Select>
        </FormControl>
        <HStack spacing={2} width={"full"}>
          {districtType !== "ccd" ? (
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
            <FormLabel>District Number</FormLabel>
            <Select
              placeholder="-Select-"
              variant="base"
              isDisabled={true}
            ></Select>
          </FormControl>
        </HStack>
        <Button width="full" isDisabled={true}>
          Go to Selected District
        </Button>
      </Flex>
    </Flex>
  );
};

export interface FilterMenuProps {
  onClose?: () => void;
}
