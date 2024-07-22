import { act, fireEvent, screen } from "@testing-library/react";
import { beforeEach } from "vitest";

import Rows from "../../../../src/components/library/table/Rows";
import Skeleton from "../../../../src/components/library/table/Skeleton";

import * as tableTestData from "../../../data/table.test.data";
import { renderWithRouter } from "../../../test.utils";

vi.mock("../../../../src/components/library/table/Skeleton");

describe("Row cells tests: ", () => {
  const testRowData = tableTestData.rowData;
  const testTableConfig = tableTestData.testConfig;

  describe("Data has loaded with one or more rows test: ", () => {
    beforeEach(() => {
      renderWithRouter(
        <table>
          <tbody>
            <Rows
              rowData={testRowData}
              columns={testTableConfig.columns}
              padX={0}
              getKey={testTableConfig.getRowKey}
              getLink={testTableConfig.getRowLink}
            />
          </tbody>
        </table>,
        "/"
      );
    });

    //?Test
    test("It should display all rows", () => {
      //Arrange
      const expectedRowCount = testRowData.length;
      //Assert
      expect(screen.getAllByRole("row")).toHaveLength(expectedRowCount);
    });

    //?Test
    test("It should display all cells", () => {
      //Arrange
      const expectedCellCount =
        testRowData.length * testTableConfig.columns.length;
      //Assert
      expect(screen.getAllByRole("cell")).toHaveLength(expectedCellCount);
      expect(screen.getByText(testRowData[0].field1)).toBeInTheDocument();
      expect(screen.getByText(testRowData[0].field2)).toBeInTheDocument();
      expect(screen.getByText(testRowData[1].field1)).toBeInTheDocument();
      expect(screen.getByText(testRowData[1].field2)).toBeInTheDocument();
    });

    //?Test
    test("It should navigate to the correct location when a row is selected", async () => {
      //Arrange
      const testRow = testRowData[0];
      const cellToClick = screen.getByText(testRow.field1);
      const expectedLocation = testTableConfig.getRowLink(testRow);
      //Act
      await act(async () => {
        fireEvent.click(cellToClick);
      });
      //Assert
      expect(screen.getByTestId("pageNavigatedTo").dataset.location).toBe(
        expectedLocation
      );
    });
  });

  describe("Data has loaded with one or more rows test: ", () => {
    const testNoElementsMessage = "Test no elements message";
    beforeEach(() => {
      renderWithRouter(
        <table>
          <tbody>
            <Rows
              rowData={[]}
              columns={testTableConfig.columns}
              padX={0}
              getKey={testTableConfig.getRowKey}
              getLink={testTableConfig.getRowLink}
              noElementsMessage={testNoElementsMessage}
            />
          </tbody>
        </table>,
        "/"
      );
    });

    //?Test
    test("It should display a message where no elements found", () => {
      //Assert
      expect(screen.getByText(testNoElementsMessage)).toBeInTheDocument();
    });
  });

  describe("Data has loaded with one or more rows test: ", () => {
    const testNoElementsMessage = "Test no elements message";
    beforeEach(() => {
      renderWithRouter(
        <table>
          <tbody>
            <Rows isLoading columns={testTableConfig.columns} />
          </tbody>
        </table>,
        "/"
      );
    });

    //?Test
    test("It should display a message where no elements found", () => {
      //Assert
      expect(Skeleton).toHaveBeenCalled();
    });
  });
});
