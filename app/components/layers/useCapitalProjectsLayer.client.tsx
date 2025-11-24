import { MVTLayer } from "@deck.gl/geo-layers";
import {
  useLoaderData,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router";
import {
  DataFilterExtension,
  DataFilterExtensionProps,
} from "@deck.gl/extensions";
import type { Feature, Geometry } from "geojson";
import {
  BoroughId,
  DistrictId,
  DistrictType,
  CommitmentsTotalMin,
  CommitmentsTotalMax,
} from "../../utils/types";
import { env } from "~/utils/env";
import { loader as mapPageLoader } from "~/layouts/MapPage";

const { zoningApiUrl } = env;
export interface CapitalProjectProperties {
  managingCodeCapitalProjectId: string;
  managingAgency: string;
  agencyBudgets: string;
  commitmentsTotal: number;
}

export function useCapitalProjectsLayer(opts: {
  visible?: boolean;
  hoveredCapitalProject?: string | null;
  setHoveredOverProject: (newHoveredOverProject: string | null) => void;
}) {
  const visible = opts.visible ?? true;
  const hoveredCapitalProject = opts.hoveredCapitalProject;
  const setHoveredOverProject = opts.setHoveredOverProject;
  const { managingCode, capitalProjectId } = useParams();
  const [searchParams] = useSearchParams();
  const managingAgency = searchParams.get("managingAgency");
  const agencyBudget = searchParams.get("agencyBudget");
  const commitmentsTotalMin = searchParams.get(
    "commitmentsTotalMin",
  ) as CommitmentsTotalMin;
  const commitmentsTotalMax = searchParams.get(
    "commitmentsTotalMax",
  ) as CommitmentsTotalMax;
  const districtType = searchParams.get("districtType") as DistrictType;
  const boroughId = searchParams.get("boroughId") as BoroughId;
  const districtId = searchParams.get("districtId") as DistrictId;
  const min = commitmentsTotalMin
    ? parseFloat(commitmentsTotalMin)
    : -1000000000000;
  const max = commitmentsTotalMax
    ? parseFloat(commitmentsTotalMax)
    : 1000000000000;
  const navigate = useNavigate();

  const onCapitalProjectsInCityCouncilDistrictPath =
    districtType === "ccd" && districtId !== null;
  const onCapitalProjectsInCommunityDistrictPath =
    districtType === "cd" && boroughId !== null && districtId !== null;

  let endpointPrefix = "";
  if (onCapitalProjectsInCityCouncilDistrictPath) {
    endpointPrefix = `city-council-districts/${districtId}/`;
  } else if (onCapitalProjectsInCommunityDistrictPath) {
    endpointPrefix = `boroughs/${boroughId}/community-districts/${districtId}/`;
  }

  const loaderData = useLoaderData<typeof mapPageLoader>();

  const fullAgencyAcronymList = loaderData.managingAgencies
    ? loaderData.managingAgencies.map((agency) => agency.initials)
    : [];

  return new MVTLayer<
    CapitalProjectProperties,
    DataFilterExtensionProps<Feature<Geometry, CapitalProjectProperties>>
  >({
    id: "capitalProjects",
    data: [
      `${zoningApiUrl}/api/${endpointPrefix}capital-projects/{z}/{x}/{y}.pbf`,
    ],
    uniqueIdProperty: "managingCodeCapitalProjectId",
    autoHighlight: true,
    visible,
    highlightColor: [129, 230, 217, 218],
    highlightedFeatureId: hoveredCapitalProject,
    pickable: true,
    getFilterValue: (f: Feature<Geometry, CapitalProjectProperties>) =>
      f.properties.commitmentsTotal,
    filterRange: [min, max],
    getFilterCategory: (f: Feature<Geometry, CapitalProjectProperties>) => {
      const agencyBudgets = JSON.parse(f.properties.agencyBudgets);
      return [
        f.properties.managingAgency,
        agencyBudget === null || agencyBudgets.includes(agencyBudget) ? 1 : 0,
      ];
    },
    filterCategories: [
      managingAgency === null ? fullAgencyAcronymList : [managingAgency],
      [1],
    ],
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
    onHover: (data) => {
      const managingCodeCapitalProjectId = data.object?.properties;
      if (data.index === -1) {
        setHoveredOverProject(null);
      } else if (managingCodeCapitalProjectId) {
        setHoveredOverProject(managingCodeCapitalProjectId);
      }
    },
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
      getFilterCategory: [agencyBudget],
    },
    extensions: [
      new DataFilterExtension({
        filterSize: 1,
        categorySize: 2,
      }),
    ],
  });
}
