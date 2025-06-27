import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ClearFilterBtn } from "./index";

const navigateMock = vi.fn();

// https://stackoverflow.com/questions/66284286/react-jest-mock-usenavigate
// https://gist.github.com/CarmeloRicarte/ee7b9908c0ef20eae32428de77a0cd4a
vi.mock("react-router", async () => {
  const mod =
    await vi.importActual<typeof import("@remix-run/react")>(
      "@remix-run/react",
    );
  return {
    ...mod,
    useNavigate: () => navigateMock,
  };
});

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

  it("calls onClear and navigates to '/' on click", async () => {
    onClearMock.mockResolvedValue(undefined);
    render(<ClearFilterBtn onClear={onClearMock} />);

    const button = screen.getByRole("button", { name: /Reset Selections/ });

    fireEvent.click(button);

    expect(button).toBeDisabled();

    await waitFor(() => {
      expect(onClearMock).toHaveBeenCalledTimes(1);
      expect(navigateMock).toHaveBeenCalledWith("/");
    });
  });
});
