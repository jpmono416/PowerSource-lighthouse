import { render, screen } from "@testing-library/react";
import { beforeEach } from "vitest";

import RowCells from "../../../../src/components/library/table/RowCells";

import * as tableTestData from "../../../data/table.test.data";

describe("Row cells tests: ", () => {
  const testRowData = tableTestData.rowData[0];
  const testTableConfig = tableTestData.testConfig;

  beforeEach(() => {
    render(
      <table>
        <tbody>
          <tr>
            <RowCells
              rowData={testRowData}
              columns={testTableConfig.columns}
              padX={0}
            />
          </tr>
        </tbody>
      </table>,
      "/"
    );
  });

  //?Test
  test("It should display all items in a row", () => {
    //Arrange
    const expectedColumnCount = testTableConfig.columns.length;
    //Assert
    expect(screen.getAllByRole("cell")).toHaveLength(expectedColumnCount);
    expect(screen.getByText(testRowData.field1)).toBeInTheDocument();
    expect(screen.getByText(testRowData.field2)).toBeInTheDocument();
    expect(screen.getByText(testRowData.field3)).toBeInTheDocument();
  });

  //?Test
  test("It should display a hyphen where getCol returns a falsy value ", () => {
    //Assert
    expect(screen.getByText("-")).toBeInTheDocument();
  });
});
