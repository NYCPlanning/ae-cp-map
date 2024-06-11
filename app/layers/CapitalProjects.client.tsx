import { MVTLayer } from "@deck.gl/geo-layers";
import { useNavigate } from "@remix-run/react";

export function useCapitalProjectsLayer() {
  const navigate = useNavigate();

  return new MVTLayer<{
    managingCodeCapitalProjectId: string;
    managingAgency: string;
  }>({
    id: "capital-projects",
    data: `${import.meta.env.VITE_ZONING_API_URL}/api/capital-projects/{z}/{x}/{y}.pbf`,
    pickable: true,
    getFillColor: (f) => {
      const agencyColorCode = f.properties.managingCodeCapitalProjectId
        .slice(0, 3)
        .split("")
        .map((initial) => initial.charCodeAt(0) * 3) as [
        number,
        number,
        number,
      ];
      agencyColorCode.push(200);
      return agencyColorCode;
    },
    getPointRadius: () => 5,
    onClick: ({ object }) => {
      const { properties } = object as {
        properties: {
          managingCodeCapitalProjectId: string;
          managingAgency: string;
        };
      };

      const { managingCodeCapitalProjectId } = properties;
      navigate(
        `capital-projects/${managingCodeCapitalProjectId.slice(0, 3)}/${managingCodeCapitalProjectId.slice(3)}`,
      );
    },
  });
}
