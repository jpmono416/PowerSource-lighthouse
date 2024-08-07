import { act, fireEvent, screen } from "@testing-library/react";
import { beforeEach, describe, expect } from "vitest";

import GartnerQuadrant from "../../../../src/components/library/gartnerQuadrant/GartnerQuadrant";
import testDataPoints from "../../../data/matrixDataPoints.test.data";
import { renderWithRouter } from "../../../test.utils";

describe("Gartner Quadrant tests: ", () => {
  const testXAxisLabel = "Test x-Axis Label";
  const testYAxisLabel = "Test y-Axis Label";
  const testLocation = "/";

  beforeEach(() => {
    renderWithRouter(
      <GartnerQuadrant
        dataPoints={testDataPoints}
        xAxisLabel={testXAxisLabel}
        yAxisLabel={testYAxisLabel}
      />,
      testLocation
    );
  });

  test("It should render x and y axis labels", () => {
    //Assert
    expect(
      screen.getByText(new RegExp(testXAxisLabel, "i"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(testYAxisLabel, "i"))
    ).toBeInTheDocument();
  });

  test("It should render model points", () => {
    //Assert
    expect(screen.getByText(testDataPoints[0].name)).toBeInTheDocument();
    expect(screen.getByText(testDataPoints[1].name)).toBeInTheDocument();
    expect(screen.getByText(testDataPoints[2].name)).toBeInTheDocument();
  });

  test("It should navigate to the correct link when a data point is clicked", async () => {
    //Arrange
    const testDataPoint = testDataPoints[0];
    const testDataPointEl = screen.getByText(testDataPoint.name);
    const expectedLocation = testDataPoint.link;
    //Act
    await act(async () => fireEvent.click(testDataPointEl));
    //Assert
    expect(screen.getByTestId("pageNavigatedTo").dataset.location).toBe(
      expectedLocation
    );
  });

  test("It should stay in the same location if a data point without a link is clicked", async () => {
    //Arrange
    const testDataPoint = testDataPoints[2];
    const testDataPointEl = screen.getByText(testDataPoint.name);
    const expectedLocation = testLocation;
    //Act
    await act(async () => fireEvent.click(testDataPointEl));
    //Assert
    expect(screen.getByTestId("pageNavigatedTo").dataset.location).toBe(
      expectedLocation
    );
  });
});
