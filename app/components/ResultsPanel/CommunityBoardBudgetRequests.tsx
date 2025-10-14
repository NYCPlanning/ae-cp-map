import { findCommunityBoardBudgetRequests } from "~/gen";
import { ResultsPanelLayout } from "./Layout";
import { data, LoaderFunctionArgs, useLoaderData } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const itemsPerPage = 7;
  const pageParam = url.searchParams.get("page");
  const page = pageParam === null ? 1 : parseInt(pageParam);
  if (isNaN(page)) {
    throw data("Bad Request", { status: 400 });
  }
  const offset = (page - 1) * itemsPerPage;
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
  const { communityBoardBudgetRequests, totalBudgetRequests, limit, offset } =
    useLoaderData<typeof loader>();
  console.log("total", totalBudgetRequests);
  return <ResultsPanelLayout totalResults={totalBudgetRequests} />;
}
