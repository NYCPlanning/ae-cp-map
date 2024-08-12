import { MVTLayer } from "@deck.gl/geo-layers";
import { useNavigate, useParams, useSearchParams } from "@remix-run/react";

export interface CapitalProjectProperties {
  managingCodeCapitalProjectId: string;
  managingAgency: string;
}
export function useCapitalProjectsLayer() {
  const {
    managingCode,
    capitalProjectId,
    boroughId,
    communityDistrictId,
    cityCouncilDistrictId,
  } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const hasCityCouncilDistrict = cityCouncilDistrictId !== undefined;
  const hasCommunityDistrict =
    boroughId !== undefined && communityDistrictId !== undefined;

  let endpointPrefix = "";
  if (hasCityCouncilDistrict) {
    endpointPrefix = `city-council-districts/${cityCouncilDistrictId}/`;
  } else if (hasCommunityDistrict) {
    endpointPrefix = `boroughs/${boroughId}/community-districts/${communityDistrictId}/`;
  }

  return new MVTLayer<CapitalProjectProperties>({
    id: "capitalProjects",
    data: [
      `${import.meta.env.VITE_ZONING_API_URL}/api/${endpointPrefix}capital-projects/{z}/{x}/{y}.pbf`,
    ],
    uniqueIdProperty: "managingCodeCapitalProjectId",
    autoHighlight: true,
    highlightColor: [129, 230, 217, 218],
    pickable: true,
    getFillColor: ({ properties }) => {
      const { managingCodeCapitalProjectId } = properties;
      switch (managingCodeCapitalProjectId) {
        case `${managingCode}${capitalProjectId}`:
          return [56, 178, 172, 166];
        default:
          return [217, 107, 39, 166];
      }
    },
    getPointRadius: 5,
    getLineColor: [255, 255, 255, 255],
    getLineWidth: 1,
    onClick: (data) => {
      const managingCodeCapitalProjectId =
        data.object?.properties?.managingCodeCapitalProjectId;

      if (managingCodeCapitalProjectId === undefined) return;
      // Avoid adding the same capital project to the history stack
      if (managingCodeCapitalProjectId === `${managingCode}${capitalProjectId}`)
        return;
      const [nextManagingCode, nextCapitalProjectId] = [
        managingCodeCapitalProjectId.slice(0, 3),
        managingCodeCapitalProjectId.slice(3),
      ];
      navigate({
        pathname: `capital-projects/${nextManagingCode}/${nextCapitalProjectId}`,
        search: `?${searchParams.toString()}`,
      });
    },
    updateTriggers: {
      getFillColor: [managingCode, capitalProjectId],
      getPointColor: [managingCode, capitalProjectId],
    },
  });
}
