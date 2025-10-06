import { Box, Heading, Link, Text } from "@nycplanning/streetscape";

export function WelcomeContent() {
  return (
    <Box>
      <Heading
        textAlign={"left"}
        fontSize="xl"
        fontWeight="bold"
        lineHeight={"32px"}
        overflow={"auto"}
      >
        Learn how New York City invests in building a better future.
      </Heading>

      <Box overflow={"auto"}>
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
        <Text fontSize={"sm"}>
          *Indicates Continued Support. Continued Support requests are Capital
          requests which have received some degree of funding or approval, where
          the board is requesting that the agency continue its support of that
          ongoing item.
        </Text>
      </Box>
    </Box>
  );
}
