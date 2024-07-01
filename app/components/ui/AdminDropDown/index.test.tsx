import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { AdminDropDown } from ".";

describe("AdminDropDown", () => {
  it("should render with form details", () => {
    render(
      <AdminDropDown formId="testBoundary" formLabel="Test Boundary">
        <option>Test option</option>
      </AdminDropDown>,
    );

    expect(screen.getByLabelText("Test Boundary")).toBeInTheDocument();
    expect(screen.getByText("Test option")).toBeInTheDocument();
  });

  it("should render with default select option", () => {
    render(
      <AdminDropDown formId="testBoundary" formLabel="Test Boundary">
        <option value="test-option">Test option</option>
      </AdminDropDown>,
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
      <AdminDropDown
        formId="testBoundary"
        formLabel="Test Boundary"
        selectValue="test-option"
      >
        <option value="test-option">Test option</option>
      </AdminDropDown>,
    );

    const options: Array<HTMLOptionElement> = screen.getAllByRole("option");
    const defaultSelect = options.find((option) => option.value === "");
    expect(defaultSelect).toBeInTheDocument();
    expect(defaultSelect?.selected).toBe(false);
    const testSelect = options.find((option) => option.value === "test-option");
    expect(testSelect).toBeInTheDocument();
    expect(testSelect?.selected).toBe(true);
  });

  it.todo("should call function when form label is clicked");

  it.only("should call select function with null when changing to default select option", async () => {
    const onSelectValueChange = vi.fn();
    render(
      <AdminDropDown
        formId="testBoundary"
        formLabel="Test Boundary"
        selectValue="test-option"
        onSelectValueChange={onSelectValueChange}
      >
        <option value="test-option">Test option</option>
      </AdminDropDown>,
    );

    // Establish default option is not selected
    const options: Array<HTMLOptionElement> = screen.getAllByRole("option");
    const defaultSelect = options.find((option) => option.value === "");
    expect(defaultSelect).toBeInTheDocument();
    expect(defaultSelect?.selected).toBe(false);

    // Select the default option
    await userEvent.selectOptions(screen.getByRole("combobox"), "");
    expect(onSelectValueChange).toHaveBeenCalledWith(null);
  });
});
