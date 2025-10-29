import { VStack } from "@chakra-ui/react";
import {
  Tooltip,
  ButtonGroup,
  Icon,
  IconButton,
  CompassIcon,
  AddIcon,
  MinusIcon,
} from "@nycplanning/streetscape";
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
      transitionDuration: 500,
      transitionInterpolator: new LinearInterpolator(["zoom", "bearing"]),
    });

  const zoomBy = (delta: number) =>
    animate({ zoom: clamp(viewState.zoom + delta) });
  const resetMap = () => animate({ bearing: 0 });

  return (
    <VStack spacing={2} rowGap={"0"}>
      <ButtonGroup isAttached={true} orientation="vertical">
        <Tooltip label="Zoom in">
          <IconButton
            variant={"secondary"}
            border={"none"}
            aria-label="zoom map"
            size={"sm"}
            icon={<Icon as={AddIcon} boxSize={4} color={"gray.600"} />}
            borderRadius={0}
            borderTopLeftRadius={4}
            borderTopRightRadius={4}
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
            variant={"secondary"}
            border={"1px 0 0 0"}
            aria-label="zoom out map"
            size={"sm"}
            icon={<Icon as={MinusIcon} boxSize={4} color={"gray.600"} />}
            borderRadius={0}
            borderWidth={"1px 0 0 0 "}
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
            variant={"secondary"}
            aria-label="Reset compass"
            size={"sm"}
            icon={<Icon as={CompassIcon} boxSize={4} color="gray.600" />}
            borderRadius={0}
            borderBottomLeftRadius={4}
            borderBottomRightRadius={4}
            borderWidth={"1px 0 0 0"}
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
      </ButtonGroup>
    </VStack>
  );
}
