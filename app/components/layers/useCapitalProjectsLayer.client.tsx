import { MVTLayer } from "@deck.gl/geo-layers";
import {
  useLoaderData,
  useNavigate,
  useParams,
  useSearchParams,
  useMatches,
} from "@remix-run/react";
import {
  DataFilterExtension,
  DataFilterExtensionProps,
} from "@deck.gl/extensions";
import type { Feature, Geometry } from "geojson";
import { FindAgenciesQueryResponse } from "../../gen";

export interface CapitalProjectProperties {
  managingCodeCapitalProjectId: string;
  managingAgency: string;
}

const capitalProjectsInCommunityDistrictRoutePrefix =
  "routes/boroughs.$boroughId.community-districts.$communityDistrictId.capital-projects";
const capitalProjectsInCityCouncilDistrictRoutePrefix =
  "routes/city-council-districts.$cityCouncilDistrictId.capital-projects";

export function useCapitalProjectsLayer() {
  const { managingCode, capitalProjectId } = useParams();
  const [searchParams] = useSearchParams();
  const managingAgency = searchParams.get("managingAgency");
  const navigate = useNavigate();

  const matches = useMatches();

  const layoutRoute = matches[1];

  const onCapitalProjectsInCityCouncilDistrictPath = layoutRoute?.id.startsWith(
    capitalProjectsInCityCouncilDistrictRoutePrefix,
  );
  const onCapitalProjectsInCommunityDistrictPath = layoutRoute?.id.startsWith(
    capitalProjectsInCommunityDistrictRoutePrefix,
  );

  let endpointPrefix = "";
  if (onCapitalProjectsInCityCouncilDistrictPath) {
    endpointPrefix = `city-council-districts/${layoutRoute.params.cityCouncilDistrictId}/`;
  } else if (onCapitalProjectsInCommunityDistrictPath) {
    endpointPrefix = `boroughs/${layoutRoute.params.boroughId}/community-districts/${layoutRoute.params.communityDistrictId}/`;
  }

  const loaderData = useLoaderData<
    FindAgenciesQueryResponse | { agencies: null }
  >();

  const fullAgencyAcronymList = loaderData.agencies
    ? loaderData.agencies.map((agency) => agency.initials)
    : [];

  return new MVTLayer<
    CapitalProjectProperties,
    DataFilterExtensionProps<Feature<Geometry, CapitalProjectProperties>>
  >({
    id: "capitalProjects",
    data: [
      `${import.meta.env.VITE_ZONING_API_URL}/api/${endpointPrefix}capital-projects/{z}/{x}/{y}.pbf`,
    ],
    uniqueIdProperty: "managingCodeCapitalProjectId",
    autoHighlight: true,
    highlightColor: [129, 230, 217, 218],
    pickable: true,
    getFilterCategory: (f: Feature<Geometry, CapitalProjectProperties>) =>
      f.properties.managingAgency,
    filterCategories:
      managingAgency === null ? fullAgencyAcronymList : [managingAgency],
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

      const capitalProjectRouteSuffix = `capital-projects/${nextManagingCode}/${nextCapitalProjectId}`;
      navigate({
        pathname: `${endpointPrefix}${capitalProjectRouteSuffix}`,
        search: `?${searchParams.toString()}`,
      });
    },
    updateTriggers: {
      getFillColor: [managingCode, capitalProjectId],
      getPointColor: [managingCode, capitalProjectId],
    },
    extensions: [
      new DataFilterExtension({
        categorySize: 1,
      }),
    ],
  });
}
