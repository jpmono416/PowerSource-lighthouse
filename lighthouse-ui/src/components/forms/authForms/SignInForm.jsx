import { useAppContext } from "../../../hooks/contexts/AppContext";
import Modal from "../../library/Modal";
import UserDetailsForm from "./UserDetailsForm";

export default function SignInForm({ onClose, onSuccess }) {
  const {
    signInUser,
    authenticationIsLoading,
    authenticationErrors,
    handleClearErrors,
  } = useAppContext();

  const handleSignIn = async (submission) => {
    const user = await signInUser(submission);
    if (!user) return;
    onSuccess();
    onClose({ isSuccess: true });
  };

  return (
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
          email: true,
          password: true,
        }}
      />
    </Modal>
  );
}
