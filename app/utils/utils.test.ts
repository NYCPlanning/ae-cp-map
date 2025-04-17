import {
  handleCommitmentTotalsInputs,
  checkCommitmentTotalInputsAreValid,
} from "./utils";

describe("handleCommitmentTotalsInputs", () => {
  it("should return the defaults when passed null min and max", async () => {
    const result = handleCommitmentTotalsInputs(null, null);
    expect(result.commitmentsTotalMinInputValue === "").toBe(true);
    expect(result.commitmentsTotalMaxInputValue === "").toBe(true);
    expect(result.commitmentsTotalMinSelectValue === "K").toBe(true);
    expect(result.commitmentsTotalMaxSelectValue === "K").toBe(true);
  });

  it("should return the defaults when passed an empty string for min and max", async () => {
    const result = handleCommitmentTotalsInputs("", "");
    expect(result.commitmentsTotalMinInputValue === "").toBe(true);
    expect(result.commitmentsTotalMaxInputValue === "").toBe(true);
    expect(result.commitmentsTotalMinSelectValue === "K").toBe(true);
    expect(result.commitmentsTotalMaxSelectValue === "K").toBe(true);
  });

  it("should return the defaults when passed 0 min and max", async () => {
    const result = handleCommitmentTotalsInputs("0", "0");
    expect(result.commitmentsTotalMinInputValue === "").toBe(true);
    expect(result.commitmentsTotalMaxInputValue === "").toBe(true);
    expect(result.commitmentsTotalMinSelectValue === "K").toBe(true);
    expect(result.commitmentsTotalMaxSelectValue === "K").toBe(true);
  });

  it("should return the defaults when passed values between 0 and 1000", async () => {
    const result = handleCommitmentTotalsInputs("1", "999.9999");
    expect(result.commitmentsTotalMinInputValue === "").toBe(true);
    expect(result.commitmentsTotalMaxInputValue === "").toBe(true);
    expect(result.commitmentsTotalMinSelectValue === "K").toBe(true);
    expect(result.commitmentsTotalMaxSelectValue === "K").toBe(true);
  });

  it("should return the defaults when passed values between -1000 and 0", async () => {
    const result = handleCommitmentTotalsInputs("-999.9999", "-1");
    expect(result.commitmentsTotalMinInputValue === "").toBe(true);
    expect(result.commitmentsTotalMaxInputValue === "").toBe(true);
    expect(result.commitmentsTotalMinSelectValue === "K").toBe(true);
    expect(result.commitmentsTotalMaxSelectValue === "K").toBe(true);
  });

  it("should return the correct values when passed values between 1000 and 1000000", async () => {
    const result = handleCommitmentTotalsInputs("2000", "12345.67");
    expect(result.commitmentsTotalMinInputValue === "2").toBe(true);
    expect(result.commitmentsTotalMaxInputValue === "12.34567").toBe(true);
    expect(result.commitmentsTotalMinSelectValue === "K").toBe(true);
    expect(result.commitmentsTotalMaxSelectValue === "K").toBe(true);
  });

  it("should return the correct values when passed values between -1000000 and -1000", async () => {
    const result = handleCommitmentTotalsInputs("-12345.67", "-2000");
    expect(result.commitmentsTotalMinInputValue === "-12.34567").toBe(true);
    expect(result.commitmentsTotalMaxInputValue === "-2").toBe(true);
    expect(result.commitmentsTotalMinSelectValue === "K").toBe(true);
    expect(result.commitmentsTotalMaxSelectValue === "K").toBe(true);
  });

  it("should return the correct values when passed values between 1000000 and 1000000000", async () => {
    const result = handleCommitmentTotalsInputs("2000000", "12345678");
    expect(result.commitmentsTotalMinInputValue === "2").toBe(true);
    expect(result.commitmentsTotalMaxInputValue === "12.345678").toBe(true);
    expect(result.commitmentsTotalMinSelectValue === "M").toBe(true);
    expect(result.commitmentsTotalMaxSelectValue === "M").toBe(true);
  });

  it("should return the correct values when passed values between -1000000000 and -1000000", async () => {
    const result = handleCommitmentTotalsInputs("-12345678", "-2000000");
    expect(result.commitmentsTotalMinInputValue === "-12.345678").toBe(true);
    expect(result.commitmentsTotalMaxInputValue === "-2").toBe(true);
    expect(result.commitmentsTotalMinSelectValue === "M").toBe(true);
    expect(result.commitmentsTotalMaxSelectValue === "M").toBe(true);
  });

  it("should return the correct values when passed values greater than 1000000000", async () => {
    const result = handleCommitmentTotalsInputs("2000000000", "123456780000");
    expect(result.commitmentsTotalMinInputValue === "2").toBe(true);
    expect(result.commitmentsTotalMaxInputValue === "123.45678").toBe(true);
    expect(result.commitmentsTotalMinSelectValue === "B").toBe(true);
    expect(result.commitmentsTotalMaxSelectValue === "B").toBe(true);
  });

  it("should return the correct values when passed values less than -1000000000", async () => {
    const result = handleCommitmentTotalsInputs("-123456780000", "-2000000000");
    expect(result.commitmentsTotalMinInputValue === "-123.45678").toBe(true);
    expect(result.commitmentsTotalMaxInputValue === "-2").toBe(true);
    expect(result.commitmentsTotalMinSelectValue === "B").toBe(true);
    expect(result.commitmentsTotalMaxSelectValue === "B").toBe(true);
  });

  it("should return the incorrect input values when passed some values with decimals due to JS float issues", async () => {
    const result = handleCommitmentTotalsInputs("1234.56", "12345.6789");
    expect(result.commitmentsTotalMinInputValue === "1.23456").toBe(false);
    expect(result.commitmentsTotalMinInputValue === "1.2345599999999999").toBe(
      true,
    );
    expect(result.commitmentsTotalMaxInputValue === "12.3456789").toBe(false);
    expect(result.commitmentsTotalMaxInputValue === "12.345678900000001").toBe(
      true,
    );
    expect(result.commitmentsTotalMinSelectValue === "K").toBe(true);
    expect(result.commitmentsTotalMaxSelectValue === "K").toBe(true);
  });
});

