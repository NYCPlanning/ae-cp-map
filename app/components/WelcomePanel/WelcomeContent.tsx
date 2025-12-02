import { Box, Heading, Link, Text } from "@nycplanning/streetscape";

export function WelcomeContent() {
  return (
    <Box marginBottom={"1rem"}>
      <Heading
        textAlign={"left"}
        fontSize="xl"
        fontWeight="bold"
        lineHeight={"32px"}
        mt={2}
        mb={2}
      >
        Learn how New York City invests in building a better future.
      </Heading>

      <Box>
        <Text fontSize={"md"}>
          The Capital Projects Database includes information on New York City’s
          potential, planned, and ongoing capital projects. To better help you
          understand New York City’s capital project portfolio within and across
          major agencies, we have organized mapped projects in this portal.
          Unmapped projects, such as the purchase of vehicles or digital
          infrastructure, are not included in this tool.
        </Text>

        <Text fontSize={"md"} marginBottom={3}>
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
            href="https://www.nyc.gov/site/planning/data-maps/open-data/dwn-capital-planning-database.page"
            isExternal
          >
            Bytes of the Big Apple
          </Link>
        </Text>
      </Box>
    </Box>
  );
}
