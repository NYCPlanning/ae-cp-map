import { Link } from "@nycplanning/streetscape";
import { LinkRemix } from "..";

export default function ViewCommitmentsLink() {
  return (
    <Link as={LinkRemix} to="capital-commitments" color={"blue"}>
      View commitments
    </Link>
  );
}
