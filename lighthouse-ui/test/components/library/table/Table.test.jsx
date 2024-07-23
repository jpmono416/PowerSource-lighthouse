import { screen } from "@testing-library/react";
import { beforeEach, expect } from "vitest";

import { renderWithRouter } from "../../../test.utils";
import Table from "../../../../src/components/library/table/Table";

import * as tableTestData from "../../../data/table.test.data";

describe("Table tests: ", () => {
  const testData = tableTestData.rowData;
  const testTableConfig = tableTestData.testConfig;
  const testNoElementsMessage = "Test no elements message";

  describe("Loading state tests: ", () => {
    beforeEach(() => {
      renderWithRouter(
        <Table
          config={testTableConfig}
          data={testData}
          isLoading
          noElementsMessage={testNoElementsMessage}
        />,
        "/"
      );
    });

    test("It should display a loading spinner when data is loading", () => {
      //Assert
      expect(screen.getByLabelText(/loading spinner/)).toBeInTheDocument();
    });
  });

  describe("Loaded state tests: ", () => {
    beforeEach(() => {
      renderWithRouter(
        <Table
          config={testTableConfig}
          data={testData}
          noElementsMessage={testNoElementsMessage}
        />,
        "/"
      );
    });

    test("It should display all column labels", () => {
      //Assert
      testTableConfig.columns.forEach((testColumn) => {
        expect(screen.getByText(testColumn.label)).toBeInTheDocument();
      });
    });

    test("It should display all column rows", () => {
      //Arrange
      const expected = testData.length;
      //Assert
      expect(screen.getAllByRole("row")).toHaveLength(expected);
    });
  });

  describe("Empty data tests: ", () => {
    beforeEach(() => {
      renderWithRouter(
        <Table
          config={testTableConfig}
          data={[]}
          noElementsMessage={testNoElementsMessage}
        />,
        "/"
      );
    });

    test("It should display the correct message where data is empty", () => {
      //Assert
      expect(screen.getByText(testNoElementsMessage)).toBeInTheDocument();
    });
  });
});
