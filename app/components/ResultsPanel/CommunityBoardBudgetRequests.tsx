import { findCommunityBoardBudgetRequests } from "~/gen";
import { ResultsPanelLayout } from "./Layout";
import { data, LoaderFunctionArgs, useLoaderData } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const itemsPerPage = 7;
  const cbbrPageParam = url.searchParams.get("cbbrPage");
  const cbbrPage = cbbrPageParam === null ? 1 : parseInt(cbbrPageParam);
  if (isNaN(cbbrPage)) {
    throw data("Bad Request", { status: 400 });
  }
  const offset = (cbbrPage - 1) * itemsPerPage;
  const budgetRequestPromise = findCommunityBoardBudgetRequests(
    {
      limit: itemsPerPage,
      offset,
    },
    {
      baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
    },
  );

  const [budgetRequestResponse] = await Promise.all([budgetRequestPromise]);

  return budgetRequestResponse;
}

export default function CommunityBoardBudgetRequests() {
  const { communityBoardBudgetRequests, totalBudgetRequests } =
    useLoaderData<typeof loader>();
  return (
    <ResultsPanelLayout
      totalResults={totalBudgetRequests}
      budgetRequests={communityBoardBudgetRequests}
    />
  );
}
