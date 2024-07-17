import { toast } from "react-toastify";
import { useState } from "react";

import { useAppContext } from "../../hooks/contexts/AppContext";
import LogOutButton from "./LogOutButton";
import RegisterButton from "./RegisterButton";
import SignInButton from "./SignInButton";
import SuccessfulRegistrationMessage from "./../forms/authForms/Successful RegistrationMessage";

export default function AuthenticationControls() {
  const modalWindows = {
    REGISTER: "register",
    SUCCESS_MESSAGE: "success",
    SIGN_IN: "sign-in",
  };
  const [activeModal, setActiveModal] = useState(null);
  const { activeUser } = useAppContext();

  const handleCloseModal = () => setActiveModal(null);

  const handleDismissSuccessMessage = (options) => {
    setActiveModal(options?.doShowSignInForm ? modalWindows.SIGN_IN : null);
  };

  const setShowSignInSuccessMessage = () => {
    toast.success("You have been signed in");
  };

  return (
    <>
      <div className="md:col-start-3 h-full flex flex-row gap-2 place-self-end items-center">
        {(!activeUser || activeModal) && (
          <>
            <RegisterButton
              onClick={() => setActiveModal(modalWindows.REGISTER)}
              doShowForm={activeModal === modalWindows.REGISTER}
              onClose={handleCloseModal}
              onSuccess={() => setActiveModal(modalWindows.SUCCESS_MESSAGE)}
            />
            <SignInButton
              onClick={() => setActiveModal(modalWindows.SIGN_IN)}
              doShowForm={activeModal === modalWindows.SIGN_IN}
              onClose={handleCloseModal}
              setShowSignInSuccessMessage={setShowSignInSuccessMessage}
            />
          </>
        )}
        {activeModal === modalWindows.SUCCESS_MESSAGE && (
          <SuccessfulRegistrationMessage
            onClose={handleDismissSuccessMessage}
          />
        )}
        {activeUser && !activeModal && <LogOutButton />}
      </div>
    </>
  );
}
