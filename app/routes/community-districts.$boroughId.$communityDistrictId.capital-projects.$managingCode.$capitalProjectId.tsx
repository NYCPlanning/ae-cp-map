import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { List, ListItem, Text } from "@nycplanning/streetscape";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { managingCode, capitalProjectId } = params;
  if (managingCode === undefined || capitalProjectId == undefined)
    throw new Error("failed to provide managing code or capital project id");
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
      <Text>
        Project:
        {managingCode}
        {id}
      </Text>
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
