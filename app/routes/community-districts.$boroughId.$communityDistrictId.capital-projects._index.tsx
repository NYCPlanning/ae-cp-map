import {
  List,
  ListItem,
  Link as LinkStyle,
  Flex,
  Text,
} from "@nycplanning/streetscape";
import {
  Link as LinkRemix,
  useOutletContext,
  useParams,
} from "@remix-run/react";
import {
  FindBoroughsQueryResponse,
  FindCapitalProjectsByBoroughIdCommunityDistrictIdQueryResponse,
  FindCommunityDistrictsByBoroughIdQueryResponse,
} from "../gen";
import { ClosePageBtn } from "../components/close-page-btn";

export default function CommunityDistrictProjectsPath() {
  const { boroughId, communityDistrictId } = useParams();
  if (boroughId === undefined || communityDistrictId === undefined)
    throw new Error("failed to provide borough id or community district id");
  const contextData = useOutletContext<
    FindBoroughsQueryResponse &
      FindCommunityDistrictsByBoroughIdQueryResponse &
      FindCapitalProjectsByBoroughIdCommunityDistrictIdQueryResponse
  >();
  const boroughDetails = contextData.boroughs.find(
    (borough) => borough.id === boroughId,
  );

  return (
    <>
      <Flex>
        <ClosePageBtn />
        <Text>
          Community District: {boroughDetails?.abbr}
          {communityDistrictId}
        </Text>
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
