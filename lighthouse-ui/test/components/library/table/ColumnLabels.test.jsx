import { render, screen } from "@testing-library/react";
import { beforeEach, expect } from "vitest";

import ColumnLabels from "../../../../src/components/library/table/ColumnLabels";

import * as tableTestData from "../../../data/table.test.data";

describe("Column Labels tests: ", () => {
  const testTableConfig = tableTestData.testConfig;
  const testColumns = testTableConfig.columns;

  beforeEach(() => {
    render(
      <table>
        <thead>
          <tr>
            <ColumnLabels columnConfig={testColumns} padX={0} />
          </tr>
        </thead>
      </table>
    );
  });

  test("It should display all column labels", () => {
    //Assert
    testColumns.forEach((testColumn) => {
      expect(screen.getByText(testColumn.label)).toBeInTheDocument();
    });
  });
});
