import { Flex, List, ListItem } from "@nycplanning/streetscape";
import { useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import HideCommitmentsLink from "../components/ui/links/hide-commitments-link";

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
    capitalCommitments: Array<{ id: string }>;
  }>();
  return (
    <Flex flexDirection={"column"}>
      <HideCommitmentsLink />
      <List>
        {capitalCommitments.map((commitment) => (
          <ListItem
            key={commitment.id}
          >{`commitment id ${commitment.id}`}</ListItem>
        ))}
      </List>
    </Flex>
  );
}
