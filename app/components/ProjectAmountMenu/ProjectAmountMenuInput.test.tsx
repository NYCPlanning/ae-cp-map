import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { ProjectAmountMenuInput } from "./ProjectAmountMenuInput";
import { act } from "react";

describe("ProjectAmountMenuInput", () => {
  const onInputValueChange = vi.fn();
  const onSelectValueChange = vi.fn();
  it("should render with form details", () => {
    render(
      <ProjectAmountMenuInput
        label="Test Label"
        inputValue={""}
        selectValue=""
        onInputValueChange={onInputValueChange}
        onSelectValueChange={onSelectValueChange}
      />,
    );

    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("should render with default input option (blank) select option (K)", () => {
    render(
      <ProjectAmountMenuInput
        label="Test Label"
        inputValue={""}
        selectValue=""
        onInputValueChange={onInputValueChange}
        onSelectValueChange={onSelectValueChange}
      />,
    );

    const input: HTMLInputElement = screen.getByDisplayValue("");
    expect(input).toBeInTheDocument();
    const options: Array<HTMLOptionElement> = screen.getAllByRole("option");
    const defaultSelect = options.find((option) => option.value === "K");
    expect(defaultSelect).toBeInTheDocument();
    expect(defaultSelect?.selected).toBe(true);
  });

  it("should render with a passed input option and select option", () => {
    render(
      <ProjectAmountMenuInput
        label="Test Label"
        inputValue={"123"}
        selectValue="M"
        onInputValueChange={onInputValueChange}
        onSelectValueChange={onSelectValueChange}
      />,
    );

    const input: HTMLInputElement = screen.getByDisplayValue("123");
    expect(input).toBeInTheDocument();
    const options: Array<HTMLOptionElement> = screen.getAllByRole("option");
    const defaultSelect = options.find((option) => option.value === "K");
    expect(defaultSelect).toBeInTheDocument();
    expect(defaultSelect?.selected).toBe(false);
    const testSelect = options.find((option) => option.value === "M");
    expect(testSelect).toBeInTheDocument();
    expect(testSelect?.selected).toBe(true);
  });

  it("should call input function when input is changed", async () => {
    render(
      <ProjectAmountMenuInput
        label="Test Label"
        inputValue={"123"}
        selectValue="M"
        onInputValueChange={onInputValueChange}
        onSelectValueChange={onSelectValueChange}
      />,
    );

    const input: HTMLInputElement = screen.getByDisplayValue("123");
    await act(() => userEvent.type(input, "1"));
    expect(onInputValueChange).toHaveBeenCalled();
  });

  it("should call select function when select is changed", async () => {
    render(
      <ProjectAmountMenuInput
        label="Test Label"
        inputValue={"123"}
        selectValue="M"
        onInputValueChange={onInputValueChange}
        onSelectValueChange={onSelectValueChange}
      />,
    );

    const options: Array<HTMLOptionElement> = screen.getAllByRole("option");
    const millionSelect = options.find((option) => option.value === "M");
    expect(millionSelect).toBeInTheDocument();
    expect(millionSelect?.selected).toBe(true);
    const billionSelect = options.find((option) => option.value === "B");
    expect(billionSelect).toBeInTheDocument();
    expect(billionSelect?.selected).toBe(false);
    await act(() => userEvent.selectOptions(screen.getByRole("combobox"), "B"));
    expect(onSelectValueChange).toHaveBeenCalled();
  });
});
