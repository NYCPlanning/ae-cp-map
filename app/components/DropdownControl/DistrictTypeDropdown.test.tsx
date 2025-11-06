import { render, screen } from "@testing-library/react";
import { DistrictTypeDropdown } from "./DistrictTypeDropdown";
import { userEvent } from "@testing-library/user-event";
import { act } from "react";

describe("DistrictTypeDropdown", () => {
  it("should render district type form details and options", () => {
    const updateSearchParams = vi.fn();
    render(<DistrictTypeDropdown setAdminParams={updateSearchParams} />);
    expect(screen.getByLabelText("District Type")).toBeInTheDocument();
    expect(screen.getByText("Community District")).toBeInTheDocument();
    expect(screen.getByText("City Council District")).toBeInTheDocument();
  });

  it("should call setAdminParams with new district type when changing the district type", async () => {
    const updateSearchParams = vi.fn();
    render(<DistrictTypeDropdown setAdminParams={updateSearchParams} />);
    await act(() =>
      userEvent.selectOptions(screen.getByRole("combobox"), "cd"),
    );
    expect(updateSearchParams).toHaveBeenCalledWith({
      districtType: "cd",
    });
  });
});
