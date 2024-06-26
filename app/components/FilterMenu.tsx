import { FormEvent } from "react";
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
import { Borough, CommunityDistrict } from "~/gen";

export const FilterMenu = ({
  districtType = null,
  boro,
  updateBoro,
  district,
  updateDistrictType,
  boroughs,
  communityDistricts,
  onClose = () => {
    return;
  },
}: FilterMenuProps) => {
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
              const targetValue = e.currentTarget.value;
              let nextDistrictType: DistrictType = null;
              if (targetValue === "cd" || targetValue === "ccd")
                nextDistrictType = targetValue;
              updateDistrictType(nextDistrictType);
            }}
            value={districtType}
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
                isDisabled={!boroughs}
                placeholder="-Select-"
                variant="base"
                value={boro}
                onChange={(e: FormEvent<HTMLSelectElement>) => {
                  const targetValue = e.currentTarget.value;
                  let nextBoro: Boro = null;
                  if (targetValue !== "") nextBoro = targetValue;
                  updateBoro(nextBoro);
                }}
              >
                {boroughs?.map((borough) => (
                  <option key={borough.id} value={borough.id}>
                    {borough.title}
                  </option>
                ))}
              </Select>
            </FormControl>
          ) : null}
          <FormControl id="district">
            <FormLabel>District Number</FormLabel>
            <Select
              placeholder="-Select-"
              variant="base"
              isDisabled={!communityDistricts}
            >{communityDistricts?.map(cd => <option key={cd.id} value={cd.id}>{cd.id}</option>)}</Select>
          </FormControl>
        </HStack>
        <Button width="full" isDisabled={true}>
          Go to Selected District
        </Button>
      </Flex>
    </Flex>
  );
};

export type DistrictType = null | "cd" | "ccd";
export type Boro = null | string;
export type District = null | string;

export interface FilterMenuProps {
  districtType: DistrictType;
  boro: Boro;
  updateBoro: (boro: Boro) => void;
  district: District;
  updateDistrictType: (districtType: DistrictType) => void;
  boroughs: null | Array<Borough>;
  communityDistricts: null | Array<CommunityDistrict>;
  onClose?: () => void;
}
