import { Outlet, useLoaderData } from "@remix-run/react";
import {
  FindBoroughsQuery,
  FindBoroughsQueryResponse,
  findBoroughs,
} from "../gen";

export const loader = async () => {
  return await findBoroughs({
    baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
  });
};

export default function CommunityDistrictPath() {
  const data = useLoaderData<FindBoroughsQueryResponse>();
  return <Outlet context={data} />;
}
