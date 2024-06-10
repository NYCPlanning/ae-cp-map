import { Outlet, useLoaderData, useOutletContext } from "@remix-run/react";
import {
  FindBoroughsQueryResponse,
  FindCommunityDistrictsByBoroughIdQueryResponse,
  findCommunityDistrictsByBoroughId,
} from "../gen";
import { LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { boroughId } = params;
  if (boroughId === undefined) throw new Error("failed to provide borough id");
  return await findCommunityDistrictsByBoroughId(boroughId, {
    baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
  });
};

export default function CommunityDistrictBoroughIdPath() {
  const loaderData =
    useLoaderData<FindCommunityDistrictsByBoroughIdQueryResponse>();
  const contextData = useOutletContext<FindBoroughsQueryResponse>();

  return <Outlet context={{ ...loaderData, ...contextData }} />;
}
