import { Button } from "@nycplanning/streetscape";
import { LinkRemix } from "../ui";

export function GoToGeography({ ...props }) {
  return (
    <Button
      isDisabled={props.isDisabled}
      as={LinkRemix}
      to={"capital-projects"}
    >
      Go to Selected Geography
    </Button>
  );
}
