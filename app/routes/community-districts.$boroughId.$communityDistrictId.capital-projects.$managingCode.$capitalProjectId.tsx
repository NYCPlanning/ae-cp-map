import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Flex, List, ListItem, Text } from "@nycplanning/streetscape";
import { PreviousPageBtn } from "../components/ui/buttons/previous-page-btn";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { managingCode, capitalProjectId } = params;
  if (managingCode === undefined || capitalProjectId == undefined)
    throw new Error("failed to provide managing code or capital project id");

  // TODO: Request capital project details
  return {
    managingCode,
    id: capitalProjectId,
    sponsoringAgencies: ["DOT", "DHS"],
  };
};
export default function CommunityDistrictCapitalProjectPath() {
  const { managingCode, id, sponsoringAgencies } = useLoaderData<{
    managingCode: string;
    id: string;
    sponsoringAgencies: Array<string>;
  }>();
  return (
    <>
      <Flex>
        <PreviousPageBtn />
        <Text>
          Project:
          {managingCode}
          {id}
        </Text>
      </Flex>
      <Outlet />
      Sponsoring Agencies:
      <List>
        {sponsoringAgencies.map((agency) => (
          <ListItem key={agency}>{agency}</ListItem>
        ))}
      </List>
    </>
  );
}
