import { fireEvent, render, screen } from "@testing-library/react";
import { GoToCommunityDistrictBtn } from "./GoToCommunityDistrictBtn";

describe("GoToCommunityDistrictBtn", () => {
  it("should call 'goToDistrict' when all ids are provided", () => {
    const goToDistrict = vi.fn();
    render(
      <GoToCommunityDistrictBtn
        goToDistrict={goToDistrict}
        boroughId={"1"}
        districtId={"01"}
      />,
    );
    fireEvent.click(screen.getByText(/Go to Selected District/));
    expect(goToDistrict).toHaveBeenCalled();
  });

  it("should not call 'goToDistrict' when an id is null", () => {
    const goToDistrict = vi.fn();
    render(
      <GoToCommunityDistrictBtn
        goToDistrict={goToDistrict}
        boroughId={"1"}
        districtId={null}
      />,
    );
    fireEvent.click(screen.getByText(/Go to Selected District/));
    expect(goToDistrict).not.toHaveBeenCalled();
  });
});
