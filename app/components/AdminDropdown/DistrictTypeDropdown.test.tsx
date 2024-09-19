import { render, screen } from "@testing-library/react";
import { DistrictTypeDropdown } from "./DistrictTypeDropdown";
import { userEvent } from "@testing-library/user-event";
import { act } from "react";

describe("DistrictTypeDropdown", () => {
  it("should render district type form details and options", () => {
    const setAdminParams = vi.fn();
    render(<DistrictTypeDropdown setAdminParams={setAdminParams} />);
    expect(screen.getByLabelText("District Type")).toBeInTheDocument();
    expect(screen.getByText("Community District")).toBeInTheDocument();
    expect(screen.getByText("City Council District")).toBeInTheDocument();
  });

  it("should update search params when changing the district type", async () => {
    const setAdminParams = vi.fn();
    render(<DistrictTypeDropdown setAdminParams={setAdminParams} />);
    await act(() =>
      userEvent.selectOptions(screen.getByRole("combobox"), "cd"),
    );
    expect(setAdminParams).toHaveBeenCalledWith({
      districtType: "cd",
      boroughId: null,
      districtId: null,
    });
  });
});
