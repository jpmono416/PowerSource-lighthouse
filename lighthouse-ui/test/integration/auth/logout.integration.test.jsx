import { act, fireEvent, screen } from "@testing-library/react";
import { beforeEach, expect } from "vitest";

import {
  cleanUpForModal,
  mockPromise,
  renderWithRouter,
  setUpForModal,
} from "../../test.utils";
import App from "../../../src/App";
import * as authenticationService from "../../../src/services/authentication.service";

vi.mock("../../../src/routers/LighthouseRouter");
vi.mock("../../../src/services/authentication.service");

describe("Log out integration tests: ", () => {
  let logOutButton;
  let signOutPromise;
  let signOutResolver;
  let signOutRejecter;

  beforeEach(async () => {
    setUpForModal();
    [signOutPromise, signOutResolver, signOutRejecter] = mockPromise();
    authenticationService.signOut.mockReturnValueOnce(signOutPromise);
    authenticationService.getActiveUser.mockReturnValue({
      emailAddress: "testuser@email.com",
    });

    renderWithRouter(<App />, "/");
    logOutButton = screen.getByText(/log-out/i);
  });

  afterEach(() => {
    cleanUpForModal();
    vi.resetAllMocks();
  });

  //?US4-INT-1
  test("It should make a call to the authentication service", async () => {
    //Act
    await act(async () => {
      fireEvent.click(logOutButton);
    });
    //Assert
    expect(authenticationService.signOut).toBeCalledTimes(1);
  });

  //?US4-INT-2
  test("It should show a loading spinner when the authentication service is loading", async () => {
    //Act
    await act(async () => {
      fireEvent.click(logOutButton);
    });
    //Assert
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  //?US4-INT-3
  test("It should display an error modal where the auth service throws an error", async () => {
    //Act
    await act(async () => {
      fireEvent.click(logOutButton);
      signOutRejecter("test error message");
    });
    //Assert
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  //?US4-INT-4
  test("It should show Register and Sign-In Buttons after successful log out", async () => {
    //Act
    await act(async () => {
      fireEvent.click(logOutButton);
      signOutResolver();
    });
    //Assert
    expect(screen.getByText(/register/i)).toBeInTheDocument();
    expect(screen.getByText(/sign-in/i)).toBeInTheDocument();
  });

  //?US4-INT-5
  test("It should close the error modal when the close button is clicked", async () => {
    //Arrange
    const testErrorMessage = "testErrorMessage";
    //Act
    await act(async () => {
      fireEvent.click(logOutButton);
      signOutRejecter(testErrorMessage);
    });
    await act(async () => {
      fireEvent.click(screen.getByLabelText(/close/i));
    });
    //Assert
    expect(screen.queryByText(testErrorMessage)).toBeNull();
  });
});
