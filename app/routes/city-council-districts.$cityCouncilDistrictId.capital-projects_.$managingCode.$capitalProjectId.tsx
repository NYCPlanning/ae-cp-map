import { useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
import { CapitalProjectDetailPanel } from "../components/CapitalProjectDetailPanel";
import { loader } from "./capital-projects.$managingCode.$capitalProjectId";
export { loader } from "./capital-projects.$managingCode.$capitalProjectId";

export default function CapitalProjectsByCityCouncilDistrictCapitalProject() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { capitalProject, agencies } = useLoaderData<typeof loader>();
  return (
    <CapitalProjectDetailPanel
      capitalProject={capitalProject}
      agencies={agencies}
      onClose={() => {
        navigate({
          pathname: "/",
          search: `?${searchParams.toString()}`,
        });
      }}
    />
  );
}
