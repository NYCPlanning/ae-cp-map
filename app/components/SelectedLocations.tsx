import { Box, Link, Flex, Heading, Tag } from "@nycplanning/streetscape";
import { useLoaderData } from "react-router";
import { useUpdateSearchParams } from "~/utils/utils";
import { loader } from "~/layouts/ResultsPanel";
import { ClearFilterBtn } from "./ClearFilter";
import { ReactElement, useState } from "react";
import { SelectedLocationTag } from "./SelectedLocationTag";

export function SelectedLocations({
  clearRadiusFilter,
}: {
  clearRadiusFilter: () => void;
}) {
  const {
    boroughsResponse: { boroughs },
  } = useLoaderData<typeof loader>();

  const [searchParams, updateSearchParams] = useUpdateSearchParams();
  const [tagsAreExpanded, setTagsAreExpanded] = useState<boolean>(false);
  const boundaryType = searchParams.get("boundaryType");
  const boroughId = searchParams.get("boroughId");
  const boundaryId = searchParams.get("boundaryId");
  const boroughIdsString = searchParams.get("boroughIds");
  const boroughIds =
    boroughIdsString === null ? [] : boroughIdsString.split(",");
  const cityCouncilDistrictIdsString = searchParams.get(
    "cityCouncilDistrictIds",
  ) as string;
  const cityCouncilDistrictIds =
    cityCouncilDistrictIdsString !== null
      ? cityCouncilDistrictIdsString?.split(",")
      : boundaryId === null
        ? []
        : [boundaryId];
  const communityDistrictIdsString = searchParams.get(
    "communityDistrictIds",
  ) as string;
  const communityDistrictIds =
    communityDistrictIdsString !== null
      ? communityDistrictIdsString?.split(",")
      : boroughId === null || boundaryId === null
        ? []
        : [`${boroughId}${boundaryId}`];

  const radiusParam = searchParams.get("radius");
  const radius = radiusParam === null ? -1 : parseInt(radiusParam);
  const radiusValueInMiles = new Intl.NumberFormat("en", {
    maximumFractionDigits: 2,
  }).format(radius / 5280);

  const tags = ((): { id: string; label: ReactElement }[] | null => {
    if (radiusParam !== null) {
      return [
        {
          id: "radius",
          label: (
            <>
              <span style={{ fontWeight: "bold" }}>Radius</span>
              <span
                style={{ paddingRight: "2px" }}
              >{` | ${radiusValueInMiles} mi`}</span>
            </>
          ),
        },
      ];
    }

    if (boundaryType === "ccd" && cityCouncilDistrictIds !== null) {
      return cityCouncilDistrictIds.map((cityCouncilDistrictId) => {
        return {
          id: cityCouncilDistrictId,
          label: (
            <>
              <span style={{ fontWeight: "bold" }}>City Council</span>
              <span
                style={{ paddingRight: "2px" }}
              >{` | ${cityCouncilDistrictId}`}</span>
            </>
          ),
        };
      });
    }

    if (boundaryType === "cd" && communityDistrictIds !== null) {
      return communityDistrictIds.map((communityDistrictId) => {
        const borough = boroughs.find((b) => b.id === communityDistrictId[0]);
        if (!borough) return { id: communityDistrictId, label: <></> };
        return {
          id: communityDistrictId,
          label: (
            <>
              <span style={{ fontWeight: "bold" }}>{borough.title}</span>
              <span
                style={{ paddingRight: "2px" }}
              >{` | CD ${communityDistrictId.slice(1)}`}</span>
            </>
          ),
        };
      });
    }

    if (boundaryType === "borough" && boroughIds !== null) {
      const selectedBoroughs = boroughs.filter((b) =>
        boroughIds.includes(b.id),
      );
      return selectedBoroughs.map((borough) => {
        return {
          id: borough.id,
          label: <span style={{ fontWeight: "bold" }}>{borough.title}</span>,
        };
      });
    }

    return null;
  })();

  const clearSelections = () => {
    updateSearchParams({
      boroughId: undefined,
      boundaryId: undefined,
      boroughIds: undefined,
      cityCouncilDistrictIds: undefined,
      communityDistrictIds: undefined,
    });
    if (radius > 0) {
      clearRadiusFilter();
    }
  };

  const clearTag = (id?: string) => {
    if (radius > 0) {
      clearRadiusFilter();
    }

    if (boundaryType === "ccd") {
      if (cityCouncilDistrictIds.length > 1) {
        updateSearchParams({
          cityCouncilDistrictIds: cityCouncilDistrictIds
            .filter((ccdid) => ccdid !== id)
            .join(","),
        });
      } else {
        updateSearchParams({
          cityCouncilDistrictIds: undefined,
        });
      }
    } else if (boundaryType === "cd") {
      if (communityDistrictIds.length > 1) {
        updateSearchParams({
          communityDistrictIds: communityDistrictIds
            .filter((cdid) => cdid !== id)
            .join(","),
        });
      } else {
        updateSearchParams({
          communityDistrictIds: undefined,
        });
      }
    } else if (boundaryType === "borough") {
      if (boroughIds.length > 1) {
        updateSearchParams({
          boroughIds: boroughIds.filter((bid) => bid !== id).join(","),
        });
      } else {
        updateSearchParams({
          boroughIds: undefined,
        });
      }
    }
  };

  if (tags === null) return <></>;

  return (
    <Flex
      direction="column"
      gap={"10px"}
      border={"1px solid"}
      borderColor={"gray.300"}
      borderRadius={"12px"}
      background={"gray.50"}
      padding={4}
    >
      <Flex alignItems={"flex-start"} justify={"space-between"} height={"20px"}>
        <Box alignSelf={"center"}>
          <Heading fontSize={"xs"} fontWeight={"bold"}>
            SELECTED LOCATIONS{" "}
            {tags !== null && tags.length >= 8 ? (
              <span style={{ fontWeight: 400 }}>(maximum 10)</span>
            ) : (
              ""
            )}
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
        flexWrap={"wrap"}
        padding={"2px 4px"}
        gap={1}
      >
        {tags.length <= 5 || tagsAreExpanded
          ? tags.map((tag) => (
              <SelectedLocationTag
                key={tag.id}
                id={tag.id}
                label={tag.label}
                clearTag={clearTag}
              />
            ))
          : tags.length > 5 &&
            !tagsAreExpanded && (
              <>
                {tags.slice(0, 5).map((tag) => (
                  <SelectedLocationTag
                    key={tag.id}
                    id={tag.id}
                    label={tag.label}
                    clearTag={clearTag}
                  />
                ))}
                <Tag
                  key={"plus-more"}
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  gap={"4px"}
                  fontSize={"11px"}
                  borderRadius={"4px"}
                  border={"1px solid"}
                  borderColor={"primary.600"}
                  background={"primary.50"}
                  color={"primary.600"}
                  cursor={"pointer"}
                >
                  <Box onClick={() => setTagsAreExpanded(true)}>
                    + {tags.length - 5} more
                  </Box>
                </Tag>
              </>
            )}
        {tagsAreExpanded && (
          <Link
            px={2}
            color={"primary.600"}
            textDecoration={"underline"}
            fontSize={"11px"}
            cursor={"pointer"}
            onClick={() => setTagsAreExpanded(false)}
          >
            see less
          </Link>
        )}
      </Flex>
      {tags.length === 10 && (
        <Flex fontSize={"xs"}>
          You&apos;ve reached the maximum number of selections. Remove a{" "}
          {boundaryType === "ccd"
            ? "City Council District"
            : "Community District"}{" "}
          on the map or clear it from the list above.
        </Flex>
      )}
    </Flex>
  );
}
