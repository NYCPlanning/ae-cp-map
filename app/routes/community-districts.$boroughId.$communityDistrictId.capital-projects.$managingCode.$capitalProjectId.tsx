import { Link, Outlet } from "@remix-run/react";

export default function CommunityDistrictCapitalProjectPath() {
  return (
    <>
      <Link to="capital-commitments">hello</Link>
      <Outlet />
    </>
  );
}
