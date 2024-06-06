import { Button } from "@nycplanning/streetscape";
import { Link } from "@remix-run/react";

export function GoToGeography({ ...props }) {
  return (
    <Button isDisabled={props.isDisabled}>
      <Link to="capital-projects">Go to Selected Geography</Link>
    </Button>
  );
}
