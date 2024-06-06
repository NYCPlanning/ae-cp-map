import { List, ListItem } from "@nycplanning/streetscape";
import { Link, useOutletContext, useParams } from "@remix-run/react";
import {
  FindBoroughsQueryResponse,
  FindCapitalProjectsByBoroughIdCommunityDistrictIdQueryResponse,
  FindCommunityDistrictsByBoroughIdQueryResponse,
} from "../gen";

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
      Community District: {boroughDetails?.abbr}
      {communityDistrictId}
      <List>
        {contextData.capitalProjects.map((project) => (
          <ListItem key={`${project.managingCode}${project.id}`}>
            <Link to={`${project.managingCode}/${project.id}`}>
              {`${project.managingCode}/${project.id}`}
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
}
