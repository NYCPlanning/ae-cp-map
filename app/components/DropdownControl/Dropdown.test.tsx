import { fireEvent, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { DropdownControl } from ".";
import { act } from "react";

describe("DropdownControl", () => {
  it("should render with form details", () => {
    render(
      <DropdownControl formId="testBoundary" formLabel="Test Boundary">
        <option>Test option</option>
      </DropdownControl>,
    );

    expect(screen.getByLabelText("Test Boundary")).toBeInTheDocument();
    expect(screen.getByText("Test option")).toBeInTheDocument();
  });

  it("should render with default select option", () => {
    render(
      <DropdownControl formId="testBoundary" formLabel="Test Boundary">
        <option value="test-option">Test option</option>
      </DropdownControl>,
    );

    const options: Array<HTMLOptionElement> = screen.getAllByRole("option");
    const defaultSelect = options.find((option) => option.value === "");
    expect(defaultSelect).toBeInTheDocument();
    expect(defaultSelect?.selected).toBe(true);
    const testSelect = options.find((option) => option.value === "test-option");
    expect(testSelect).toBeInTheDocument();
    expect(testSelect?.selected).toBe(false);
  });

  it("should render with test select option", () => {
    render(
      <DropdownControl
        formId="testBoundary"
        formLabel="Test Boundary"
        selectValue="test-option"
      >
        <option value="test-option">Test option</option>
      </DropdownControl>,
    );

    const options: Array<HTMLOptionElement> = screen.getAllByRole("option");
    const defaultSelect = options.find((option) => option.value === "");
    expect(defaultSelect).toBeInTheDocument();
    expect(defaultSelect?.selected).toBe(false);
    const testSelect = options.find((option) => option.value === "test-option");
    expect(testSelect).toBeInTheDocument();
    expect(testSelect?.selected).toBe(true);
  });

  it("should call function when form label is clicked", async () => {
    const onFormLabelClick = vi.fn();

    render(
      <DropdownControl
        formId="testBoundary"
        formLabel="Test Boundary"
        selectValue="test-option"
        onFormLabelClick={onFormLabelClick}
      >
        <option value="test-option">Test option</option>
      </DropdownControl>,
    );

    await act(() => fireEvent.click(screen.getByText("Test Boundary")));
    expect(onFormLabelClick).toHaveBeenCalled();
  });

  it("should call select function with null when changing to default select option", async () => {
    const onSelectValueChange = vi.fn();
    render(
      <DropdownControl
        formId="testBoundary"
        formLabel="Test Boundary"
        selectValue="test-option"
        onSelectValueChange={onSelectValueChange}
      >
        <option value="test-option">Test option</option>
      </DropdownControl>,
    );

    // Establish default option is not selected
    const options: Array<HTMLOptionElement> = screen.getAllByRole("option");
    const defaultSelect = options.find((option) => option.value === "");
    expect(defaultSelect).toBeInTheDocument();
    expect(defaultSelect?.selected).toBe(false);

    // Select the default option
    await act(() => userEvent.selectOptions(screen.getByRole("combobox"), ""));
    expect(onSelectValueChange).toHaveBeenCalledWith(null);
  });
});
