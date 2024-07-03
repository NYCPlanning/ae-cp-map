import { loader } from "./root";
describe("App loader", () => {
  it.only("should return null data when on root path", async () => {
    const response = await loader({
      request: new Request(`http://example.com?districtType=cd`),
      params: {},
      context: {},
    });
    console.log("response", response);
  });
});
