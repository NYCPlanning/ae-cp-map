import {
  Flex,
  List,
  ListItem,
  Text,
  Link as LinkStyle,
} from "@nycplanning/streetscape";
import { useOutletContext, useParams } from "@remix-run/react";
import {
  FindCapitalProjectsByCityCouncilIdQueryResponse,
  FindCityCouncilDistrictsQueryResponse,
} from "../gen";
import { ClosePageBtn } from "../components/buttons/close-page-btn";
import { LinkRemix } from "../components/ui";

export default function CityCouncilDistrictCityCouncilDistrictIdPath() {
  const contextData = useOutletContext<
    FindCityCouncilDistrictsQueryResponse &
      FindCapitalProjectsByCityCouncilIdQueryResponse
  >();
  const { cityCouncilDistrictId } = useParams<{
    cityCouncilDistrictId: string;
  }>();
  if (cityCouncilDistrictId === undefined)
    throw new Error("failed to provide city council district id");

  return (
    <>
      <Flex>
        <ClosePageBtn />
        <Text>City Council District: {cityCouncilDistrictId}</Text>
      </Flex>
      <List>
        {contextData.capitalProjects.map((project) => (
          <ListItem key={`${project.managingCode}${project.id}`}>
            <LinkStyle
              as={LinkRemix}
              to={`${project.managingCode}/${project.id}`}
              color={"blue"}
            >
              {`${project.managingCode}/${project.id}`}
            </LinkStyle>
          </ListItem>
        ))}
      </List>
    </>
  );
}
