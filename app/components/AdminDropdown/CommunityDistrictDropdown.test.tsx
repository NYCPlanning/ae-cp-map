import { render, screen } from "@testing-library/react";
import { CommunityDistrictDropdown } from "./CommunityDistrictDropdown";
import { CommunityDistrict, createCommunityDistrict } from "~/gen";
import { userEvent } from "@testing-library/user-event";
import { act } from "react";

describe("CommunityDistrictDropdown", () => {
  let communityDistricts: Array<CommunityDistrict> = [];
  const boroughId = "1";
  beforeAll(() => {
    communityDistricts = Array.from(Array(1), () =>
      createCommunityDistrict({
        boroughId,
      }),
    );
  });

  it("should render community district form details and options", () => {
    const setAdminParams = vi.fn();
    render(
      <CommunityDistrictDropdown
        boroughId={boroughId}
        setAdminParams={setAdminParams}
        communityDistricts={communityDistricts}
      />,
    );

    expect(screen.getByLabelText("District Number")).toBeInTheDocument();
    const firstCommunityDistrictId = communityDistricts[0].id;
    expect(screen.getByText(firstCommunityDistrictId)).toBeInTheDocument();
  });

  it("should set search params when borough is null", async () => {
    const setAdminParams = vi.fn();
    const firstCommunityDistrictId = communityDistricts[0].id;
    render(
      <CommunityDistrictDropdown
        boroughId={null}
        setAdminParams={setAdminParams}
        selectValue={firstCommunityDistrictId}
        communityDistricts={communityDistricts}
      />,
    );

    await act(() => userEvent.selectOptions(screen.getByRole("combobox"), ""));
    expect(setAdminParams).toHaveBeenCalledWith({
      districtType: "cd",
      boroughId: null,
      districtId: null,
    });
  });

  it("should set search params when nextDistrictID is empty", async () => {
    const setAdminParams = vi.fn();
    const firstCommunityDistrictId = communityDistricts[0].id;

    render(
      <CommunityDistrictDropdown
        boroughId={boroughId}
        setAdminParams={setAdminParams}
        selectValue={firstCommunityDistrictId}
        communityDistricts={communityDistricts}
      />,
    );

    await act(() => userEvent.selectOptions(screen.getByRole("combobox"), ""));
    expect(setAdminParams).toHaveBeenCalledWith({
      districtType: "cd",
      boroughId,
      districtId: null,
    });
  });

  it("should set search params when nextDistrictID has a value", async () => {
    const setAdminParams = vi.fn();
    const firstCommunityDistrictId = communityDistricts[0].id;
    render(
      <CommunityDistrictDropdown
        boroughId={boroughId}
        setAdminParams={setAdminParams}
        selectValue={null}
        communityDistricts={communityDistricts}
      />,
    );

    await act(() =>
      userEvent.selectOptions(
        screen.getByRole("combobox"),
        firstCommunityDistrictId,
      ),
    );
    expect(setAdminParams).toHaveBeenCalledWith({
      districtType: "cd",
      boroughId,
      districtId: firstCommunityDistrictId,
    });
  });
});
