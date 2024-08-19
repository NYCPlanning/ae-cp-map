import {
  CapitalCommitment,
  CapitalCommitmentType,
  createCapitalCommitment,
  createCapitalCommitmentType,
} from "~/gen";
import { CapitalCommitmentsTable } from "./CapitalCommitmentsTable";
import { render, screen } from "@testing-library/react";

describe("CapitalCommitmentsTable", () => {
  let capitalCommitments: Array<CapitalCommitment> = [];
  let capitalCommitmentTypes: Array<CapitalCommitmentType> = [];
  beforeAll(() => {
    capitalCommitments = Array.from(Array(1), () =>
      createCapitalCommitment({
        type: "CONS",
        plannedDate: `${new Date("April 2024")}`,
        totalValue: 1e6,
      }),
    );
    capitalCommitmentTypes = Array.from(Array(1), () =>
      createCapitalCommitmentType({
        code: "CONS",
        description: "CONSTRUCTION",
      }),
    );
  });

  it("should render the table header", () => {
    render(
      <CapitalCommitmentsTable
        capitalCommitments={capitalCommitments}
        capitalCommitmentTypes={capitalCommitmentTypes}
      />,
    );

    expect(screen.getByText(/Date/)).toBeVisible();
    expect(screen.getByText(/Description/)).toBeVisible();
    expect(screen.getByText(/Commitment/)).toBeVisible();
  });

  it("should render the month and year of the commitment", () => {
    render(
      <CapitalCommitmentsTable
        capitalCommitments={capitalCommitments}
        capitalCommitmentTypes={capitalCommitmentTypes}
      />,
    );
    expect(screen.getByText(/Apr 2024/)).toBeVisible();
  });

  it("should render the description of the commitment type", () => {
    render(
      <CapitalCommitmentsTable
        capitalCommitments={capitalCommitments}
        capitalCommitmentTypes={capitalCommitmentTypes}
      />,
    );
    expect(screen.getByText(/CONSTRUCTION/)).toBeVisible();
  });

  it("should render the value of the commitment", () => {
    render(
      <CapitalCommitmentsTable
        capitalCommitments={capitalCommitments}
        capitalCommitmentTypes={capitalCommitmentTypes}
      />,
    );

    expect(screen.getByText(/\$1.00M/)).toBeVisible();
  });
});
