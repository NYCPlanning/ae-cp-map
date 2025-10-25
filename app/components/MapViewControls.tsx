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

type mapViewControlsProps = {
  viewState: MapViewState;
  setViewState: (next: MapViewState) => void;
  step?: number;
  minZoom?: number;
  maxZoom?: number;
};

export function MapViewControls({
  viewState,
  setViewState,
  step = 1,
  minZoom = 10,
  maxZoom = 20,
}: mapViewControlsProps) {
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
  const resetCompass = () => animate({ bearing: 0 });

  return (
    <VStack rowGap={"0"}>
      <ButtonGroup isAttached={true} orientation="vertical" spacing={0}>
        <IconButton
          className="zoomin"
          variant={"secondary"}
          icon={<Icon as={AddIcon} boxSize={3} color={"gray.600"} />}
          size={"xs"}
          minWidth={8}
          minHeight={8}
          border={"1px 1px 0 1px solid"}
          borderColor="gray.300"
          aria-label="zoom map"
          borderRadius={0}
          borderTopLeftRadius={4}
          borderTopRightRadius={4}
          boxShadow={"0 2px 4px 0 rgba(7, 3, 3, 0.12)"}
          _hover={{
            backgroundColor: "gray.100",
          }}
          _focus={{
            border: "1px 1px 0 1px solid",
            borderColor: "gray.300",
          }}
          _focusVisible={{
            boxShadow: "0 0 1px 2px rgba(88, 144, 255, 0.75 )",
            borderRadius: 0,
            zIndex: 1,
            position: "relative",
          }}
          _active={{
            backgroundColor: "gray.100",
            boxShadow: "initial",
          }}
          onClick={() => zoomBy(+step)}
        />
        <IconButton
          className="zoomout"
          variant={"secondary"}
          icon={<Icon as={MinusIcon} boxSize={3} color={"gray.600"} />}
          size={"xs"}
          minWidth={8}
          minHeight={8}
          border={"1px 1px 0 1px solid"}
          borderColor="gray.300"
          boxShadow={"1px 2px 4px 1px rgba(0, 0, 0, 0.12)"}
          aria-label="zoom out map"
          borderRadius={0}
          borderTopWidth={"0"}
          _hover={{
            backgroundColor: "gray.100",
          }}
          _focus={{
            border: "1px 1px 0 1px solid",
            borderColor: "gray.300",
          }}
          _focusVisible={{
            boxShadow: "0 0 1px 2px rgba(88, 144, 255, 0.75)",
            zIndex: 1,
            position: "relative",
          }}
          _active={{
            backgroundColor: "gray.100",
            boxShadow: "initial",
          }}
          onClick={() => zoomBy(-step)}
        />
        <IconButton
          className="compass"
          variant={"secondary"}
          icon={<Icon as={CompassIcon} boxSize={3} color="gray.600" />}
          aria-label="Reset compass"
          size={"xs"}
          minWidth={8}
          minHeight={8}
          borderColor="gray.300"
          borderTopWidth={0}
          borderRadius={0}
          borderBottomLeftRadius={4}
          borderBottomRightRadius={4}
          boxShadow={"0 2px 4px 0 rgba(0, 0, 0, 0.12)"}
          _hover={{
            backgroundColor: "gray.100",
          }}
          _focus={{
            border: "1px 1px 0 1px solid",
            borderColor: "gray.300",
          }}
          _focusVisible={{
            boxShadow: "0 0 1px 2px rgba(88, 144, 255, 0.75)",
            borderRadius: 0,
          }}
          _active={{
            backgroundColor: "gray.100",
            boxShadow: "initial",
          }}
          onClick={resetCompass}
        />
      </ButtonGroup>
    </VStack>
  );
}
