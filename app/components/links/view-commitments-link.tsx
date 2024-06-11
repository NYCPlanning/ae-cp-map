import { Link } from "@nycplanning/streetscape";
import { LinkRemix } from "../ui";

export default function ViewCommitmentsLink() {
  return (
    <Link as={LinkRemix} to="capital-commitments" color={"blue"}>
      View commitments
    </Link>
  );
}
