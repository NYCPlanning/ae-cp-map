import { useOutletContext, useParams } from "@remix-run/react";
import {
  FindCapitalProjectsByCityCouncilIdQueryResponse,
  FindCityCouncilDistrictsQueryResponse,
} from "../gen";
import CapitalProjectsContentPanel from "../components/content-panel/capital-projects";

export default function CityCouncilDistrictCityCouncilDistrictIdPath() {
  const contextData = useOutletContext<
    FindCityCouncilDistrictsQueryResponse &
      FindCapitalProjectsByCityCouncilIdQueryResponse
  >();
  const { cityCouncilDistrictId } = useParams<{
    cityCouncilDistrictId: string;
  }>();
  if (cityCouncilDistrictId === undefined)
    throw new Error("failed to provide city council district id");

  return (
    <CapitalProjectsContentPanel
      heading={`City Council District: ${cityCouncilDistrictId}`}
      capitalProjects={contextData.capitalProjects}
    />
  );
}
