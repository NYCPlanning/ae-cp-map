import { Flex, GridItem, List, ListItem, Text } from "@nycplanning/streetscape";
import { Outlet, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { ClosePageBtn } from "../components/ui/buttons/close-page-btn";
import { GeographyMenuNone } from "../components/geography-menu";

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
      <GridItem
        zIndex={1}
        gridColumnStart={42}
        gridColumnEnd={64}
        gridRowStart={2}
        gridRowEnd={30}
      >
        <Flex
          borderRadius={"base"}
          padding={{ base: 3, lg: 4 }}
          background={"white"}
          direction={"column"}
          boxShadow={"0px 8px 4px 0px rgba(0, 0, 0, 0.08)"}
          width={"100%"}
          height={"100%"}
        >
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
        </Flex>
      </GridItem>
    </>
  );
}
