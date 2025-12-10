import { render, screen } from "@testing-library/react";
import { CapitalCommitmentsTimeline } from "./CapitalCommitmentsTimeline";
import { createCapitalCommitment } from "~/gen";

describe("CapitalCommitmentsTimeline", () => {
  const currentYear = new Date().getFullYear();

  it("should label past, current, and future commitments", () => {
    const capitalCommitments = Array.from(Array(1), () =>
      createCapitalCommitment(),
    );
    render(
      <CapitalCommitmentsTimeline capitalCommitments={capitalCommitments} />,
    );

    expect(screen.getByText(/Past/)).toBeVisible();
    expect(screen.getByText(/Current/)).toBeVisible();
    expect(screen.getByText(/Future/)).toBeVisible();
  });

  it("should sum commitments two in the past, one current, and none in the future", () => {
    const capitalCommitments = Array.from(Array(3), (_, i) =>
      createCapitalCommitment({
        plannedDate: new Date(`Jan ${currentYear - i}`).toString(),
        totalValue: 1e6,
      }),
    );
    render(
      <CapitalCommitmentsTimeline capitalCommitments={capitalCommitments} />,
    );

    expect(screen.getByText(/\$2.00M/)).toBeVisible();
    expect(screen.getByText(/\$1.00M/)).toBeVisible();
    expect(screen.getByText(/\$0.00/)).toBeVisible();
  });

  it("should sum commitments none in the past, one current, and three in the future", () => {
    const capitalCommitments = Array.from(Array(4), (_, i) =>
      createCapitalCommitment({
        plannedDate: new Date(`Jan ${currentYear + i}`).toString(),
        totalValue: 1e6,
      }),
    );
    render(
      <CapitalCommitmentsTimeline capitalCommitments={capitalCommitments} />,
    );

    expect(screen.getByText(/\$0.00/)).toBeVisible();
    expect(screen.getByText(/\$1.00M/)).toBeVisible();
    expect(screen.getByText(/\$3.00M/)).toBeVisible();
  });

  it("should show a range of past years", () => {
    const capitalCommitments = Array.from(Array(4), (_, i) =>
      createCapitalCommitment({
        plannedDate: new Date(`Jan ${currentYear - i}`).toString(),
      }),
    );
    render(
      <CapitalCommitmentsTimeline capitalCommitments={capitalCommitments} />,
    );

    expect(
      screen.getByText(`${currentYear - 3} - ${currentYear - 1}`),
    ).toBeVisible();
  });

  it("should show a single past year", () => {
    const capitalCommitments = Array.from(Array(2), (_, i) =>
      createCapitalCommitment({
        plannedDate: new Date(`Jan ${currentYear - i}`).toString(),
      }),
    );
    render(
      <CapitalCommitmentsTimeline capitalCommitments={capitalCommitments} />,
    );

    expect(screen.getByText(`${currentYear - 1}`)).toBeVisible();
  });

  it("should show the current year", () => {
    const capitalCommitments = Array.from(Array(1), () =>
      createCapitalCommitment({
        plannedDate: new Date(`Jan ${currentYear}`).toString(),
      }),
    );
    render(
      <CapitalCommitmentsTimeline capitalCommitments={capitalCommitments} />,
    );

    expect(screen.getByText(currentYear)).toBeVisible();
  });

  it("should show a range of future years", () => {
    const capitalCommitments = Array.from(Array(4), (_, i) =>
      createCapitalCommitment({
        plannedDate: new Date(`Jan ${currentYear + i}`).toString(),
      }),
    );
    render(
      <CapitalCommitmentsTimeline capitalCommitments={capitalCommitments} />,
    );

    expect(
      screen.getByText(`${currentYear + 1} - ${currentYear + 3}`),
    ).toBeVisible();
  });

  it("should show a single future year", () => {
    const capitalCommitments = Array.from(Array(2), (_, i) =>
      createCapitalCommitment({
        plannedDate: new Date(`Jan ${currentYear + i}`).toString(),
      }),
    );
    render(
      <CapitalCommitmentsTimeline capitalCommitments={capitalCommitments} />,
    );

    expect(screen.getByText(`${currentYear + 1}`)).toBeVisible();
  });
});
