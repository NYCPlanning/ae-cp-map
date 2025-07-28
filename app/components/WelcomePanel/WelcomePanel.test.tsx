import { render, screen } from "@testing-library/react";
import { WelcomePanel } from "./WelcomePanel";

const navigateMock = vi.fn();

// https://stackoverflow.com/questions/66284286/react-jest-mock-usenavigate
// https://gist.github.com/CarmeloRicarte/ee7b9908c0ef20eae32428de77a0cd4a
vi.mock("react-router", async () => {
  const mod =
    await vi.importActual<typeof import("react-router")>("react-router");
  return {
    ...mod,
    useNavigate: () => navigateMock,
  };
});

describe("WelcomePanel", () => {
  it("should contain a welcome heading", () => {
    render(<WelcomePanel />);

    expect(screen.getByText(/Welcome/)).toBeVisible();
  });

  it("should contain welcome content", () => {
    render(<WelcomePanel />);

    expect(
      screen.getAllByText(/Capital Projects Database/)[0],
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/ongoing capital projects/)[0],
    ).toBeInTheDocument();
  });
});
