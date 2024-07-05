import { render, screen } from "@testing-library/react";
import { CommunityDistrictDropdown } from "./CommunityDistrictDropdown";
import { CommunityDistrict, createCommunityDistrict } from "~/gen";
import RandExp from "randexp";
import userEvent from "@testing-library/user-event";

describe("CommunityDistrictDropdown", () => {
  let communityDistricts: Array<CommunityDistrict> = [];
  const boroughId = "1";
  beforeAll(() => {
    communityDistricts = Array.from(Array(5), () =>
      createCommunityDistrict({
        id: new RandExp("^([0-9]{2})$").gen(),
        boroughId,
      }),
    );
  });

  it("should render community district form details and options", () => {
    const updateSearchParams = vi.fn();
    render(
      <CommunityDistrictDropdown
        boroughId={boroughId}
        updateSearchParams={updateSearchParams}
        communityDistricts={communityDistricts}
      />,
    );

    expect(screen.getByLabelText("District Number")).toBeInTheDocument();
    const firstCommunityDistrictId = communityDistricts[0].id;
    expect(screen.getByText(firstCommunityDistrictId)).toBeInTheDocument();
  });

  it("should set search params when borough is null", async () => {
    const updateSearchParams = vi.fn();
    const firstCommunityDistrictId = communityDistricts[0].id;
    render(
      <CommunityDistrictDropdown
        boroughId={null}
        updateSearchParams={updateSearchParams}
        selectValue={firstCommunityDistrictId}
        communityDistricts={communityDistricts}
      />,
    );

    await userEvent.selectOptions(screen.getByRole("combobox"), "");
    expect(updateSearchParams).toHaveBeenCalledWith({ districtType: "cd" });
  });

  it("should set search params when nextDistrictID is empty", async () => {
    const updateSearchParams = vi.fn();
    const firstCommunityDistrictId = communityDistricts[0].id;
    console.debug("fcd", firstCommunityDistrictId);
    render(
      <CommunityDistrictDropdown
        boroughId={boroughId}
        updateSearchParams={updateSearchParams}
        selectValue={firstCommunityDistrictId}
        communityDistricts={communityDistricts}
      />,
    );

    await userEvent.selectOptions(screen.getByRole("combobox"), "");
    expect(updateSearchParams).toHaveBeenCalledWith({
      districtType: "cd",
      boroughId,
    });
  });

  it("should set search params when nextDistrictID has a value", async () => {
    const updateSearchParams = vi.fn();
    const firstCommunityDistrictId = communityDistricts[0].id;
    render(
      <CommunityDistrictDropdown
        boroughId={boroughId}
        updateSearchParams={updateSearchParams}
        selectValue={null}
        communityDistricts={communityDistricts}
      />,
    );

    await userEvent.selectOptions(
      screen.getByRole("combobox"),
      firstCommunityDistrictId,
    );
    expect(updateSearchParams).toHaveBeenCalledWith({
      districtType: "cd",
      boroughId,
      districtId: firstCommunityDistrictId,
    });
  });
});
