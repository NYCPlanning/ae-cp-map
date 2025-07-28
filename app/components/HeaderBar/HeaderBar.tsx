import {
  Flex,
  Grid,
  Heading,
  Text,
  Box,
  GridItem,
} from "@nycplanning/streetscape";
import { Link, useNavigate } from "react-router";

export interface HeaderBarProps {
  aboutLabel?: string;
}

export function HeaderBar({ aboutLabel = "About" }: HeaderBarProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <GridItem
      zIndex={"1000"}
      backgroundColor={"white"}
      gridColumnStart={"1"}
      gridColumnEnd={"-1"}
      gridRowStart={"1"}
      gridRowEnd={"2"}
      className={"thisIsTheHeader"}
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
            className="logo"
            alt="NYC Planning"
            src="https://raw.githubusercontent.com/NYCPlanning/dcp-logo/master/dcp_logo_772.png"
          />
          <Heading
            visibility={{ base: "hidden", md: "revert", lg: "revert" }}
            display={{ base: "none" }}
            as="h1"
            fontSize="xl"
            fontWeight="bold"
            className="title"
          >
            Capital Projects Portal
          </Heading>
        </Box>
        <Text fontSize={"lg"} className={"thisIsAbout"}>
          <Link to="/" onClick={handleClick}>
            {aboutLabel}
          </Link>
        </Text>
      </Box>
    </GridItem>
  );
}
