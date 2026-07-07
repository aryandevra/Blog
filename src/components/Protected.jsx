import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  // Redirect users based on their authentication status
  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login", { replace: true });
    } else if (!authentication && authStatus !== authentication) {
      navigate("/", { replace: true });
    }
  }, [authStatus, authentication, navigate]);

  return children;
}

export default Protected;
