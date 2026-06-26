import {
  LoaderFunctionArgs,
  data,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "react-router";
import {
  findFacilityAgencies,
  findFacilityById,
  findFacilityCategories,
} from "../gen";
import { FacilityDetail } from "~/components/FacilityDetail";
import { ContentPanelAccordion } from "~/components/ContentPanelAccordion";
import { analytics } from "~/utils/analytics";
import { env } from "~/utils/env";

const { zoningApiUrl } = env;

export async function loader({ params }: LoaderFunctionArgs) {
  const { facilityId } = params;

  if (facilityId === undefined) {
    throw data("Bad Request", { status: 400 });
  }

  const facilityPromise = findFacilityById(facilityId, {
    baseURL: `${zoningApiUrl}/api`,
  });

  const facilityAgenciesPromise = findFacilityAgencies({
    baseURL: `${zoningApiUrl}/api`,
  });

  const facilityCategoriesPromise =
    findFacilityCategories({
      baseURL: `${zoningApiUrl}/api`,
    });

  const [
    facility,
    facilityAgencies,
    facilityCategories,
  ] = await Promise.all([
    facilityPromise,
    facilityAgenciesPromise,
    facilityCategoriesPromise,
  ]);

  const facilityCategoriesMap = new Map<string, string>();
  for (const category of facilityCategories) {
    for (const group of category.groups) {
      for (const subgroup of group.subgroups) {
        facilityCategoriesMap.set(`${category.id}-${group.id}-${subgroup.id}`, `${category.name} / ${group.name} / ${subgroup.name}`);
      }
    }
  }
  return {
    facility,
    facilityAgencies,
    facilityCategoriesMap,
  };
}

export default function Facility() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { facility, facilityCategoriesMap, facilityAgencies } =
    useLoaderData<typeof loader>();

  const categoryPath = facilityCategoriesMap.get(`${facility.categoryId}-${facility.categoryGroupId}-${facility.categorySubgroupId}`);

  const onNavigationClick = () => {
    analytics({
      category: "Close Facility Info Modal Button",
      action: "Click",
      name: "Closed",
    });
    navigate({
      pathname: `/facilities`,
      search: `?${searchParams.toString()}`,
    });
  };

  return (
    <ContentPanelAccordion accordionHeading="Details">
      <FacilityDetail
        facility={facility}
        categoryPath={categoryPath === undefined ? "Not specified" : categoryPath}
        facilityAgencies={facilityAgencies}
        onNavigationClick={onNavigationClick}
      />
    </ContentPanelAccordion>
  );
}
