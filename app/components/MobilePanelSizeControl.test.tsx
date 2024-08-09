import { fireEvent, render, screen } from "@testing-library/react";
import { MobilePanelSizeControl } from "./MobilePanelSizeControl";

describe("MobilePanelSizeControl", () => {
  it("should have be clickable to expand", async () => {
    const isExpanded = false;
    const isExpandedToggle = vi.fn();
    render(
      <MobilePanelSizeControl
        isExpanded={isExpanded}
        isExpandedToggle={isExpandedToggle}
      />,
    );
    fireEvent.click(screen.getByLabelText(/Expand/));
    expect(isExpandedToggle).toHaveBeenCalled();
  });

  it("should have be clickable to collapse", async () => {
    const isExpanded = true;
    const isExpandedToggle = vi.fn();
    render(
      <MobilePanelSizeControl
        isExpanded={isExpanded}
        isExpandedToggle={isExpandedToggle}
      />,
    );
    fireEvent.click(screen.getByLabelText(/Collapse/));
    expect(isExpandedToggle).toHaveBeenCalled();
  });
});
