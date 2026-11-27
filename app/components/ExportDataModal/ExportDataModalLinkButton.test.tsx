import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StreetscapeProvider } from "@nycplanning/streetscape";
import { ExportDataModalLinkButton } from "./ExportDataModalLinkButton";

describe("ExportDataModalLinkButton", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("starts an export when clicked", async () => {
    const user = userEvent.setup();
    const downloadLink = "/export.csv";
    const fetchMock = vi.fn().mockResolvedValue({ ok: false });
    vi.stubGlobal("fetch", fetchMock);

    render(
      <StreetscapeProvider>
        <ExportDataModalLinkButton
          downloadLink={downloadLink}
          zeroTotalRecords={false}
        />
      </StreetscapeProvider>,
    );

    await user.click(screen.getByRole("button", { name: /Export selection/ }));

    expect(fetchMock).toHaveBeenCalledWith(downloadLink);
  });
});
