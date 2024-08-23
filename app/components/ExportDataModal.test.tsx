import { fireEvent, render, screen } from "@testing-library/react";
import { ExportDataModal } from "./ExportDataModal";
import { act } from "react";

describe("Export Data Modal", () => {
  const geography = "Community District MN05";
  const fileName = "community_district_manhattan_05.csv";

  it("should have a button to open the modal", async () => {
    render(<ExportDataModal geography={geography} fileName={fileName} />);

    expect(screen.queryByText(/Data Export/)).not.toBeInTheDocument();
    await act(() => fireEvent.click(screen.getByText(/Export Data/)));
    expect(screen.getByText(/Data Export/)).toBeInTheDocument();
  });

  it("should show the current district", async () => {
    render(<ExportDataModal geography={geography} fileName={fileName} />);

    await act(() => fireEvent.click(screen.getByText(/Export Data/)));
    expect(screen.getByText(geography)).toBeInTheDocument();
  });

  it("should have a button to download the files", async () => {
    render(<ExportDataModal geography={geography} fileName={fileName} />);

    await act(() => fireEvent.click(screen.getByText(/Export Data/)));
    expect(
      screen.getByRole("link", {
        name: "Export Data",
      }),
    ).toHaveAttribute("href", expect.stringContaining(fileName));
  });

  it("should let user choose whether to download all districts", async () => {
    render(<ExportDataModal geography={geography} fileName={fileName} />);

    await act(() => fireEvent.click(screen.getByText(/Export Data/)));
    await act(() => fireEvent.click(screen.getByText(/Include all districts/)));
    expect(
      screen.getByRole("link", {
        name: "Export Data",
      }),
    ).toHaveAttribute(
      "href",
      expect.stringContaining("projects_in_geographies.zip"),
    );
  });
});
