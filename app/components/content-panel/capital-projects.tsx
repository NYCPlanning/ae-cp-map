import { Flex, Link, List, ListItem, Text } from "@nycplanning/streetscape";
import { LinkRemix } from "../ui";
import { ClosePageBtn } from "../ui/buttons/close-page-btn";
import { CapitalProject } from "../../gen";

export interface CapitalProjectsContentPanel {
  heading: string;
  capitalProjects: Array<CapitalProject>;
}

export default function CapitalProjectsContentPanel({
  heading,
  capitalProjects,
}: CapitalProjectsContentPanel) {
  return (
    <>
      <Flex>
        <ClosePageBtn />
        <Text>{heading}</Text>
      </Flex>
      <List>
        {capitalProjects.map((project) => (
          <ListItem key={`${project.managingCode}${project.id}`}>
            <Link
              as={LinkRemix}
              to={`${project.managingCode}/${project.id}`}
              color={"blue"}
            >
              {`${project.managingCode}/${project.id}`}
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
}
