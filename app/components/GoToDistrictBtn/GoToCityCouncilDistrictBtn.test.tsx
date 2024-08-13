import { fireEvent, render, screen } from "@testing-library/react";
import { GoToCityCouncilDistrictBtn } from "./GoToCityCouncilDistrictBtn";

describe("GoToCommunityDistrictBtn", () => {
  it("should call 'goToDistrict' when all ids are provided", () => {
    const goToDistrict = vi.fn();
    render(
      <GoToCityCouncilDistrictBtn
        goToDistrict={goToDistrict}
        districtId={"10"}
      />,
    );
    fireEvent.click(screen.getByText(/Go to Selected District/));
    expect(goToDistrict).toHaveBeenCalled();
  });

  it("should not call 'goToDistrict' when an id is null", () => {
    const goToDistrict = vi.fn();
    render(
      <GoToCityCouncilDistrictBtn
        goToDistrict={goToDistrict}
        districtId={null}
      />,
    );
    fireEvent.click(screen.getByText(/Go to Selected District/));
    expect(goToDistrict).not.toHaveBeenCalled();
  });
});
