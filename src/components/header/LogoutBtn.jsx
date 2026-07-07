import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { authService } from "../../appwrite";
import { logout } from "../../store/authSlice";
import { Button } from "../index";

function LogoutBtn({
  bgColor = "bg-white",
  textColor = "text-black",
  className = "",
}) {
  // Initialize Redux, navigation and error state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  // Handle user logout
  const logoutHandler = async () => {
    setError("");

    try {
      await authService.logout();

      dispatch(logout());
      navigate("/", { replace: true });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Button
        bgColor={bgColor}
        textColor={textColor}
        className={className}
        onClick={logoutHandler}
      >
        Logout
      </Button>

      {/* Display logout error */}
      {error && (
        <p className="z-12 mt-2 text-center text-sm text-red-500">
          &#9888; {error}
        </p>
      )}
    </>
  );
}

export default LogoutBtn;
