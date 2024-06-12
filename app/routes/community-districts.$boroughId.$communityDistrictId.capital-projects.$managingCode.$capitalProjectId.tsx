import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { CapitalProjectBudgeted } from "../gen";
import CapitalProjectContentPanel from "../components/content-panel/capital-project";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { managingCode, capitalProjectId } = params;
  if (managingCode === undefined || capitalProjectId == undefined)
    throw new Error("failed to provide managing code or capital project id");

  // TODO: Request capital project details
  return {
    managingCode,
    id: capitalProjectId,
    sponsoringAgencyInitials: ["DOT", "DHS"],
  };
};

export default function CommunityDistrictCapitalProjectPath() {
  const capitalProject = useLoaderData<CapitalProjectBudgeted>();
  return (
    <CapitalProjectContentPanel
      navigation="previous"
      capitalProject={capitalProject}
    >
      <Outlet />
    </CapitalProjectContentPanel>
  );
}
