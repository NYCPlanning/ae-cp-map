import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ClearFilterBtn } from "./index";

describe("ClearFilterBtn", () => {
  const onClearMock = vi.fn();

  beforeEach(() => {
    onClearMock.mockClear();
  });

  it("renders with default label", () => {
    render(<ClearFilterBtn onClear={() => null} />);
    expect(screen.getByText("Reset Selections")).toBeInTheDocument();
  });

  it("renders with custom label", () => {
    render(
      <ClearFilterBtn onClear={() => null} buttonLabel="Clear All Filters" />,
    );

    expect(screen.getByText("Clear All Filters")).toBeInTheDocument();
  });

  it("calls onClear on click", async () => {
    onClearMock.mockResolvedValue(undefined);
    render(<ClearFilterBtn onClear={onClearMock} />);

    const button = screen.getByRole("button", { name: /Reset Selections/ });

    fireEvent.click(button);

    await waitFor(() => {
      expect(onClearMock).toHaveBeenCalledTimes(1);
    });
  });
});
