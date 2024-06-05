import { Outlet, useLoaderData } from "@remix-run/react";
import { FindCityCouncilDistrictsQuery } from "../gen";

export const loader = async () => {
  return {
    Response: {
      cityCouncilDistricts: [{ id: "1" }, { id: "10" }],
    },
  };
};

export default function CityCouncilDistrictPath() {
  const data = useLoaderData<FindCityCouncilDistrictsQuery>();
  console.debug("ccd parent data", data);
  return <Outlet context={data} />;
}
