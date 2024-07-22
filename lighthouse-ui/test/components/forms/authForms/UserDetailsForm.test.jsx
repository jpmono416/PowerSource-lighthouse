import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach } from "vitest";

import UserDetailsForm from "../../../../src/components/forms/authForms/UserDetailsForm";

describe("User details form tests: ", () => {
  const testHeadingText = "Test heading text";
  const testSubmitButtonText = "Test submit button text";

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("General tests: ", () => {
    const testActiveFieldsConfig = {
      userName: true,
    };

    describe("Initial render tests: ", () => {
      beforeEach(() => {
        render(
          <UserDetailsForm
            headingText={testHeadingText}
            submitButtonText={testSubmitButtonText}
            activeFields={testActiveFieldsConfig}
          />
        );
      });

      //? TEST:
      test("It should display the correct heading text", () => {
        //Assert
        expect(screen.queryByText(testHeadingText)).toBeInTheDocument();
      });

      //? TEST:
      test("It should display the correct submit button text", () => {
        //Assert
        expect(screen.queryByText(testSubmitButtonText)).toBeInTheDocument();
      });
    });

    describe("Loading state tests: ", () => {
      beforeEach(() => {
        render(
          <UserDetailsForm
            headingText={testHeadingText}
            submitButtonText={testSubmitButtonText}
            activeFields={{
              userName: true,
              emailAddress: true,
              password: true,
              confirmPassword: true,
            }}
            isLoading
          />
        );
      });

      //? TEST:
      test("It should show a loading spinner when the isLoading prop is true", () => {
        //Assert
        expect(screen.queryByRole("status")).toBeInTheDocument();
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
      let clearErrorsSpy;

      beforeEach(() => {
        clearErrorsSpy = vi.fn(() => null);
        render(
          <UserDetailsForm
            headingText={testHeadingText}
            submitButtonText={testSubmitButtonText}
            activeFields={{
              userName: true,
              emailAddress: true,
              password: true,
              confirmPassword: true,
            }}
            errors={testErrors}
            handleClearErrors={clearErrorsSpy}
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

      //? TEST:
      test("It should call clearErrors after an update to a text box where the errors prop is provided", async () => {
        //Act
        const input = screen.queryAllByRole("textbox")[0];
        await act(async () => {
          fireEvent.change(input, {
            target: { value: "x" },
          });
        });
        //Assert
        expect(clearErrorsSpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("Registration form configuration tests: ", () => {
    const testRegistrationFormConfig = {
      username: true,
      email: true,
      password: true,
      confirmPassword: true,
    };
    const expectedSubmission = {
      username: "test-username",
      email: "test@email.com",
      password: "password12$",
    };
    let onSubmitSpy;
    let usernameInputField;
    let emailAddressInputField;
    let passwordInputField;
    let confirmPasswordInputField;

    beforeEach(() => {
      onSubmitSpy = vi.fn(() => null);
      render(
        <UserDetailsForm
          headingText={testHeadingText}
          submitButtonText={testSubmitButtonText}
          activeFields={testRegistrationFormConfig}
          onSubmit={onSubmitSpy}
        />
      );
      usernameInputField = screen.getByTitle(/username/i);
      emailAddressInputField = screen.getByTitle(/email address/i);
      passwordInputField = screen.getByTitle(/^password/i);
      confirmPasswordInputField = screen.getByTitle(/^confirm password/i);
    });

    afterEach(() => {
      usernameInputField = null;
      emailAddressInputField = null;
      passwordInputField = null;
      confirmPasswordInputField = null;
    });

    //? TEST:
    test("It should display the correct fields for registration when correct config prop provided", () => {
      //Assert
      expect(usernameInputField).toBeInTheDocument();
      expect(emailAddressInputField).toBeInTheDocument();
      expect(passwordInputField).toBeInTheDocument();
      expect(confirmPasswordInputField).toBeInTheDocument();
    });

    describe("On submit tests: ", () => {
      beforeEach(async () => {
        await act(async () => {
          fireEvent.change(usernameInputField, {
            target: { value: expectedSubmission.username },
          });
          fireEvent.change(emailAddressInputField, {
            target: { value: expectedSubmission.email },
          });
          fireEvent.change(passwordInputField, {
            target: { value: expectedSubmission.password },
          });
          fireEvent.change(confirmPasswordInputField, {
            target: { value: expectedSubmission.password },
          });
        });
      });

      //? TEST:
      test("It should call onSubmit with the correct details when the submit button is clicked", async () => {
        //Arrange
        const submitButton = screen.getByTitle("Submit");
        //Act
        await act(async () => {
          fireEvent.click(submitButton);
        });
        //Assert
        expect(onSubmitSpy).toBeCalledWith(expectedSubmission);
      });

      //? TEST:
      test("It should disable submit when one or more fields are not validated", async () => {
        //Arrange
        const form = screen.queryByRole("form");
        //Act
        await act(async () => {
          fireEvent.change(confirmPasswordInputField, {
            target: { value: "invalidValue" },
          });
          fireEvent.submit(form);
        });
        //Assert
        expect(onSubmitSpy).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe("Sign-In form configuration tests: ", () => {
    const testSignInFormConfig = {
      email: true,
      password: true,
    };
    const expectedSubmission = {
      email: "test@email.com",
      password: "password12$",
    };
    let onSubmitSpy;
    let emailAddressInputField;
    let passwordInputField;

    beforeEach(() => {
      onSubmitSpy = vi.fn(() => null);
      render(
        <UserDetailsForm
          headingText={testHeadingText}
          submitButtonText={testSubmitButtonText}
          activeFields={testSignInFormConfig}
          onSubmit={onSubmitSpy}
          doSkipValidation
        />
      );
      emailAddressInputField = screen.getByTitle(/email address/i);
      passwordInputField = screen.getByTitle(/^password/i);
    });

    afterEach(() => {
      emailAddressInputField = null;
      passwordInputField = null;
    });

    //? TEST:
    test("It should display the correct fields for registration when correct config prop provided", async () => {
      //Assert
      expect(emailAddressInputField).toBeInTheDocument();
      expect(passwordInputField).toBeInTheDocument();
      expect(screen.queryByText(/username/i)).toBe(null);
      expect(screen.queryByText(/^confirm password/i)).toBe(null);
    });

    //? TEST:
    test("It should call onSubmit with the correct details when the submit button is clicked", async () => {
      //Arrange
      const submitButton = screen.getByTitle("Submit");
      //Act
      await act(async () => {
        fireEvent.change(emailAddressInputField, {
          target: { value: expectedSubmission.email },
        });
        fireEvent.change(passwordInputField, {
          target: { value: expectedSubmission.password },
        });
        fireEvent.click(submitButton);
      });
      //Assert
      expect(onSubmitSpy).toBeCalledWith(expectedSubmission);
    });
  });
});
