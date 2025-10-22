import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Heading,
} from "@nycplanning/streetscape";
import { useLocation, useNavigate } from "react-router";
import { CityCouncilDistrict, Borough, CommunityDistrict } from "~/gen";
import { analyticsTrackFilterByDistrictToggle } from "../utils/analytics";
import { BoroughId, DistrictId, DistrictType } from "../utils/types";
import {
  BoroughDropdown,
  DistrictTypeDropdown,
  CommunityDistrictDropdown,
  CityCouncilDistrictDropdown,
} from "./AdminDropdown";
import { useUpdateSearchParams, setNewSearchParams } from "~/utils/utils";
import { EducationIcon } from "~/icons";

export const FilterMenu = ({
  boroughs,
  cityCouncilDistricts,
  communityDistricts,
}: FilterMenuProps) => {
  const [searchParams, updateSearchParams] = useUpdateSearchParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const districtType = searchParams.get("districtType") as DistrictType;
  const boroughId = searchParams.get("boroughId") as BoroughId;
  const districtId = searchParams.get("districtId") as DistrictId;

  // When a new district is selected while user is on welcome page, update the param
  // and navigate to /capital-projects. Otherwise, just update param.
  const onDistrictChange = ({ districtId }: { districtId?: DistrictId }) => {
    if (pathname === "/") {
      const nextSearchParams = setNewSearchParams(searchParams, { districtId });
      navigate(
        {
          pathname: "/capital-projects",
          search: nextSearchParams.toString(),
        },
        { replace: true },
      );
    } else {
      updateSearchParams({ districtId });
    }
  };

  return (
    <AccordionItem>
      <AccordionButton aria-label="Close geography filter menu" p={0}>
        <Heading
          flex="1"
          textAlign="left"
          fontSize="medium"
          fontWeight="bold"
          lineHeight="32px"
        >
          Filter by Location
          <EducationIcon />
        </Heading>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel px={0} display={"flex"} flexDirection={"column"} gap={1}>
        <DistrictTypeDropdown
          selectValue={districtType}
          setAdminParams={({ districtType }) => {
            updateSearchParams({
              districtType,
              boroughId: null,
              districtId: null,
            });
          }}
        />
        <BoroughDropdown
          selectValue={boroughId}
          boroughs={boroughs}
          setAdminParams={({ boroughId }) => {
            updateSearchParams({ boroughId, districtId: null });
          }}
        />
        {districtType !== "ccd" ? (
          <CommunityDistrictDropdown
            boroughId={boroughId}
            selectValue={districtId}
            communityDistricts={communityDistricts}
            setAdminParams={onDistrictChange}
          />
        ) : (
          <CityCouncilDistrictDropdown
            selectValue={districtId}
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
