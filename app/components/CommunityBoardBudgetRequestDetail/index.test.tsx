import { render, screen } from "@testing-library/react";
import {
  createCommunityBoardBudgetRequest,
  CommunityBoardBudgetRequest,
  createAgency,
  createCommunityBoardBudgetRequestAgencyCategoryResponse,
} from "~/gen";
import { CommunityBoardBudgetRequestDetail } from ".";

describe("CommunityBoardBudgetRequestDetail", () => {
  let cbbr: CommunityBoardBudgetRequest;
  let agencyName: string;
  let policyArea: string;
  let agencyCategoryResponse: string;
  let onNavigationClick: () => void;

  beforeAll(() => {
    cbbr = {
      ...createCommunityBoardBudgetRequest(),
      id: "CB-TEST-42",
      communityBoardId: "Community Board 42",
    };
    agencyName = createAgency().name;
    policyArea = "Test policy area";
    agencyCategoryResponse =
      createCommunityBoardBudgetRequestAgencyCategoryResponse().description;
  });

  beforeEach(() => {
    onNavigationClick = vi.fn();
  });

  it("should render the request panel with the cbbr tracking number", () => {
    render(
      <CommunityBoardBudgetRequestDetail
        cbbr={cbbr}
        agencyName={agencyName}
        policyArea={policyArea}
        agencyCategoryResponse={agencyCategoryResponse}
        onNavigationClick={onNavigationClick}
      />,
    );

    expect(screen.getByText(cbbr.id)).toBeVisible();
  });

  it("should render the request panel with the community board", () => {
    render(
      <CommunityBoardBudgetRequestDetail
        cbbr={cbbr}
        agencyName={agencyName}
        policyArea={policyArea}
        agencyCategoryResponse={agencyCategoryResponse}
        onNavigationClick={onNavigationClick}
      />,
    );

    expect(screen.getByText(cbbr.communityBoardId)).toBeVisible();
  });

  it("should render the request panel with the agency", () => {
    render(
      <CommunityBoardBudgetRequestDetail
        cbbr={cbbr}
        agencyName={agencyName}
        policyArea={policyArea}
        agencyCategoryResponse={agencyCategoryResponse}
        onNavigationClick={onNavigationClick}
      />,
    );

    expect(screen.getByText(agencyName)).toBeVisible();
  });

  it("should render the request panel with the policy area", () => {
    render(
      <CommunityBoardBudgetRequestDetail
        cbbr={cbbr}
        agencyName={agencyName}
        policyArea={policyArea}
        agencyCategoryResponse={agencyCategoryResponse}
        onNavigationClick={onNavigationClick}
      />,
    );

    expect(screen.getByText(policyArea)).toBeVisible();
  });

  it("should render the request panel with the cbbr priority", () => {
    render(
      <CommunityBoardBudgetRequestDetail
        cbbr={cbbr}
        agencyName={agencyName}
        policyArea={policyArea}
        agencyCategoryResponse={agencyCategoryResponse}
        onNavigationClick={onNavigationClick}
      />,
    );

    expect(screen.getByText(cbbr.priority)).toBeVisible();
  });
});
