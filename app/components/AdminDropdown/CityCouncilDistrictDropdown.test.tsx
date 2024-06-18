import { render, screen } from "@testing-library/react";
import { CityCouncilDistrict, createCityCouncilDistrict } from "~/gen";
import { CityCouncilDistrictDropdown } from "./CityCouncilDistrictDropdown";
import { userEvent } from "@testing-library/user-event";
import { act } from "react";

describe("CityCouncilDistrictDropdown", () => {
  let cityCouncilDistricts: Array<CityCouncilDistrict> = [];

  beforeAll(() => {
    cityCouncilDistricts = Array.from(Array(1), () =>
      createCityCouncilDistrict(),
    );
  });

  it("should have city council district form details and options", () => {
    const updateSearchParams = vi.fn();
    render(
      <CityCouncilDistrictDropdown
        updateSearchParams={updateSearchParams}
        cityCouncilDistricts={cityCouncilDistricts}
      />,
    );
    expect(screen.getByLabelText("District Number")).toBeInTheDocument();
    const firstCityCouncilDistrictId = cityCouncilDistricts[0].id;
    expect(screen.getByText(firstCityCouncilDistrictId)).toBeInTheDocument();
  });

  it("should set the search params when next district id is null", async () => {
    const updateSearchParams = vi.fn();
    const firstCityCouncilDistrictId = cityCouncilDistricts[0].id;
    render(
      <CityCouncilDistrictDropdown
        updateSearchParams={updateSearchParams}
        cityCouncilDistricts={cityCouncilDistricts}
        selectValue={firstCityCouncilDistrictId}
      />,
    );

    await act(() => userEvent.selectOptions(screen.getByRole("combobox"), ""));
    expect(updateSearchParams).toHaveBeenCalledWith({
      districtType: "ccd",
    });
  });

  it("should set the search params when next district id has a value", async () => {
    const updateSearchParams = vi.fn();
    const firstCityCouncilDistrictId = cityCouncilDistricts[0].id;
    render(
      <CityCouncilDistrictDropdown
        updateSearchParams={updateSearchParams}
        cityCouncilDistricts={cityCouncilDistricts}
      />,
    );

    await act(() =>
      userEvent.selectOptions(
        screen.getByRole("combobox"),
        firstCityCouncilDistrictId,
      ),
    );
    expect(updateSearchParams).toHaveBeenCalledWith({
      districtType: "ccd",
      districtId: firstCityCouncilDistrictId,
    });
  });
});
