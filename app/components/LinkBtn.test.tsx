import { render, screen } from "@testing-library/react";
import { LinkBtn } from "./LinkBtn";

describe("LinkBtn", () => {
  it("should link to url while displaying text", () => {
    const testUrl = "test.com";
    const testText = "Test Text";
    render(<LinkBtn href={testUrl}>{testText}</LinkBtn>);
    screen.debug();
    expect(
      screen.getByRole("link", {
        name: "Test Text",
      }),
    ).toHaveAttribute("href", testUrl);
  });
});
