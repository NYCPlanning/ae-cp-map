import { render, screen } from "@testing-library/react";
import {
  createCommunityBoardBudgetRequest,
  CommunityBoardBudgetRequest,
  createAgency,
  createCommunityBoardBudgetRequestPolicyArea,
  createCommunityBoardBudgetRequestAgencyResponseType,
} from "~/gen";
import { CommunityBoardBudgetRequestPanel } from ".";

describe("CommunityBoardBudgetRequestPanel", () => {
  let cbbr: CommunityBoardBudgetRequest;
  let agencyName: string;
  let policyArea: string;
  let agencyResponseType: string;
  let onNavigationClick: () => void;

  beforeAll(() => {
    cbbr = createCommunityBoardBudgetRequest();
    agencyName = createAgency().name;
    policyArea = createCommunityBoardBudgetRequestPolicyArea().description;
    agencyResponseType =
      createCommunityBoardBudgetRequestAgencyResponseType().description;
  });

  beforeEach(() => {
    onNavigationClick = vi.fn();
  });

  it("should render the request panel with the cbbr tracking number", () => {
    render(
      <CommunityBoardBudgetRequestPanel
        cbbr={cbbr}
        agencyName={agencyName}
        policyArea={policyArea}
        agencyResponseType={agencyResponseType}
        onNavigationClick={onNavigationClick}
      />,
    );

    expect(screen.getByText(cbbr.id)).toBeVisible();
  });

  it("should render the request panel with the community board", () => {
    render(
      <CommunityBoardBudgetRequestPanel
        cbbr={cbbr}
        agencyName={agencyName}
        policyArea={policyArea}
        agencyResponseType={agencyResponseType}
        onNavigationClick={onNavigationClick}
      />,
    );

    expect(screen.getByText(cbbr.communityBoardId)).toBeVisible();
  });

  it("should render the request panel with the agency", () => {
    render(
      <CommunityBoardBudgetRequestPanel
        cbbr={cbbr}
        agencyName={agencyName}
        policyArea={policyArea}
        agencyResponseType={agencyResponseType}
        onNavigationClick={onNavigationClick}
      />,
    );

    expect(screen.getByText(agencyName)).toBeVisible();
  });

  it("should render the request panel with the policy area", () => {
    render(
      <CommunityBoardBudgetRequestPanel
        cbbr={cbbr}
        agencyName={agencyName}
        policyArea={policyArea}
        agencyResponseType={agencyResponseType}
        onNavigationClick={onNavigationClick}
      />,
    );

    expect(screen.getByText(policyArea)).toBeVisible();
  });

  it("should render the request panel with the cbbr priority", () => {
    render(
      <CommunityBoardBudgetRequestPanel
        cbbr={cbbr}
        agencyName={agencyName}
        policyArea={policyArea}
        agencyResponseType={agencyResponseType}
        onNavigationClick={onNavigationClick}
      />,
    );

    expect(screen.getByText(cbbr.priority)).toBeVisible();
  });
});
