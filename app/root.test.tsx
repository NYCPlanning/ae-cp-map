import { createRemixStub } from "@remix-run/testing";
import App, { loader } from "./root";
import { render, screen, waitFor } from "@testing-library/react";

describe("App component", () => {
  it.only("should render", async () => {
    const AppStub = createRemixStub([
      {
        path: "/",
        Component: App,
        loader: loader,
      },
    ]);
    render(<AppStub />);
    await waitFor(() => screen.getByText("Borough"));
    screen.debug();
  });
});
