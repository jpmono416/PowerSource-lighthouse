import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, expect } from "vitest";

import { cleanUpForModal, mockPromise, setUpForModal } from "../../test.utils";
import App from "../../../src/App";
import * as authenticationService from "../../../src/services/authentication.service";

vi.mock("react-router-dom");
vi.mock("../../../src/routers/LighthouseRouter");
vi.mock("../../../src/services/authentication.service");

describe("Sign in integration tests: ", () => {
  beforeEach(() => {
    setUpForModal();
    render(<App />);
  });

  afterEach(() => {
    cleanUpForModal();
    vi.resetAllMocks();
  });

  //? TEST:
  test("It should display a sign in form when the sign in button is clicked", async () => {
    //Arrange
    const signInButton = screen.queryByText(/sign-in/i);
    //Act
    await act(async () => {
      fireEvent.click(signInButton);
    });
    //assert
    expect(screen.getByTitle(/email address/i)).toBeInTheDocument();
    expect(screen.getByTitle(/^password/i)).toBeInTheDocument();
    expect(screen.queryByTitle(/username/i)).toBe(null);
    expect(screen.queryByTitle(/^confirm password/i)).toBe(null);
  });

  describe("Validation is turned off tests: ", () => {
    let emailAddressInput;
    let passwordInput;

    beforeEach(async () => {
      await act(async () => {
        fireEvent.click(screen.queryByText(/sign-in/i));
      });
      emailAddressInput = screen.getByTitle(/email address/i);
      passwordInput = screen.getByTitle(/^password/i);
      await act(async () => {
        fireEvent.change(emailAddressInput, {
          target: { value: "x" },
        });
        fireEvent.change(passwordInput, {
          target: { value: "x" },
        });
        fireEvent.blur(emailAddressInput);
        fireEvent.blur(passwordInput);
      });
    });

    //? TEST:
    test("It should not display validation errors", async () => {
      //assert
      expect(screen.queryByRole("alert")).toBe(null);
    });

    //? TEST:
    test("It should not disable submit where the values in the input fields would not pass validation", async () => {
      //arrange
      const submitButton = screen.getByTitle(/^submit/i);
      //Act
      await act(async () => {
        fireEvent.click(submitButton);
      });
      //assert
      expect(authenticationService.signIn).toBeCalledTimes(1);
    });
  });

  describe("Submission tests: ", () => {
    const testSubmission = {
      emailAddress: "lou@vu.com",
      password: "StephanieSays1$",
    };
    let emailAddressInput;
    let passwordInput;
    let submitButton;
    let signInPromise;
    let signInResolver;
    let signInRejecter;

    beforeEach(async () => {
      [signInPromise, signInResolver, signInRejecter] = mockPromise();
      authenticationService.signIn.mockReturnValueOnce(signInPromise);

      await act(async () => {
        fireEvent.click(screen.queryByText(/sign-in/i));
      });
      submitButton = screen.getByTitle(/^submit/i);
      emailAddressInput = screen.getByTitle(/email address/i);
      passwordInput = screen.getByTitle(/^password/i);
      await act(async () => {
        fireEvent.change(emailAddressInput, {
          target: { value: testSubmission.emailAddress },
        });
        fireEvent.change(passwordInput, {
          target: { value: testSubmission.password },
        });
      });
    });

    //? TEST:
    test("It should make a call to the authentication service with the correct arguments on submit", async () => {
      //Act
      await act(async () => {
        fireEvent.click(submitButton);
      });
      //Assert
      expect(authenticationService.signIn).toBeCalledWith(testSubmission);
    });

    //? TEST:
    test("It should show a loading spinner when the authentication service is loading", async () => {
      //Act
      await act(async () => {
        fireEvent.click(submitButton);
      });
      //Assert
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    //? TEST:
    test("It should display the error where the authentication service returns an error", async () => {
      //Arrange
      const expected = "test error message";
      //Act
      await act(async () => {
        fireEvent.click(submitButton);
        signInRejecter(expected);
      });
      //Assert
      expect(screen.getByText(expected)).toBeInTheDocument();
    });

    //? TEST:
    test("It should display all errors where the authentication service returns multiple errors", async () => {
      //Arrange
      const testErrors = [
        { msg: "error message 1" },
        { msg: "error message 2" },
      ];
      //Act
      await act(async () => {
        fireEvent.click(submitButton);
        signInRejecter(testErrors);
      });
      //Assert
      expect(screen.getByText(testErrors[0].msg)).toBeInTheDocument();
      expect(screen.getByText(testErrors[1].msg)).toBeInTheDocument();
    });

    //? TEST:
    test("It should display display a success message where the authentication service resolves", async () => {
      //Act
      await act(async () => fireEvent.click(submitButton));
      await act(async () => signInResolver({}));
      //Assert
      expect(screen.getByText(/you have been signed in/i)).toBeInTheDocument();
    });

    //? TEST:
    test("It should close the sign in form modal when the close button is pressed", async () => {
      //Act
      await act(async () => {
        fireEvent.click(submitButton);
        signInResolver({});
      });
      const closeButton = screen.getByLabelText("close");
      await act(async () => {
        fireEvent.click(closeButton);
      });
      const registrationForm = screen.queryByRole("form");
      //Assert
      expect(registrationForm).toBeNull;
    });
  });
});
