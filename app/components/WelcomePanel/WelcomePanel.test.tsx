import { StreetscapeProvider } from "@nycplanning/streetscape";
import { render, screen } from "@testing-library/react";
import { createRoutesStub, Outlet } from "react-router";
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
  const Stub = createRoutesStub([
    {
      path: "/",
      Component: () => (
        <Outlet
          context={{
            isPanelOpen: true,
            setIsPanelOpen: vi.fn(),
          }}
        />
      ),
      children: [{ path: "welcome", Component: WelcomePanel }],
    },
  ]);

  const renderWelcomePanel = () =>
    render(
      <StreetscapeProvider>
        <Stub initialEntries={["/welcome"]} />
      </StreetscapeProvider>,
    );

  it("should contain a welcome heading", () => {
    renderWelcomePanel();

    expect(screen.getByText(/Welcome/)).toBeVisible();
  });

  it("should contain welcome content", () => {
    renderWelcomePanel();

    expect(
      screen.getAllByText(/Capital Projects Portal/)[0],
    ).toBeInTheDocument();
    expect(
      screen.getByText(/supporting layers related to housing growth/),
    ).toBeInTheDocument();
  });
});
