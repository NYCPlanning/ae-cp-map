import { LoaderFunctionArgs, json } from "@remix-run/node";
import { findCapitalProjectsByCityCouncilId } from "../gen";
import { useLoaderData, useNavigate } from "@remix-run/react";

export async function loader({params}:  LoaderFunctionArgs) {
    console.log("in loader");
    const { cityCouncilDistrictId } = params;
    if (cityCouncilDistrictId === undefined) {
        throw json("Bad Request", { status: 400 });
    }
    const projectsByCityCouncilDistrictResponse = await findCapitalProjectsByCityCouncilId(
        cityCouncilDistrictId, 
        {
            baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
        },
    );
    console.log(projectsByCityCouncilDistrictResponse);

    return json({projectsByCityCouncilDistrictResponse});
}

export default function CapitalProjectsByCityCouncilDistrict() {
    const projectsByCityCouncilDistrict = useLoaderData<typeof loader>();
    console.log(projectsByCityCouncilDistrict);
    return (
        <p>projects by city council district</p>
    );
}