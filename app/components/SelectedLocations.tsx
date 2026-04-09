import { Box, CloseIcon, Flex, Heading, Tag } from "@nycplanning/streetscape";
import { useLoaderData } from "react-router";
import { useUpdateSearchParams } from "~/utils/utils";
import { loader } from "~/layouts/ResultsPanel";
import { ClearFilterBtn } from "./ClearFilter";

export function SelectedLocations() {
  const {
    boroughsResponse: { boroughs },
  } = useLoaderData<typeof loader>();

  const [searchParams, updateSearchParams] = useUpdateSearchParams();
  const boundaryType = searchParams.get("boundaryType");
  const boroughId = searchParams.get("boroughId");
  const boundaryId = searchParams.get("boundaryId");

  const boroughIds = searchParams.get("boroughIds");

  const tagLabel = (() => {
    if (boundaryType === "ccd" && boundaryId !== null) {
      return (
        <>
          <span style={{ fontWeight: "bold" }}>City Council</span>
          <span style={{ paddingRight: "2px" }}>{` | ${boundaryId}`}</span>
        </>
      );
    }

    const borough = boroughs.find((b) => b.id === (boroughId ?? boroughIds));

    if (!borough) return null;

    if (boundaryType === "cd" && boundaryId !== null) {
      return (
        <>
          <span style={{ fontWeight: "bold" }}>{borough.title}</span>
          <span style={{ paddingRight: "2px" }}>{` | CD ${boundaryId}`}</span>
        </>
      );
    }

    if (boundaryType === "borough") {
      return <span style={{ fontWeight: "bold" }}>{borough.title}</span>;
    }

    return null;
  })();

  const clearSelections = () => {
    updateSearchParams({
      boundaryType: null,
      boroughId: null,
      boundaryId: null,
      boroughIds: null,
    });
  };

  const clearTag = () => {
    if (boundaryType === "ccd") {
      updateSearchParams({
        boundaryType: null,
        boundaryId: null,
        boroughId: null,
      });
    } else if (boundaryType === "cd") {
      updateSearchParams({
        boundaryType: null,
        boroughId: null,
        boundaryId: null,
      });
    } else if (boundaryType === "borough") {
      updateSearchParams({
        boundaryType: null,
        boroughIds: null,
      });
    }
  };

  return (
    <Flex
      direction="column"
      gap={"10px"}
      border={"1px solid"}
      borderColor={"gray.300"}
      borderRadius={"12px"}
      background={"gray.50"}
      padding={4}
      height={"82px"}
    >
      <Flex alignItems={"flex-start"} justify={"space-between"} height={"20px"}>
        <Box alignSelf={"center"}>
          <Heading fontSize={"xs"} fontWeight={"bold"}>
            SELECTED LOCATION
          </Heading>
        </Box>
        <Box alignSelf={"center"}>
          <ClearFilterBtn
            textAlign={"right"}
            verticalAlign={"text-bottom"}
            onClear={clearSelections}
            buttonLabel="Clear"
          ></ClearFilterBtn>
        </Box>
      </Flex>

      <Flex
        justifyContent={"flex-start"}
        alignItems={"center"}
        height={"20px"}
        padding={"2px 4px"}
      >
        {tagLabel !== null && (
          <Tag
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={"4px"}
            fontSize={"11px"}
            borderRadius={"4px"}
            background={"primary.100"}
            color={"teal.700"}
          >
            <Box>{tagLabel}</Box>
            <Box>
              <CloseIcon
                color={"teal.700"}
                width={"8px"}
                height={"8px"}
                onClick={clearTag}
                aria-label={"closeIcon"}
                verticalAlign={"baseline"}
                sx={{
                  cursor: "pointer",
                }}
              />
            </Box>
          </Tag>
        )}
      </Flex>
    </Flex>
  );
}
