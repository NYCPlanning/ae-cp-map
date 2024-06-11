import {
  Flex,
  List,
  ListItem,
  Link as LinkStyle,
} from "@nycplanning/streetscape";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Link as LinkRemix, useLoaderData } from "@remix-run/react";

export const loader = ({ params }: LoaderFunctionArgs) => {
  const { managingCode, capitalProjectId } = params;
  if (managingCode === undefined || capitalProjectId === undefined)
    throw new Error("failed to provide managing code or capital project id");
  // console.debug("commitments: ", managingCode);
  // console.debug("commitments: ", capitalProjectId);
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
      <LinkStyle as={LinkRemix} to=".." color={"blue"}>
        Hide commitments
      </LinkStyle>
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
