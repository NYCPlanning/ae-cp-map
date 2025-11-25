import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Heading,
} from "@nycplanning/streetscape";
import { useLocation, useNavigate } from "react-router";
import { CityCouncilDistrict, Borough, CommunityDistrict } from "~/gen";
import {
  BoroughId,
  DistrictId,
  DistrictType,
  QueryParams,
} from "../utils/types";
import {
  BoroughDropdown,
  DistrictTypeDropdown,
  CommunityDistrictDropdown,
  CityCouncilDistrictDropdown,
} from "./DropdownControl";
import { useUpdateSearchParams, setNewSearchParams } from "~/utils/utils";
import { SEARCH_PARAMS } from "~/utils/params";

export const FilterMenu = ({
  boroughs,
  cityCouncilDistricts,
  communityDistricts,
}: FilterMenuProps) => {
  const [searchParams, updateSearchParams] = useUpdateSearchParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const districtTypeParam = searchParams.get(
    SEARCH_PARAMS.GEOGRAPHY.DISTRICT_TYPE.KEY,
  );
  const districtType =
    SEARCH_PARAMS.GEOGRAPHY.DISTRICT_TYPE.PARSER(districtTypeParam);
  const boroughIdParam = searchParams.get(
    SEARCH_PARAMS.GEOGRAPHY.BOROUGH_ID.KEY,
  );
  const boroughId = SEARCH_PARAMS.GEOGRAPHY.BOROUGH_ID.PARSER(boroughIdParam);
  const districtIdParam = searchParams.get(
    SEARCH_PARAMS.GEOGRAPHY.DISTRICT_ID.KEY,
  );
  const districtId =
    SEARCH_PARAMS.GEOGRAPHY.DISTRICT_ID.PARSER(districtIdParam);

  // When a new district is selected while user is on welcome page, update the param
  // and navigate to /capital-projects. Otherwise, just update param.
  const onDistrictChange = ({ districtId }: QueryParams) => {
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
      updateSearchParams({
        [SEARCH_PARAMS.GEOGRAPHY.DISTRICT_ID.KEY]: districtId,
      });
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
        </Heading>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel px={0} display={"flex"} flexDirection={"column"} gap={1}>
        <DistrictTypeDropdown
          selectValue={districtType}
          setAdminParams={({ districtType }) => {
            updateSearchParams({
              [SEARCH_PARAMS.GEOGRAPHY.DISTRICT_TYPE.KEY]: districtType,
              [SEARCH_PARAMS.GEOGRAPHY.BOROUGH_ID.KEY]: null,
              [SEARCH_PARAMS.GEOGRAPHY.DISTRICT_ID.KEY]: null,
            });
          }}
        />
        <BoroughDropdown
          selectValue={boroughId}
          boroughs={boroughs}
          setAdminParams={({ boroughId }) => {
            updateSearchParams({
              [SEARCH_PARAMS.GEOGRAPHY.BOROUGH_ID.KEY]: boroughId,
              [SEARCH_PARAMS.GEOGRAPHY.DISTRICT_ID.KEY]: null,
            });
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
