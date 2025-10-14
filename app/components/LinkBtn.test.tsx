import { render, screen } from "@testing-library/react";
import { LinkBtn } from "./LinkBtn";

describe("LinkBtn", () => {
  it("should link to url while displaying text", () => {
    const testUrl = "test.com";
    const testText = "Test Text";
    render(<LinkBtn href={testUrl}>{testText}</LinkBtn>);
    expect(
      screen.getByRole("link", {
        name: "Test Text",
      }),
    ).toHaveAttribute("href", testUrl);
  });
});
