import { Agency, createAgency } from "~/gen";
import { AgencyDropdown } from "./AgencyDropdown";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { act } from "react";

describe("AgencyDropdown", () => {
  let agencies: Array<Agency> = [];
  beforeAll(() => {
    agencies = Array.from(Array(1), () => createAgency());
  });

  it("should render agency form details and options", () => {
    const onSelectValueChange = vi.fn();
    render(
      <AgencyDropdown
        onSelectValueChange={onSelectValueChange}
        agencies={agencies}
      />,
    );
    expect(screen.getByLabelText("Managing Agency")).toBeInTheDocument();
    const firstAgencyLabel = `${agencies[0].name} (${agencies[0].initials})`;
    expect(screen.getByText(firstAgencyLabel)).toBeInTheDocument();
  });

  it("should set search params when changing the managing agency", async () => {
    const onSelectValueChange = vi.fn();
    const firstAgencyInitials = agencies[0].initials;
    render(
      <AgencyDropdown
        onSelectValueChange={onSelectValueChange}
        agencies={agencies}
      />,
    );

    await act(() =>
      userEvent.selectOptions(
        screen.getByRole("combobox"),
        firstAgencyInitials,
      ),
    );
    expect(onSelectValueChange).toHaveBeenCalledWith({
      managingAgency: firstAgencyInitials,
    });
  });
});
