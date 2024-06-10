import { Outlet, useLoaderData } from "@remix-run/react";
import {
  FindCityCouncilDistrictsQuery,
  findCityCouncilDistricts,
} from "../gen";

export const loader = async () => {
  return await findCityCouncilDistricts({
    baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
  });
};

export default function CityCouncilDistrictPath() {
  const loaderData = useLoaderData<FindCityCouncilDistrictsQuery>();
  return <Outlet context={loaderData} />;
}