describe("checkCommitmentTotalInputsAreValid", () => {
  it("should return true for default state", async () => {
    const result = checkCommitmentTotalInputsAreValid({
      commitmentsTotalMinInputValue: "",
      commitmentsTotalMaxInputValue: "",
      commitmentsTotalMinSelectValue: "K",
      commitmentsTotalMaxSelectValue: "K",
    });
    expect(result).toBe(true);
  });

  it("should return true when select values have changed and inputs are blank", async () => {
    const result = checkCommitmentTotalInputsAreValid({
      commitmentsTotalMinInputValue: "",
      commitmentsTotalMaxInputValue: "",
      commitmentsTotalMinSelectValue: "B",
      commitmentsTotalMaxSelectValue: "M",
    });
    expect(result).toBe(true);
  });

  it("should return true when only a minimum has been input", async () => {
    const result = checkCommitmentTotalInputsAreValid({
      commitmentsTotalMinInputValue: "1",
      commitmentsTotalMaxInputValue: "",
      commitmentsTotalMinSelectValue: "K",
      commitmentsTotalMaxSelectValue: "K",
    });
    expect(result).toBe(true);
  });

  it("should return true when only a maximum has been input", async () => {
    const result = checkCommitmentTotalInputsAreValid({
      commitmentsTotalMinInputValue: "",
      commitmentsTotalMaxInputValue: "1",
      commitmentsTotalMinSelectValue: "K",
      commitmentsTotalMaxSelectValue: "K",
    });
    expect(result).toBe(true);
  });

  it("should return true when MinInput < MaxInput and MinSelect = MaxSelect", async () => {
    const result = checkCommitmentTotalInputsAreValid({
      commitmentsTotalMinInputValue: "1",
      commitmentsTotalMaxInputValue: "2",
      commitmentsTotalMinSelectValue: "K",
      commitmentsTotalMaxSelectValue: "K",
    });
    expect(result).toBe(true);
  });

  it("should return false when MinInput > MaxInput and MinSelect = MaxSelect", async () => {
    const result = checkCommitmentTotalInputsAreValid({
      commitmentsTotalMinInputValue: "2",
      commitmentsTotalMaxInputValue: "1",
      commitmentsTotalMinSelectValue: "K",
      commitmentsTotalMaxSelectValue: "K",
    });
    expect(result).toBe(false);
  });

  it("should return true when MinInput = MaxInput and MinSelect '<' MaxSelect", async () => {
    const result = checkCommitmentTotalInputsAreValid({
      commitmentsTotalMinInputValue: "1",
      commitmentsTotalMaxInputValue: "1",
      commitmentsTotalMinSelectValue: "K",
      commitmentsTotalMaxSelectValue: "M",
    });
    expect(result).toBe(true);
  });

  it("should return false when MinInput = MaxInput and MinSelect '>' MaxSelect", async () => {
    const result = checkCommitmentTotalInputsAreValid({
      commitmentsTotalMinInputValue: "1",
      commitmentsTotalMaxInputValue: "1",
      commitmentsTotalMinSelectValue: "M",
      commitmentsTotalMaxSelectValue: "K",
    });
    expect(result).toBe(false);
  });

  it("should return true when MinInput < MaxInput, both are negative, and MinSelect = MaxSelect", async () => {
    const result = checkCommitmentTotalInputsAreValid({
      commitmentsTotalMinInputValue: "-2",
      commitmentsTotalMaxInputValue: "-1",
      commitmentsTotalMinSelectValue: "K",
      commitmentsTotalMaxSelectValue: "K",
    });
    expect(result).toBe(true);
  });

  it("should return false when MinInput > MaxInput, both are negative, and MinSelect = MaxSelect", async () => {
    const result = checkCommitmentTotalInputsAreValid({
      commitmentsTotalMinInputValue: "-1",
      commitmentsTotalMaxInputValue: "-2",
      commitmentsTotalMinSelectValue: "K",
      commitmentsTotalMaxSelectValue: "K",
    });
    expect(result).toBe(false);
  });

  it("should return true when MinInput < MaxInput and MinInput is negative", async () => {
    const result = checkCommitmentTotalInputsAreValid({
      commitmentsTotalMinInputValue: "-200",
      commitmentsTotalMaxInputValue: "1",
      commitmentsTotalMinSelectValue: "B",
      commitmentsTotalMaxSelectValue: "K",
    });
    expect(result).toBe(true);
  });

  it("should return true when MinInput > MaxInput and MaxInput is negative", async () => {
    const result = checkCommitmentTotalInputsAreValid({
      commitmentsTotalMinInputValue: "200",
      commitmentsTotalMaxInputValue: "-1",
      commitmentsTotalMinSelectValue: "B",
      commitmentsTotalMaxSelectValue: "K",
    });
    expect(result).toBe(false);
  });
});
