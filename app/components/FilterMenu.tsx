import { ReactNode } from "react";
import { Button, Flex, Heading, Show, Hide } from "@nycplanning/streetscape";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate, useSearchParams } from "@remix-run/react";

// const [searchParams] = useSearchParams();
// console.log("serachParams", searchParams)
// const navigate = useNavigate();

// const districtType = searchParams.get("districtType");
// const districtId = searchParams.get("districtId");

const goToDistrict = (districtType: string | undefined, options: string | undefined) => {
  if (districtType === 'ccd') {
    return `city-council-district/${options}/capital-projects`;
  }
  else {
    return '/';
  }
}

export const FilterMenu = ({
  onClose = () => {
    return;
  },
  children,
  toNav
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
        {children}
        <Button width="full" 
        onClick={
          toNav
        }
        isDisabled={false}>
          Go to Selected District
        </Button>
      </Flex>
    </Flex>
  );
};

export interface FilterMenuProps {
  onClose?: () => void;
  children: ReactNode;
  toNav?: () => void;
}
