import { expect, test } from "vitest";
import FilterValidator from "../../../src/utils/validators/FilterValidator";

describe("Filter validator tests: ", () => {
  test("It should return true where from predates to", () => {
    //Arrange
    const testValidator = new FilterValidator();
    testValidator.setFrom("2024-01-01");
    testValidator.setTo("2024-01-02");
    //Assert
    expect(testValidator.isValid()[0]).toBe(true);
    expect(testValidator.validateFrom()[0]).toBe(true);
  });

  test("It should return an error where from postdates to", () => {
    //Arrange
    const testValidator = new FilterValidator();
    testValidator.setFrom("2024-01-02");
    testValidator.setTo("2024-01-01");
    //Assert
    expect(testValidator.isValid()[0]).toBe(false);
    expect(testValidator.validateFrom()[0]).toBe(false);
  });

  test("It should correctly set values in the constructor", () => {
    //Arrange
    const testValidator = new FilterValidator("2024-01-01", "2024-01-02");
    //Assert
    expect(testValidator.isValid()[0]).toBe(true);
    expect(testValidator.validateFrom()[0]).toBe(true);
  });
});
