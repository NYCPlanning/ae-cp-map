import { Borough, createBorough } from "~/gen";
import { BoroughDropdown } from "./BoroughDropdown";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { act } from "react";

describe("BoroughDropdown", () => {
  let boroughs: Array<Borough> = [];
  beforeAll(() => {
    boroughs = Array.from(Array(1), () => createBorough());
  });

  it("should render borough form details and options", () => {
    const setAdminParams = vi.fn();
    render(
      <BoroughDropdown setAdminParams={setAdminParams} boroughs={boroughs} />,
    );
    expect(screen.getByLabelText("Borough")).toBeInTheDocument();
    const firstBoroughTitle = boroughs[0].title;
    expect(screen.getByText(firstBoroughTitle)).toBeInTheDocument();
  });

  it("should set search params when next borough id is empty", async () => {
    const setAdminParams = vi.fn();
    const firstBoroughId = boroughs[0].id;
    render(
      <BoroughDropdown
        setAdminParams={setAdminParams}
        selectValue={firstBoroughId}
        boroughs={boroughs}
      />,
    );

    await act(() => userEvent.selectOptions(screen.getByRole("combobox"), ""));
    expect(setAdminParams).toHaveBeenCalledWith({
      districtType: "cd",
      boroughId: null,
      districtId: null,
    });
  });

  it("should set search params when next borough id has a value", async () => {
    const setAdminParams = vi.fn();
    const firstBoroughId = boroughs[0].id;
    render(
      <BoroughDropdown setAdminParams={setAdminParams} boroughs={boroughs} />,
    );

    await act(() =>
      userEvent.selectOptions(screen.getByRole("combobox"), firstBoroughId),
    );
    expect(setAdminParams).toHaveBeenCalledWith({
      districtType: "cd",
      boroughId: firstBoroughId,
      districtId: null,
    });
  });
});
