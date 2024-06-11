import { Link } from "@nycplanning/streetscape";
import { LinkRemix } from "..";

export default function HideCommitmentsLink() {
  return (
    <Link as={LinkRemix} to=".." color={"blue"}>
      Hide commitments
    </Link>
  );
}
