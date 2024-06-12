import { Outlet, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { GeographyMenuNone } from "../components/geography-menu";
import ContentPanelLayout from "../components/content-panel/layout";
import CapitalProjectContentPanel from "../components/content-panel/capital-project";
import { CapitalProjectBudgeted } from "../gen";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { managingCode, capitalProjectId } = params;
  if (managingCode === undefined || capitalProjectId == undefined)
    throw new Error("failed to provide managing code or capital project id");
  return {
    managingCode,
    id: capitalProjectId,
    sponsoringAgencyInitials: ["DOT", "DHS"],
  };
};

export default function CityCouncilDistrictCityCouncilDistrictIdPath() {
  const capitalProject = useLoaderData<CapitalProjectBudgeted>();

  return (
    <>
      <GeographyMenuNone />
      <ContentPanelLayout>
        <CapitalProjectContentPanel
          navigation="close"
          capitalProject={capitalProject}
        >
          <Outlet />
        </CapitalProjectContentPanel>
      </ContentPanelLayout>
    </>
  );
}
