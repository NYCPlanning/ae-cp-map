import { Flex, List, ListItem, Text } from "@nycplanning/streetscape";
import { Outlet, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { ClosePageBtn } from "../components/ui/buttons/close-page-btn";
import { GeographyMenuNone } from "../components/geography-menu";
import ContentPanelLayout from "../components/content-panel/layout";

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

export default function CityCouncilDistrictCityCouncilDistrictIdPath() {
  const { managingCode, id, sponsoringAgencies } = useLoaderData<{
    managingCode: string;
    id: string;
    sponsoringAgencies: Array<string>;
  }>();

  return (
    <>
      <GeographyMenuNone />
      <ContentPanelLayout>
        <Flex>
          <ClosePageBtn />
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
      </ContentPanelLayout>
    </>
  );
}
