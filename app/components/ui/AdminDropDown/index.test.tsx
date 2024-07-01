import { render, screen } from "@testing-library/react";
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

  it.only("should render with default select option", () => {
    render(
      <AdminDropDown formId="testBoundary" formLabel="Test Boundary">
        <option value="test-option">Test option</option>
      </AdminDropDown>,
    );

    expect(screen.getByLabelText("Test Boundary")).toBeInTheDocument();
    expect(screen.getByText("Test option")).toBeInTheDocument();
    const options: Array<HTMLOptionElement> = screen.getAllByRole("option");
    console.debug(
      options.map((option) => console.debug("is selected", option.selected)),
    );
    // screen.debug();
    // console.debug("option", option);
    // expect(option).toHaveValue("");
  });
});
