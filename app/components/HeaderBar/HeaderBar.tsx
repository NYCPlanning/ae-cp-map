import { Heading, Box, GridItem } from "@nycplanning/streetscape";

export function HeaderBar() {
  return (
    <GridItem
      zIndex={"1000"}
      backgroundColor={"white"}
      gridColumnStart={"1"}
      gridColumnEnd={"-1"}
      gridRowStart={"1"}
      gridRowEnd={"2"}
      boxShadow={"0 2px 8px 0 rgba(0, 0, 0, 0.16)"}
      sx={{
        "@media (orientation: portrait) and (min-height: 1150px)": {
          height: "4dvh",
        },
      }}
    >
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={{ base: "space-between", lg: "space-between" }}
        alignItems={"center"}
        marginLeft={"3dvw"}
        marginRight={"3dvw"}
        height={"100%"}
      >
        <Box display="flex" alignItems="center">
          <img
            style={{ height: "2.25rem" }}
            alt="NYC Planning"
            src="https://raw.githubusercontent.com/NYCPlanning/dcp-logo/master/dcp_logo_772.png"
          />
          <Heading
            visibility={{ base: "hidden", md: "revert", lg: "revert" }}
            display={{ base: "none", md: "revert" }}
            ml={"1rem"}
            as="h1"
            fontSize="xl"
            fontWeight="bold"
          >
            Capital Projects Portal
          </Heading>
        </Box>
      </Box>
    </GridItem>
  );
}
