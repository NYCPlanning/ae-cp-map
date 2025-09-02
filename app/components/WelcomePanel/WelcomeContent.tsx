import { Box, Heading, Link, Text } from "@nycplanning/streetscape";

export function WelcomeContent() {
  return (
    <>
      <Box paddingBottom={2}>
        <Box
          borderBottomStyle={"solid"}
          borderBottomColor={"gray.200"}
          borderBottomWidth={"1px"}
          marginBottom={3}
        >
          <Heading fontSize="medium" fontWeight="medium" lineHeight={"32px"}>
            Capital Projects Database
          </Heading>
        </Box>
        <Text fontSize={"small"}>
          The Capital Projects Database includes information on New York City’s
          potential, planned, and ongoing capital projects. To better help you
          understand New York City’s capital project portfolio within and across
          major agencies, we have organized mapped projects in this portal.
          Unmapped projects, such as the purchase of vehicles or digital
          infrastructure, are not included in this tool.
        </Text>
      </Box>
      <Box>
        <Box
          borderBottomStyle={"solid"}
          borderBottomColor={"gray.200"}
          borderBottomWidth={"1px"}
          marginBottom={3}
        >
          <Heading fontSize="medium" fontWeight="medium" lineHeight={"32px"}>
            How to Use This Tool
          </Heading>
        </Box>
        <Text fontSize={"small"}>
          Select a project on the map to learn more about the relevant agencies
          and capital commitments, or filter by specific geographies to see all
          projects in that area. You can also export your selection as a CSV
          table.
        </Text>
      </Box>
      <Box>
        <Box
          borderBottomStyle={"solid"}
          borderBottomColor={"gray.200"}
          borderBottomWidth={"1px"}
          marginBottom={3}
        >
          <Heading
            fontSize={"medium"}
            fontWeight={"medium"}
            lineHeight={"32px"}
          >
            More information
          </Heading>
        </Box>
        <Text fontSize={"small"}>
          To learn more about the Capital Projects Database and how New York
          City invests in building a better future, go to{" "}
          <Link
            color={"primary.500"}
            _hover={{
              textDecoration: "underline",
            }}
            href="https://www.nyc.gov/site/omb/publications/publications.page"
            isExternal
          >
            The Mayor&apos;s Office of Management and Budget
          </Link>
          . If you would like to download the complete database, including
          unmapped projects, you can find it at{" "}
          <Link
            color={"primary.500"}
            _hover={{
              textDecoration: "underline",
            }}
            href="https://www.nyc.gov/content/planning/pages/resources/datasets/capital-projects-database"
            isExternal
          >
            Bytes of the Big Apple
          </Link>
        </Text>
      </Box>
    </>
  );
}
