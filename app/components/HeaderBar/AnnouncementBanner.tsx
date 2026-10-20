import { CloseButton, GridItem, HStack, Text } from "@nycplanning/streetscape";
import { useMatches } from "react-router";
import { useStore } from "~/store";

export function AnnouncementBanner() {
  const matches = useMatches();
  const isMapPage = matches
    .map((match) => match.id)
    .includes("layouts/MapPage");

  const { showAnnouncementBanner, setShowAnnouncementBanner } = useStore(
    (state) => state,
  );

  if (!isMapPage || !showAnnouncementBanner) return <></>;

  return (
    <GridItem
      className={"announcement-banner"}
      role={"status"}
      gridColumnStart={"1"}
      gridColumnEnd={"-1"}
      gridRowStart={{
        base: "4",
        lg: "2",
      }}
      gridRowEnd={{
        base: "5",
        lg: "3",
      }}
      zIndex={900}
      borderRadius={"1"}
      border={"1px solid"}
      borderColor={"gray.300"}
      background={"gray.50"}
      boxShadow={{
        base: "none",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.10), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
      alignContent={"center"}
    >
      <HStack
        width={"100%"}
        paddingX={{
          base: "4",
          md: "8",
        }}
        paddingY={"2"}
        justifyContent={"space-between"}
        fontSize={"sm"}
      >
        <Text flex={"1"}>
          <strong>New: Explore Housing Growth!</strong> Turn on the Housing
          Growth layer to explore housing activity and projected growth across
          NYC by geography and timeframe.
        </Text>
        <CloseButton onClick={() => setShowAnnouncementBanner(false)} />
      </HStack>
    </GridItem>
  );
}
