import { Box, Heading, Link, Text } from "@nycplanning/streetscape";

export function WelcomeContent() {
  return (
    <Box marginBottom={"1rem"}>
      <Heading
        textAlign={"left"}
        fontSize="2xl"
        fontWeight="bold"
        lineHeight={"42px"}
        mt={2}
        mb={2}
      >
        Learn how New York City invests in building a better future.
      </Heading>

      <Box>
        <Text fontSize={"md"}>
          The Capital Projects Portal has been designed to help users explore
          where and how the city is investing its capital money across NYC and
          highlight community board priorities across these unique
          neighborhoods. The application currently includes data from multiple
          sources to improve transparency, guide engagement, and support
          planning decisions.
        </Text>

        <Text fontSize={"md"} my={3}>
          To learn more about the capital planning and budget request processes,{" "}
          <Link
            textDecoration="underline"
            href="https://www.nyc.gov/content/planning/pages/planning/capital-planning#overview"
            isExternal
          >
            visit the City Planning website.
          </Link>
        </Text>
      </Box>
    </Box>
  );
}
