import { GridItem, HStack } from "@nycplanning/streetscape";
import AdminBoundarySelector from "../components/admin-boundary-selector";
import { GeographyMenu } from "../components/geography-menu";
import { GeographyTypeSelector } from "../components/geography-type-selector";
import { useOutletContext, useParams } from "@remix-run/react";
import {
  FindBoroughsQueryResponse,
  FindCommunityDistrictsByBoroughIdQueryResponse,
} from "../gen";
import { LoaderFunctionArgs } from "@remix-run/node";
import { GoToGeography } from "../components/go-to-geography";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { boroughId } = params;
  if (boroughId === undefined) throw new Error("failed to provide borough id");
  //   return await findCommunityDistrictsByBoroughId(boroughId, {
  //     baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
  //   });
  return {
    communityDistricts: [
      {
        id: "01",
      },
      {
        id: "05",
      },
    ],
  };
};
export default function CommunityDistrictBoroughIdPath() {
  const { boroughId } = useParams<{ boroughId: string }>();
  if (boroughId === undefined) throw new Error("failed to provide borough id");
  const contextData = useOutletContext<
    FindBoroughsQueryResponse & FindCommunityDistrictsByBoroughIdQueryResponse
  >();
  return (
    <GridItem
      zIndex={1}
      gridColumnStart={2}
      gridColumnEnd={16}
      gridRowStart={2}
      gridRowEnd={10}
    >
      <GeographyMenu>
        <GeographyTypeSelector />
        <HStack spacing={2}>
          <AdminBoundarySelector
            activeBoundaryId={boroughId}
            boundaries={contextData.boroughs}
            routePrefix={"community-districts"}
          >
            Borough
          </AdminBoundarySelector>
          <AdminBoundarySelector
            activeBoundaryId={""}
            boundaries={contextData.communityDistricts}
            routePrefix={`community-districts/${boroughId}`}
          >
            District
          </AdminBoundarySelector>
        </HStack>
        <GoToGeography isDisabled />
      </GeographyMenu>
    </GridItem>
  );
}
