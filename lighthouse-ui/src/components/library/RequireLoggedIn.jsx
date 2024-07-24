import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAppContext } from "../../hooks/contexts/AppContext";
import SignInForm from "../forms/authForms/SignInForm";

export default function RequireLoggedIn({ children }) {
  const { activeUser } = useAppContext();
  const navigate = useNavigate();

  const handleClose = (options) => {
    if (!options?.isSuccess) navigate("/");
  };

  const handleSuccess = async () => {
    toast.success("You have been signed in");
  };

  return (
    <>
      {!activeUser && (
        <SignInForm onClose={handleClose} onSuccess={handleSuccess} />
      )}
      {children}
    </>
  );
}
