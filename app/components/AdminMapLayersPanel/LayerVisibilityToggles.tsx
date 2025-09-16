import { InfoIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  PlacementWithLogical,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Switch,
  Tooltip,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useRef } from "react";

export type LayerVisibilityTogglesProps = {
  capitalProjectsOn: boolean;
  onCapitalProjectsToggle: (next: boolean) => void;
};

export function LayerVisibilityToggles({
  capitalProjectsOn,
  onCapitalProjectsToggle,
}: LayerVisibilityTogglesProps) {
  const portalRef = useRef<HTMLDivElement>(null);
  const placement =
    useBreakpointValue<PlacementWithLogical>({
      base: "bottom",
      md: "right",
    }) ?? "bottom";
  const popperOffset = useBreakpointValue<[number, number]>({
    base: [0, 8],
    md: [-6, 12],
  }) ?? [0, 8];

  return (
    <>
      <Box mb={4} className={"switchWrapper"}>
        <FormControl
          display="flex"
          // alignItems="center"
          justifyContent="space-between"
          gap={3}
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

          <HStack spacing={3}>
            <Popover
              closeOnBlur
              closeOnEsc
              placement={placement}
              trigger={"hover"}
              modifiers={[
                {
                  name: "preventOverflow",
                  options: {
                    rootBoundary: "viewport",
                    padding: 12,
                    altAxis: true,
                    tether: true,
                  },
                },
                {
                  name: "flip",
                  options: {
                    rootBoundary: "viewport",
                    fallbackPlacements: ["top", "bottom", "right", "left"],
                  },
                },
              ]}
              // strategy="fixed"
            >
              <PopoverTrigger>
                <IconButton
                  aria-label="information about the capital planning portal"
                  icon={<InfoIcon boxSize={5} verticalAlign={"bottom"} />}
                  size="sm"
                  w="2.25rem"
                  h="2.25rem"
                  isRound
                  borderColor={"white"}
                  borderStyle="solid"
                  borderWidth="5px"
                  color={"gray.600"}
                  minHeight="auto"
                  minWidth="auto"
                  backgroundColor={"white"}
                  _hover={{
                    bg: "blackAlpha.100",
                  }}
                  _focus={{ borderColor: "white" }}
                  onClick={() => console.log("hello")}
                />
              </PopoverTrigger>
              <Portal containerRef={portalRef}>
                <PopoverContent
                  background={"gray.800"}
                  color={"white"}
                  width={"15rem"}
                  zIndex={"10"}
                  fontSize={"small"}
                >
                  <PopoverArrow background="yellow" />

                  <PopoverBody padding={"5px"}>
                    New York City’s potential, planned, and ongoing capital
                    projects. Unmapped projects, such as the purchase of or
                    digital infrastructure, are not included in this tool.
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
            <Box
              height={"1.25rem"}
              width={"1.25rem"}
              background={"brand.800"}
              borderRadius={"5px"}
            ></Box>
          </HStack>
        </FormControl>
        <Box ref={portalRef} id="layers-panel-popovers-root" />
      </Box>

      {/* Skeleton for CBBR switch */}
      {/* <Box>
        <FormControl
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={3}
        >
          <HStack>
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

          <HStack spacing={3}>
            <IconButton
              aria-label="information about the capital planning portal"
              icon={<InfoIcon boxSize={5} verticalAlign={"bottom"} />}
              size="sm"
              w="2.25rem"
              h="2.25rem"
              isRound
              borderColor={"white"}
              borderStyle="solid"
              borderWidth="5px"
              borderRadius={"100%"}
              color={"gray.600"}
              minHeight="auto"
              minWidth="auto"
              backgroundColor={"white"}
              _hover={{
                bg: "blackAlpha.100",
              }}
              _focus={{ borderColor: "white" }}
              onClick={() => console.log("hello")}
            />
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
