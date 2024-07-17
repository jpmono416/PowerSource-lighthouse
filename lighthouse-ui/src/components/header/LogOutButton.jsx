import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useAppContext } from "../../hooks/contexts/AppContext";
import Button from "../library/Button";

export default function LogOutButton() {
  const { authenticationIsLoading, signOutUser } = useAppContext();
  const navigate = useNavigate();

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
