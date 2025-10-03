import { IconButton, VStack, Tooltip, Icon } from "@chakra-ui/react";
import { CompassSVG, ZoomInSVG, ZoomOutSVG } from "~/icons/";
import { LinearInterpolator } from "@deck.gl/core";
import type { MapViewState } from "@deck.gl/core";

type zoomProps = {
  viewState: MapViewState;
  setViewState: (next: MapViewState) => void;
  step?: number;
  minZoom?: number;
  maxZoom?: number;
};

export function ZoomPanel({
  viewState,
  setViewState,
  step = 1,
  minZoom = 10,
  maxZoom = 20,
}: zoomProps) {
  const clamp = (value: number) => Math.min(maxZoom, Math.max(minZoom, value));

  const animate = (partial: Partial<MapViewState>) =>
    setViewState({
      ...viewState,
      ...partial,
      transitionDuration: 250,
      transitionInterpolator: new LinearInterpolator(["zoom", "bearing"]),
    });

  const zoomBy = (delta: number) =>
    animate({ zoom: clamp(viewState.zoom + delta) });
  const resetMap = () => animate({ bearing: 0 });

  return (
    <VStack spacing={2} className={"zoomPanelContent"} rowGap={"0"}>
      <Tooltip label="Zoom in">
        <IconButton
          aria-label="Zoom in"
          icon={<Icon as={ZoomInSVG} boxSize={4} color={"gray.600"} />}
          backgroundColor={"white"}
          size="xs"
          borderRadius={"0"}
          _hover={{
            backgroundColor: "white",
            border: "none",
          }}
          _focus={{
            backgroundColor: "white",
            border: "none",
          }}
          onClick={() => zoomBy(+step)}
        />
      </Tooltip>
      <Tooltip label="Zoom out">
        <IconButton
          aria-label="Zoom out"
          icon={<Icon as={ZoomOutSVG} boxSize={4} color={"gray.600"} />}
          backgroundColor={"white"}
          size="xs"
          borderRadius={"0"}
          borderTopWidth={"1px"}
          borderTopColor={"gray.200"}
          _hover={{
            backgroundColor: "white",
            border: "none",
          }}
          _focus={{
            backgroundColor: "white",
            border: "none",
          }}
          onClick={() => zoomBy(-step)}
        />
      </Tooltip>
      <Tooltip label="Reset compass">
        <IconButton
          aria-label="Reset compass"
          icon={<Icon as={CompassSVG} boxSize={4} color="gray.600" />}
          backgroundColor={"white"}
          size="xs"
          borderRadius={"0"}
          borderTopWidth={"1px"}
          borderTopColor={"gray.200"}
          _hover={{
            backgroundColor: "white",
            border: "none",
          }}
          _focus={{
            backgroundColor: "white",
            border: "none",
          }}
          onClick={resetMap}
        />
      </Tooltip>
    </VStack>
  );
}
