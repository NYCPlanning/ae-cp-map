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
    <VStack spacing={2} className={"zoomPanelContent"} rowGap={"0"}>
      {/* <IconButton
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
        /> */}
      {/* <Tooltip label="Zoom out">
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
      </Tooltip> */}
      {/* <Tooltip label="Reset compass">
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
      </Tooltip> */}
      {/* Above is first attempt using ChakraUI */}
      <ButtonGroup
        isAttached={true}
        orientation="vertical"
        className="buttonGroup"
      >
        <Tooltip label="Zoom in">
          <IconButton
            variant={"secondary"}
            className="zoomIn"
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
            className="zoomOut"
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
            className="resetCompass"
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
      {/* <ButtonGroup
        isAttached={true}
        orientation="vertical"
        className="buttonGroup"
      >
        <Tooltip label="Zoom in">
          <AddIcon
            aria-label="zoom map"
            boxSize={4}
            color={"gray.600"}
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
          <MinusIcon
            aria-label="zoom out map"
            boxSize={4}
            color={"gray.600"}
            borderRadius={0}
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
          <CompassIcon
            aria-label="Reset compass"
            boxSize={4}
            color="gray.600"
            borderRadius={0}
            borderBottomLeftRadius={4}
            borderBottomRightRadius={4}
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
      </ButtonGroup> */}
    </VStack>
  );
}
