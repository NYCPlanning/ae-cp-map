import { Borough, createBorough } from "~/gen";
import RandExp from "randexp";
import { BoroughDropdown } from "./BoroughDropdown";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("BoroughDropdown", () => {
  let boroughs: Array<Borough> = [];
  beforeAll(() => {
    boroughs = Array.from(Array(1), () =>
      createBorough({
        id: new RandExp("^([0-9])$").gen(),
      }),
    );
  });

  it("should render borough form details and options", () => {
    const updateSearchParams = vi.fn();
    render(
      <BoroughDropdown
        updateSearchParams={updateSearchParams}
        boroughs={boroughs}
      />,
    );
    expect(screen.getByLabelText("Borough")).toBeInTheDocument();
    const firstBoroughTitle = boroughs[0].title;
    expect(screen.getByText(firstBoroughTitle)).toBeInTheDocument();
  });

  it("should set search params when next borough id is empty", async () => {
    const updateSearchParams = vi.fn();
    const firstBoroughId = boroughs[0].id;
    render(
      <BoroughDropdown
        updateSearchParams={updateSearchParams}
        selectValue={firstBoroughId}
        boroughs={boroughs}
      />,
    );

    await userEvent.selectOptions(screen.getByRole("combobox"), "");
    expect(updateSearchParams).toHaveBeenCalledWith({
      districtType: "cd",
    });
  });

  it("should set search params when next borough id has a value", async () => {
    const updateSearchParams = vi.fn();
    const firstBoroughId = boroughs[0].id;
    render(
      <BoroughDropdown
        updateSearchParams={updateSearchParams}
        selectValue={null}
        boroughs={boroughs}
      />,
    );

    await userEvent.selectOptions(screen.getByRole("combobox"), firstBoroughId);
    expect(updateSearchParams).toHaveBeenCalledWith({
      districtType: "cd",
      boroughId: firstBoroughId,
    });
  });
});
