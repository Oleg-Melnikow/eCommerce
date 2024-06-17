import { checkAddressType } from "../helpers/checkAddressType";

describe("Test hepler functions", () => {
  it("Should pass with valid data for login form", () => {
    const arrayId = ["aI12yAq", "yLae1091"];
    expect(checkAddressType(arrayId, "aI12yAq")).toBe(true);
    expect(checkAddressType(arrayId, "1")).toBe(false);
  });
});
