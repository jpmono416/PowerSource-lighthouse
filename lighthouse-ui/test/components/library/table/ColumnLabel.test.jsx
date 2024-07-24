import { render, screen } from "@testing-library/react";
import { beforeEach, expect } from "vitest";

import ColumnLabel from "../../../../src/components/library/table/ColumnLabel";

import * as tableTestData from "../../../data/table.test.data";

describe("Column Label tests: ", () => {
  const testTableConfig = tableTestData.testConfig;
  const testColumn = testTableConfig.columns[0];

  describe("Where column is not the first element tests: ", () => {
    beforeEach(() => {
      render(
        <table>
          <thead>
            <tr>
              <ColumnLabel column={testColumn} padX={0} />
            </tr>
          </thead>
        </table>
      );
    });

    test("It should display the column label in a cell", () => {
      //Assert
      expect(screen.getByText(testColumn.label)).toBeInTheDocument();
    });

    test("It should display a left border where the column is not the first element", () => {
      //Act
      const actualColumnLabel = screen.getByText(testColumn.label);
      const actualClasses = Array.from(actualColumnLabel.classList).toString();
      //Assert
      expect(actualClasses).toMatch(/border-l/);
    });
  });

  describe("Where column is the first element tests: ", () => {
    beforeEach(() => {
      render(
        <table>
          <thead>
            <tr>
              <ColumnLabel column={testColumn} padX={0} isFirstElement />
            </tr>
          </thead>
        </table>
      );
    });

    test("It should not display a left border where the column is the first element", () => {
      //Act
      const actualColumnLabel = screen.getByText(testColumn.label);
      const actualClasses = Array.from(actualColumnLabel.classList).toString();
      //Assert
      expect(actualClasses).not.toMatch(/border-l/);
    });
  });
});
