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
import { Borough, CityCouncilDistrict, CommunityDistrict } from "~/gen";

export const FilterMenu = ({
  districtType = null,
  updateDistrictType,
  boroId,
  updateBoroId,
  districtId,
  updateDistrictId,
  boroughs,
  districts,
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
            value={districtType ?? ""}
          >
            <option value={"cd"}>Community District</option>
            <option value={"ccd"}>City Council District</option>
          </Select>
        </FormControl>
        <HStack spacing={2} width={"full"}>
          {districtType !== "ccd" && (
            <FormControl id="boroId">
              <FormLabel>Borough</FormLabel>
              <Select
                isDisabled={districtType === null}
                placeholder="-Select-"
                variant="base"
                value={boroId ?? ""}
                onChange={(e: FormEvent<HTMLSelectElement>) => {
                  const targetValue = e.currentTarget.value;
                  let nextBoroId: BoroId = null;
                  if (targetValue !== "") nextBoroId = targetValue;
                  updateBoroId(nextBoroId);
                }}
              >
                {boroughs?.map((borough) => (
                  <option key={borough.id} value={borough.id}>
                    {borough.title}
                  </option>
                ))}
              </Select>
            </FormControl>
          )}
          <FormControl id="districtId">
            <FormLabel>District Number</FormLabel>
            <Select
              placeholder="-Select-"
              variant="base"
              isDisabled={
                districtType === null ||
                (districtType === "cd" && boroId === null)
              }
              value={districtId ?? ""}
              onChange={(e: FormEvent<HTMLSelectElement>) => {
                const targetValue = e.currentTarget.value;
                let nextDistrictId: DistrictId = null;
                if (targetValue !== "") nextDistrictId = targetValue;
                updateDistrictId(nextDistrictId);
              }}
            >
              {districts.map((cd) => (
                <option key={cd.id} value={cd.id}>
                  {cd.id}
                </option>
              ))}
            </Select>
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
export type BoroId = null | string;
export type DistrictId = null | string;

export interface FilterMenuProps {
  districtType: DistrictType;
  updateDistrictType: (districtType: DistrictType) => void;
  boroId: BoroId;
  updateBoroId: (boroId: BoroId) => void;
  districtId: DistrictId;
  updateDistrictId: (districtId: DistrictId) => void;
  boroughs: Array<Borough>;
  districts: Array<CommunityDistrict | CityCouncilDistrict>;
  onClose?: () => void;
}
