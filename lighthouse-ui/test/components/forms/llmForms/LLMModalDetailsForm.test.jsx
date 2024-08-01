import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect } from "vitest";

import LLMModalDetailsForm from "../../../../src/components/forms/llmForms/modal/LLMModalDetailsForm";

describe("LLM Modal details form tests: ", () => {
  const testSubmission = {
    name: "test name",
    description: "A short description",
    modality: "text",
    organization: "SomeOrg",
    created_date: "2024-01-01",
    access: "open",
    license: "MIT",
    perceived_business_value: "50",
    business_readiness: "25",
  };

  const testSubmitButtonText = "Test submit button text";

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("General tests: ", () => {
    describe("Initial render tests: ", () => {
      beforeEach(() => {
        render(<LLMModalDetailsForm submitButtonText={testSubmitButtonText} />);
      });

      //? TEST:
      test("It should display the correct submit button text", () => {
        //Assert
        expect(screen.queryByText(testSubmitButtonText)).toBeInTheDocument();
      });

      //? TEST:
      test("It should display the correct fields", () => {
        //Assert
        expect(screen.getByTitle(/name/i)).toBeInTheDocument();
        expect(screen.getByTitle(/organisation/i)).toBeInTheDocument();
        expect(screen.getByTitle(/created at/i)).toBeInTheDocument();
        expect(screen.getByTitle(/description/i)).toBeInTheDocument();
        expect(screen.getByTitle(/modality/i)).toBeInTheDocument();
        expect(screen.getByTitle(/access/i)).toBeInTheDocument();
        expect(screen.getByTitle(/licence/i)).toBeInTheDocument();
        expect(
          screen.getByTitle(/perceived business value/i)
        ).toBeInTheDocument();
        expect(screen.getByTitle(/business readiness/i)).toBeInTheDocument();
      });
    });
  });

  describe("Loading state tests: ", () => {
    beforeEach(() => {
      render(
        <LLMModalDetailsForm
          submitButtonText={testSubmitButtonText}
          isLoading
        />
      );
    });

    //? TEST:
    test("It should show disable all inputs when the isLoading prop is true", () => {
      //Assert
      const inputs = screen.queryAllByRole("textbox");
      expect(inputs.every((input) => input.disabled)).toBeTruthy();
    });
  });

  describe("Error state tests: ", () => {
    const testErrors = ["Test error1", "Test error 2"];

    beforeEach(() => {
      render(
        <LLMModalDetailsForm
          submitButtonText={testSubmitButtonText}
          errors={testErrors}
        />
      );
    });

    //? TEST:
    test("It should show errors where a list of errors are passed as a prop", () => {
      //Assert
      expect(screen.queryByText(testErrors[0])).toBeInTheDocument();
      expect(screen.queryByText(testErrors[1])).toBeInTheDocument();
    });

    //? TEST:
    test("It should disable the submit button when there are errors", () => {
      //Assert
      const submitButton = screen.queryByText(testSubmitButtonText);
      expect(submitButton.disabled).toEqual(true);
    });
  });

  describe("Default value tests: ", () => {
    //? TEST:
    test("It should populate inputs with default values", () => {
      //Act
      render(
        <LLMModalDetailsForm
          submitButtonText={testSubmitButtonText}
          defaultValues={testSubmission}
        />
      );
      //Assert
      expect(screen.getByDisplayValue(testSubmission.name)).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(testSubmission.organization)
      ).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(testSubmission.created_date)
      ).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(testSubmission.description)
      ).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(testSubmission.modality)
      ).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(testSubmission.access)
      ).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(testSubmission.license)
      ).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(testSubmission.perceived_business_value)
      ).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(testSubmission.business_readiness)
      ).toBeInTheDocument();
    });

    test("It should show errors on render where force show errors is true", () => {
      //Arrange
      const submissionWithErrors = { ...testSubmission, name: "" };
      //Act
      render(
        <LLMModalDetailsForm
          submitButtonText={testSubmitButtonText}
          defaultValues={submissionWithErrors}
          forceShowValidationErrors
        />
      );
      //Assert
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
  });

  describe("Submission tests: ", () => {
    let onSubmitSpy;
    let nameInput;
    let organisationInput;
    let createdAtInput;
    let descriptionInput;
    let modalityInput;
    let accessInput;
    let licenceInput;
    let perceivedBusinessValueInput;
    let businessReadinessInput;

    beforeEach(async () => {
      onSubmitSpy = vi.fn(() => null);
      render(
        <LLMModalDetailsForm
          submitButtonText={testSubmitButtonText}
          onSubmit={onSubmitSpy}
        />
      );

      nameInput = screen.getByTitle(/name/i, { selector: "input" });
      organisationInput = screen.getByTitle(/organisation/i);
      createdAtInput = screen.getByTitle(/created at/i);
      descriptionInput = screen.getByTitle(/description/i);
      modalityInput = screen.getByTitle(/modality/i);
      accessInput = screen.getByTitle(/access/i);
      licenceInput = screen.getByTitle(/licence/i);
      perceivedBusinessValueInput = screen.getByTitle(
        /perceived business value/i
      );
      businessReadinessInput = screen.getByTitle(/business readiness/i);

      await act(async () => {
        fireEvent.change(nameInput, {
          target: { value: testSubmission.name },
        });
        fireEvent.change(organisationInput, {
          target: { value: testSubmission.organization },
        });
        fireEvent.change(createdAtInput, {
          target: { value: testSubmission.created_date },
        });
        fireEvent.change(descriptionInput, {
          target: { value: testSubmission.description },
        });
        fireEvent.change(modalityInput, {
          target: { value: testSubmission.modality },
        });
        fireEvent.change(accessInput, {
          target: { value: testSubmission.access },
        });
        fireEvent.change(licenceInput, {
          target: { value: testSubmission.license },
        });
        fireEvent.change(perceivedBusinessValueInput, {
          target: { value: testSubmission.perceived_business_value },
        });
        fireEvent.change(businessReadinessInput, {
          target: { value: testSubmission.business_readiness },
        });
      });
    });

    afterEach(() => {
      nameInput = null;
      organisationInput = null;
      createdAtInput = null;
      descriptionInput = null;
      modalityInput = null;
      accessInput = null;
      licenceInput = null;
      perceivedBusinessValueInput = null;
      businessReadinessInput = null;
    });

    //? TEST:
    test("It should display the correct fields for registration when correct config prop provided", async () => {
      //Arrange
      const expected = testSubmission;
      const submitButton = screen.getByText(testSubmitButtonText);
      //Act
      await act(async () => {
        fireEvent.click(submitButton);
      });
      //Assert
      expect(onSubmitSpy).toBeCalledWith(expected);
    });

    test("It should disable submit when one or more fields are not validated", async () => {
      //Act
      await act(async () => {
        fireEvent.change(nameInput, {
          target: { value: "" },
        });
      });
      //Assert
      expect(screen.getByText(testSubmitButtonText)).toBeDisabled();
    });

    test("It should not call on submit when one or more fields are not validated", async () => {
      //Act
      await act(async () => {
        fireEvent.change(nameInput, {
          target: { value: "" },
        });
      });
      await act(async () => {
        fireEvent.submit(screen.getByRole("form"));
      });
      //Assert
      expect(onSubmitSpy).not.toBeCalled();
    });

    test("It should not include empty optional fields in the submission", async () => {
      //Arrange
      const expected = { ...testSubmission };
      delete expected.perceived_business_value;
      //Act
      await act(async () => {
        fireEvent.change(perceivedBusinessValueInput, {
          target: { value: "" },
        });
      });
      await act(async () => {
        fireEvent.submit(screen.getByRole("form"));
      });
      //Assert
      expect(onSubmitSpy).toBeCalledWith(expected);
    });
  });
});
