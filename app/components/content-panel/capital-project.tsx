import { Flex, List, ListItem, Text } from "@nycplanning/streetscape";
import { Outlet } from "@remix-run/react";
import { CapitalProjectBudgeted } from "../../gen";
import { PreviousPageBtn } from "../ui/buttons/previous-page-btn";
import { ClosePageBtn } from "../ui/buttons/close-page-btn";
import { ReactNode } from "react";

export interface CapitalProjectContentPanel {
  navigation: "close" | "previous";
  capitalProject: CapitalProjectBudgeted;
  children: ReactNode;
}
export default function CapitalProjectContentPanel({
  navigation,
  capitalProject,
  children,
}: CapitalProjectContentPanel) {
  return (
    <>
      <Flex>
        {navigation === "close" && <ClosePageBtn />}
        {navigation === "previous" && <PreviousPageBtn />}
        <Text>
          Project:
          {capitalProject.managingCode}
          {capitalProject.id}
        </Text>
      </Flex>
      {children}
      Sponsoring Agencies:
      <List>
        {capitalProject.sponsoringAgencyInitials.map((initials) => (
          <ListItem key={initials}>{initials}</ListItem>
        ))}
      </List>
    </>
  );
}
