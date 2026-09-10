import { Box, HStack, Stack, Text } from "@nycplanning/streetscape";
import { HousingLayerQueryParams, SupportingLayerSliceProps } from "~/utils/types";

export function SupportingLayersLegend({
  housingData,
  slices,
  display,
}: {
  housingData: HousingLayerQueryParams["housingData"];
  slices: Array<SupportingLayerSliceProps>;
  display: "flex" | "none";
}) {
  return (
    <Stack width={"100%"} paddingLeft={6} display={display}>
      {slices.map((slice) => (
        <HStack gap={2} key={slice.rangeLabel}>
          {
            housingData === "boro" ?
              (<>
                <Text fontSize={"xs"}><b>{`${slice.rangeLabel.slice(0, slice.rangeLabel.indexOf(":"))}`}</b>{`${slice.rangeLabel.slice(slice.rangeLabel.indexOf(":"))}`}</Text>
              </>

              ) :
              (<>
                <Box
                  w={5}
                  h={5}
                  p={0.5}
                  borderRadius={"4px"}
                  backgroundColor={slice.colorHex}
                />
                <Text fontSize={"xs"}>{slice.rangeLabel}</Text>
              </>)
          }
          {/* <Box
            w={5}
            h={5}
            p={0.5}
            borderRadius={"4px"}
            backgroundColor={slice.colorHex}
          />
          <Text fontSize={"xs"}>{slice.rangeLabel}</Text> */}
        </HStack>
      ))}
    </Stack>
  );
}
