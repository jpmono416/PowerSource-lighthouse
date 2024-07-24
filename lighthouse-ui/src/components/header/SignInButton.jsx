import { useAppContext } from "../../hooks/contexts/AppContext";
import Button from "../library/Button";
import Modal from "../library/Modal";
import UserDetailsForm from "../forms/authForms/UserDetailsForm";
import SignInForm from "../forms/authForms/SignInForm";

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

  const handleSuccessfulSignIn = async () => {
    setShowSignInSuccessMessage(true);
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
        <SignInForm onClose={onClose} onSuccess={handleSuccessfulSignIn} />
      )}
    </>
  );
}
