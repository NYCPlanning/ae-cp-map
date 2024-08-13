import { fireEvent, render, screen } from "@testing-library/react";
import { GoToDistrictBtn } from ".";

describe("GoToDistrictBtn", () => {
  it("should render with 'Go To' text", () => {
    const goToDistrict = vi.fn();
    render(<GoToDistrictBtn goToDistrict={goToDistrict} path={null} />);
    expect(screen.getByText(/Go to Selected District/)).toBeVisible();
  });

  it("should call 'goToDistrict' when path is a string", () => {
    const goToDistrict = vi.fn();
    render(<GoToDistrictBtn goToDistrict={goToDistrict} path={"/"} />);
    fireEvent.click(screen.getByText(/Go to Selected District/));
    expect(goToDistrict).toHaveBeenCalled();
  });

  it("should not call 'goToDistrict' when path is null", () => {
    const goToDistrict = vi.fn();
    render(<GoToDistrictBtn goToDistrict={goToDistrict} path={null} />);
    fireEvent.click(screen.getByText(/Go to Selected District/));
    expect(goToDistrict).not.toHaveBeenCalled();
  });
});
