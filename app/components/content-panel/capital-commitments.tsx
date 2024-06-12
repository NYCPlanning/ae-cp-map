import { Flex, List, ListItem } from "@nycplanning/streetscape";
import HideCommitmentsLink from "../ui/links/hide-commitments-link";
import { CapitalCommitment } from "~/gen";

export interface CapitalCommitmentsContentPanel {
  capitalCommitments: Array<CapitalCommitment>;
}
export default function CapitalCommitmentsContentPanel({
  capitalCommitments,
}: CapitalCommitmentsContentPanel) {
  return (
    <Flex flexDirection={"column"}>
      <HideCommitmentsLink />
      <List>
        {capitalCommitments.map((commitment) => (
          <ListItem
            key={commitment.id}
          >{`commitment id ${commitment.id}`}</ListItem>
        ))}
      </List>
    </Flex>
  );
}
