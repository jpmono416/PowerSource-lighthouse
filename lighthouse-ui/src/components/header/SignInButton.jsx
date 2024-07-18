import { useAppContext } from "../../hooks/contexts/AppContext";
import Button from "../library/Button";
import Modal from "../library/Modal";
import UserDetailsForm from "../forms/authForms/UserDetailsForm";

export default function SignInButton({
  onClick,
  doShowForm,
  onClose,
  setShowSignInSuccessMessage,
}) {
  const {
    signInUser,
    authenticationIsLoading,
    authenticationErrors,
    handleClearErrors,
  } = useAppContext();

  const handleSignIn = async (submission) => {
    const user = await signInUser(submission);
    if (!user) return;
    setShowSignInSuccessMessage(true);
    onClose();
  };

  return (
    <>
      <Button
        className="text-sm sm:text-base sm:tracking-wide"
        onClick={onClick}
      >
        SIGN-IN
      </Button>
      {doShowForm && (
        <Modal onClose={onClose}>
          <UserDetailsForm
            headingText="Sign-In"
            submitButtonText={"Submit"}
            onSubmit={handleSignIn}
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
    </>
  );
}
