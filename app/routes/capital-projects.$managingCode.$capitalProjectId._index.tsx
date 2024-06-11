import { Link } from "@nycplanning/streetscape";
import { Link as LinkRemix } from "@remix-run/react";

export default function CommunityDistrictCapitalProjectPath() {
  return (
    <Link as={LinkRemix} to="capital-commitments" color={"blue"}>
      View commitments
    </Link>
  );
}
