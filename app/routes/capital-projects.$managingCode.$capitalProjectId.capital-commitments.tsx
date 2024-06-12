import { useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { CapitalCommitment } from "../gen";
import CapitalCommitmentsContentPanel from "../components/content-panel/capital-commitments";

export const loader = ({ params }: LoaderFunctionArgs) => {
  const { managingCode, capitalProjectId } = params;
  if (managingCode === undefined || capitalProjectId === undefined)
    throw new Error("failed to provide managing code or capital project id");

  // TODO: add call to get commitments by project
  return {
    capitalCommitments: [
      {
        id: "1231-abce",
      },
      {
        id: "5223-cdea",
      },
    ],
  };
};
export default function CommunityDistrictCapitalProjectCommitmentsPath() {
  const { capitalCommitments } = useLoaderData<{
    capitalCommitments: Array<CapitalCommitment>;
  }>();
  return (
    <CapitalCommitmentsContentPanel capitalCommitments={capitalCommitments} />
  );
}
