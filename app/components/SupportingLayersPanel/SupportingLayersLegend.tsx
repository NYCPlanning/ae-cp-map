import { Box, HStack, Stack, Text } from "@nycplanning/streetscape";
import { SupportingLayerSliceProps } from "~/utils/types";

export function SupportingLayersLegend({
  slices,
  display,
}: {
  slices: Array<SupportingLayerSliceProps>;
  display: "flex" | "none";
}) {
  return (
    <Stack width={"100%"} paddingLeft={6} display={display}>
      {slices.map((slice) => (
        // <HStack gap={2} key={slice.rangeLabel}>
        <HStack gap={2}>
          <Box
            w={5}
            h={5}
            p={0.5}
            borderRadius={"4px"}
            backgroundColor={slice.colorHex}
          />
          <Text fontSize={"xs"}>{slice.rangeLabel}</Text>
        </HStack>
      ))}
    </Stack>
  );
}
