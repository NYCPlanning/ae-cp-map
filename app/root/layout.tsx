import { Flex, Grid, GridItem } from "@nycplanning/streetscape";
import { Atlas } from "./atlas.client";

export default function Layout() {
  return (
    <Grid
      position="absolute"
      height="100%"
      width="100%"
      gridTemplateColumns={"repeat(64, 1fr)"}
      gridTemplateRows={"repeat(32, 1fr)"}
    >
      <GridItem
        zIndex={1}
        gridColumnStart={2}
        gridColumnEnd={16}
        gridRowStart={2}
        gridRowEnd={8}
      >
        <Flex
          backgroundColor={"white"}
          height={"100%"}
          width={"100%"}
          onMouseDown={() => console.debug("still capturing events")}
        >
          First item
        </Flex>
      </GridItem>
      <GridItem
        zIndex={1}
        gridColumnStart={50}
        gridColumnEnd={64}
        gridRowStart={2}
        gridRowEnd={30}
      >
        <Flex
          backgroundColor={"white"}
          height={"100%"}
          width={"100%"}
          onClick={() => console.debug("still capturing clicks")}
        >
          Second Item
        </Flex>
      </GridItem>
      <GridItem>
        <Atlas />
      </GridItem>
    </Grid>
  );
}
