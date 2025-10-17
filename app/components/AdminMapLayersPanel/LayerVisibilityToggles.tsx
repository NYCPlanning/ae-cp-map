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
  children: React.ReactNode;
  onCapitalProjectsToggle: (next: boolean) => void;
};

export function LayerVisibilityToggles({
  capitalProjectsOn,
  onCapitalProjectsToggle,
  children,
}: LayerVisibilityTogglesProps) {
  const capitalProjectsTooltipCopy = `New York City’s potential, planned, and ongoing capital projects.
  Unmapped projects, such as the purchase of vehicles or digital infrastructure, are not included in this tool.
  `;

  const placement =
    useBreakpointValue<PlacementWithLogical>({
      base: "bottom-start",
      md: "right",
    }) ?? "bottom";

  return (
    <Box>
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
            <Heading as="h2" fontWeight="medium" fontSize="md" color="gray.600">
              Capital Projects
            </Heading>
          </FormLabel>
        </HStack>

        <HStack spacing={3} alignItems="flex-start">
          <Tooltip
            hasArrow
            label={capitalProjectsTooltipCopy}
            maxWidth={"15rem"}
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
      {children}
    </Box>
  );
}
