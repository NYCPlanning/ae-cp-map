import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Heading,
} from "@nycplanning/streetscape";
import { useLocation, useNavigate } from "react-router";
import { CityCouncilDistrict, Borough, CommunityDistrict } from "~/gen";
import { BoroughId, BoundaryId, BoundaryType } from "../utils/types";
import {
  BoroughDropdown,
  DistrictTypeDropdown,
  CommunityDistrictDropdown,
  CityCouncilDistrictDropdown,
} from "./DropdownControl";
import { useUpdateSearchParams, setNewSearchParams } from "~/utils/utils";
import { env } from "../utils/env";

export const FilterMenu = ({
  boroughs,
  cityCouncilDistricts,
  communityDistricts,
}: FilterMenuProps) => {
  const [searchParams, updateSearchParams] = useUpdateSearchParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const boundaryType = searchParams.get("boundaryType") as BoundaryType;
  const boroughId = searchParams.get("boroughId") as BoroughId;
  const boundaryId = searchParams.get("boundaryId") as BoundaryId;

  // When a new district is selected while user is on welcome page, update the param
  // and navigate to /capital-projects. Otherwise, just update param.
  const onDistrictChange = ({ boundaryId }: { boundaryId?: BoundaryId }) => {
    if (pathname === "/") {
      const nextSearchParams = setNewSearchParams(searchParams, { boundaryId });
      navigate(
        {
          pathname: "/capital-projects",
          search: nextSearchParams.toString(),
        },
        { replace: true },
      );
    } else {
      updateSearchParams({ boundaryId });
    }
  };

  return (
    <AccordionItem borderBottom={env.facDbPhase1 == "ON" ? "none" : ""}>
      <AccordionButton aria-label="Close geography filter menu" p={0}>
        <Heading
          flex="1"
          textAlign="left"
          fontSize={env.facDbPhase1 == "ON" ? "sm" : "md"}
          fontWeight="bold"
          lineHeight="32px"
        >
          Filter by Location
        </Heading>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel px={0} display={"flex"} flexDirection={"column"} gap={1}>
        <DistrictTypeDropdown
          selectValue={boundaryType}
          setAdminParams={({ boundaryType }) => {
            updateSearchParams({
              boundaryType,
              boroughId: null,
              boundaryId: null,
            });
          }}
        />
        <BoroughDropdown
          selectValue={boroughId}
          boroughs={boroughs}
          setAdminParams={({ boroughId }) => {
            updateSearchParams({ boroughId, boundaryId: null });
          }}
        />
        {boundaryType !== "ccd" ? (
          <CommunityDistrictDropdown
            boroughId={boroughId}
            selectValue={boundaryId}
            communityDistricts={communityDistricts}
            setAdminParams={onDistrictChange}
          />
        ) : (
          <CityCouncilDistrictDropdown
            selectValue={boundaryId}
            cityCouncilDistricts={cityCouncilDistricts}
            setAdminParams={onDistrictChange}
          />
        )}
      </AccordionPanel>
    </AccordionItem>
  );
};

export interface FilterMenuProps {
  boroughs: Array<Borough> | null;
  communityDistricts: Array<CommunityDistrict> | null;
  cityCouncilDistricts: Array<CityCouncilDistrict> | null;
}
