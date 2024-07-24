import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAppContext } from "../../hooks/contexts/AppContext";
import Modal from "./Modal";
import SuccessToast from "./SuccessToast";
import UserDetailsForm from "../header/UserDetailsForm";

export default function RequireLoggedIn({ children }) {
  const [showSignInSuccessModal, setShowSignInSuccessModal] = useState(false);
  const {
    activeUser,
    signInUser,
    authenticationIsLoading,
    authenticationErrors,
    handleClearErrors,
  } = useAppContext();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  const onSubmit = async (submission) => {
    const user = await signInUser(submission);
    if (user) setShowSignInSuccessModal(true);
  };

  return (
    <>
      {!activeUser && (
        <Modal onClose={handleClose}>
          <UserDetailsForm
            headingText="Sign-In"
            submitButtonText={"Submit"}
            onSubmit={onSubmit}
            isLoading={authenticationIsLoading}
            errors={authenticationErrors}
            handleClearErrors={handleClearErrors}
            doSkipValidation
            activeFields={{
              emailAddress: true,
              password: true,
            }}
          />
        </Modal>
      )}
      {showSignInSuccessModal && (
        <SuccessToast
          onClose={() => setShowSignInSuccessModal(false)}
          message={"You have been signed-in"}
          displayFor={3000}
        />
      )}
      {children}
    </>
  );
}
