import { Flex, List, ListItem, Text } from "@nycplanning/streetscape";
import { Outlet, useLoaderData, useParams } from "@remix-run/react";
import { PreviousPageBtn } from "../components/ui/buttons/previous-page-btn";
import { LoaderFunctionArgs } from "@remix-run/node";

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
  const { cityCouncilDistrictId } = useParams<{
    cityCouncilDistrictId: string;
  }>();

  if (cityCouncilDistrictId === undefined)
    throw new Error("failed to provide city council district id");

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
