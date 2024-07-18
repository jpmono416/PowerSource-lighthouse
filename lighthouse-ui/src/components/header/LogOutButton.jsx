import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useAppContext } from "../../hooks/contexts/AppContext";
import Button from "../library/Button";
import { useEffect } from "react";

export default function LogOutButton() {
  const {
    authenticationIsLoading,
    signOutUser,
    authenticationErrors,
    handleClearErrors,
    lastActionName,
  } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticationErrors || lastActionName !== "signOut") return;
    toast.error("Sorry, there has been an error", {
      onClose: handleClearErrors,
    });
  });

  const handleLogOut = async () => {
    const isLoggedOut = await signOutUser();
    if (isLoggedOut) {
      navigate("/");
      toast.success("You have been logged out");
    }
  };

  return (
    <Button onClick={handleLogOut} isLoading={authenticationIsLoading}>
      Log-Out
    </Button>
  );
}
