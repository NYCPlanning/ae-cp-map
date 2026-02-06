import { PlacementWithLogical } from "@chakra-ui/react";
import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  InfoIcon,
  Switch,
  Tooltip,
  useBreakpointValue,
} from "@nycplanning/streetscape";
import { env } from "~/utils/env";

export function MapLayerToggle({
  id,
  label,
  isChecked,
  onChange,
  tooltipLabel,
  legendIcon,
  iconColor,
}: {
  id: string;
  label: string;
  isChecked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tooltipLabel: string;
  legendIcon: string;
  iconColor: string;
}) {
  const tooltipPlacement =
    useBreakpointValue<PlacementWithLogical>({
      base: "bottom-start",
      md: "right",
    }) ?? "bottom";

  return (
    <FormControl
      display="flex"
      alignItems="flex-start"
      justifyContent="space-between"
      gap={3}
      paddingTop={2}
    >
      <HStack alignItems={"flex-start"}>
        <Switch id={id} isChecked={isChecked} onChange={onChange} />
        <FormLabel htmlFor={id} padding={"0"}>
          <Heading
            as="h2"
            fontWeight="medium"
            fontSize={{ base: "md", "2xl": "sm" }}
            color="gray.600"
          >
            {label}
          </Heading>
        </FormLabel>
      </HStack>

      <HStack spacing={3} alignItems="flex-start">
        <Tooltip
          hasArrow
          label={tooltipLabel}
          maxWidth={"15rem"}
          placement={tooltipPlacement}
        >
          <IconButton
            aria-label={`information about the ${label}`}
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
        {env.facDbPhase1 === "ON" ? (
          <Box
            height={"1.25rem"}
            width={"1.25rem"}
            backgroundImage={`/layers/${legendIcon}.svg`}
            backgroundSize={"100% 100%"}
          ></Box>
        ) : (
          <Box
            height={"1.25rem"}
            width={"1.25rem"}
            background={iconColor}
            borderRadius={"5px"}
          ></Box>
        )}
      </HStack>
    </FormControl>
  );
}
