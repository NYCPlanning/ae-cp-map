import { Grid, GridItem, Text, VStack, Link } from "@nycplanning/streetscape";
import { Outlet } from "react-router";

export default function NonMapHeaderPage() {
  return (
    <Grid
      templateColumns={"subgrid"}
      templateRows={"subgrid"}
      gridColumn={"1 / -1"}
      gridRow={"2 / -1"}
    >
      <GridItem
        gridColumnStart={{
          base: "2",
          lg: "3",
          xl: "4",
        }}
        gridColumnEnd={{
          base: "-2",
          lg: "10",
          xl: "9",
        }}
        gridRowStart={"2"}
        gridRowEnd={"3"}
        pt={8}
      >
        <Outlet />
      </GridItem>
      <GridItem
        gridColumnStart={{
          base: "2",
          lg: "10",
          xl: "9",
        }}
        gridColumnEnd={{
          base: "-2",
          lg: "12",
          xl: "12",
        }}
        gridRowStart={{
          base: "3",
          lg: "2",
        }}
        gridRowEnd={{
          base: "4",
          lg: "3",
        }}
        pt={8}
      >
        <VStack
          alignItems={"flex-start"}
          py={{
            base: 9,
            lg: 0,
          }}
        >
          <Text color={"gray.700"} fontWeight={"bold"}>
            Feedback
          </Text>
          <Text>
            This tool is in active development and DCP is open to any and all
            feedback. For questions, inquires or feedback on CPP or its content,
            please send us an email to&nbsp;
            <Link
              href="mailto:CAPS@planning.nyc.gov"
              color={"primary.600"}
              textDecorationLine={"underline"}
            >
              CAPS@planning.nyc.gov
            </Link>
          </Text>
        </VStack>
      </GridItem>
    </Grid>
  );
}
