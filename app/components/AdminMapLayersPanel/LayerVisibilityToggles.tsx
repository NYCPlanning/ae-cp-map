import { InfoIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  PlacementWithLogical,
  Switch,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Tooltip } from "@nycplanning/streetscape";

export type LayerVisibilityTogglesProps = {
  capitalProjectsOn: boolean;
  onCapitalProjectsToggle: (next: boolean) => void;
};

export function LayerVisibilityToggles({
  capitalProjectsOn,
  onCapitalProjectsToggle,
}: LayerVisibilityTogglesProps) {
  const capitalProjectsTooltipCopy = `New York City’s potential, planned, and ongoing capital projects.
  Unmapped projects, such as the purchase of vehicles or digital infrastructure, are not included in this tool.
  `;

  const capitalProjectsBudgetTooltipCopy = `Every year, boards submit prioritized  capital budget requests that address local needs.
    Expense requests are not included in this tool. All capital budget requests, mapped and unmapped, are included.
   `;

  const placement =
    useBreakpointValue<PlacementWithLogical>({
      base: "bottom-start",
      // base: "bottom",
      md: "right",
    }) ?? "bottom";

  return (
    <>
      <Box className={"switchWrapper"}>
        <FormControl
          display="flex"
          alignItems="flex-start"
          justifyContent="space-between"
          gap={3}
          paddingTop={2}
        >
          <HStack spacing={3}>
            <Switch
              id="capital-projects-toggle"
              isChecked={capitalProjectsOn}
              onChange={(e) => onCapitalProjectsToggle(e.target.checked)}
            />
            <FormLabel htmlFor="capital-projects-toggle" padding={"0"}>
              <Heading
                as="h2"
                fontWeight="medium"
                fontSize="md"
                color="gray.600"
              >
                Capital Projects
              </Heading>
            </FormLabel>
          </HStack>

          <HStack spacing={3} alignItems="flex-start">
            <Tooltip
              hasArrow
              label={capitalProjectsTooltipCopy}
              maxWidth={"15rem"}
              // onClose={function Ya() {}}
              // onOpen={function Ya() {}}
              placement={placement}
            >
              <IconButton
                aria-label="information about the capital planning portal"
                icon={<InfoIcon boxSize={5} verticalAlign={"top"} />}
                size="sm"
                isRound
                borderColor={"white"}
                borderStyle="solid"
                border={"none"}
                color={"gray.600"}
                minHeight="auto"
                minWidth="auto"
                backgroundColor={"white"}
                verticalAlign={"top"}
                _hover={{
                  bg: "blackAlpha.100",
                }}
                _focus={{ borderColor: "white" }}
                onClick={() => console.log("hello")}
              />
            </Tooltip>
            <Box
              height={"1.25rem"}
              width={"1.25rem"}
              background={"brand.800"}
              borderRadius={"5px"}
            ></Box>
          </HStack>
        </FormControl>
      </Box>

      {/* Wireframe for CBBR switch */}
      {/* <Box>
        <FormControl
          display="flex"
          alignItems="flex-start"
          justifyContent="space-between"
          gap={3}
        >
          <HStack alignItems={"flex-start"}>
            <Switch id="cb-capital-budget-requests" />
            <FormLabel
              htmlFor="cb-capital-budget-requests"
              mb="0"
              width={{ base: "40dvw", md: "12dvw" }}
            >
              <Heading
                as="h2"
                fontWeight="medium"
                fontSize="md"
                color="gray.600"
              >
                Community Board Capital Budget Requests
              </Heading>
            </FormLabel>
          </HStack>

          <HStack
            spacing={3}
            alignItems={"flex-start"}
            className={"budgetsSwitchWrapper"}
          >
            <Tooltip
              hasArrow
              label={capitalProjectsBudgetTooltipCopy}
              maxWidth={"15rem"}
              // onClose={function Ya() {}}
              // onOpen={function Ya() {}}
              placement={placement}
            >
              <IconButton
                aria-label="information about the capital planning budget requests"
                icon={<InfoIcon boxSize={5} verticalAlign={"top"} />}
                size="sm"
                isRound
                borderColor={"white"}
                borderStyle="solid"
                border={"none"}
                color={"gray.600"}
                minHeight="auto"
                minWidth="auto"
                backgroundColor={"white"}
                verticalAlign={"top"}
                _hover={{
                  bg: "blackAlpha.100",
                }}
                _focus={{ borderColor: "white" }}
                onClick={() => console.log("hello")}
              />
            </Tooltip>
            <Box
              height={"1.25rem"}
              width={"1.25rem"}
              background={"#2B6CB0;"}
              borderRadius={"5px"}
            ></Box>
          </HStack>
        </FormControl>
      </Box> */}
    </>
  );
}
