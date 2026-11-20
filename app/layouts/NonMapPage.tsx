import {
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
  Link,
} from "@nycplanning/streetscape";
import { Outlet } from "react-router";

export default function NonMapHeaderPage() {
  return (
    <Grid
      templateColumns={"subgrid"}
      gridColumn="1 / -1"
      gridRow="header-end / -1"
      overflowY="auto"
      sx={{
        scrollbarWidth: "none",
      }}
      className={"nonMapPage"}
    >
      <GridItem
        gridColumn={{
          base: "2 / -2",
          lg: "3 / 10",
          xl: "4 / 9",
        }}
        gridRow={{
          base: "row-start",
          lg: "row-start / row-end",
        }}
        pt={8}
        minHeight={0}
        className={"aboutContentContainer"}
      >
        <Outlet />
      </GridItem>

      <GridItem
        gridColumn={{
          base: "2 / -2",
          lg: "10 / 12",
          xl: "9 / 12",
        }}
        gridRow={{
          base: "auto",
          lg: "row-start / row-end",
        }}
        pt={{
          base: 0,
          lg: 8,
        }}
        minHeight={0}
        className={"feedbackContainer"}
      >
        <VStack
          alignItems={"flex-start"}
          py={{
            base: 9,
            lg: 0,
          }}
        >
          <Heading as="h2" color={"gray.700"} fontWeight={"bold"}>
            Feedback
          </Heading>
          <Text mb={4}>
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
            .
          </Text>
          <Heading as="h2" color={"gray.700"} fontWeight={"bold"}>
            Accessibility
          </Heading>
          <Text>
            The Department of City Planning is committed to ensuring its digital
            content is accessible to and usable by people with disabilities.
            Please see DCP&apos;s{" "}
            <Link
              color={"primary.600"}
              href="https://www.nyc.gov/content/planning/pages/about-us/policies-notices#accessibility"
              isExternal
              textDecoration="underline"
            >
              Accessibility Statement
            </Link>{" "}
            for more information.
          </Text>
        </VStack>
      </GridItem>
    </Grid>
  );
}
