import { Agency, createAgency } from "../../gen";
import { OversightAgencyDropdown } from "./OverightAgencyDropdown";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { act } from "react";

describe("OversightAgencyDropdown", () => {
  let agencies: Array<Agency> = [];

  beforeAll(() => {
    agencies = Array.from(Array(1), () => createAgency());
  });

  it("should render oversight agency form details and options", () => {
    const onSelectValueChange = vi.fn();

    render(
      <OversightAgencyDropdown
        onSelectValueChange={onSelectValueChange}
        agencies={agencies}
      />,
    );

    expect(screen.getByLabelText("Oversight Agency")).toBeInTheDocument();

    const firstAgencyLabel = `${agencies[0].name} (${agencies[0].initials})`;
    expect(screen.getByText(firstAgencyLabel)).toBeInTheDocument();
  });

  it("should set search params when changing the oversight agency", async () => {
    const onSelectValueChange = vi.fn();
    const firstAgencyInitials = agencies[0].initials;

    render(
      <OversightAgencyDropdown
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

    expect(onSelectValueChange).toHaveBeenCalledWith(firstAgencyInitials);
  });

  it("should disable the dropdown when agencies are null", () => {
    render(<OversightAgencyDropdown agencies={null} />);

    expect(screen.getByLabelText("Oversight Agency")).toBeDisabled();
  });
});
