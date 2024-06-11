import { Link } from "@nycplanning/streetscape";
import { LinkRemix } from "../ui";

export default function HideCommitmentsLink() {
  return (
    <Link as={LinkRemix} to=".." color={"blue"}>
      Hide commitments
    </Link>
  );
}
