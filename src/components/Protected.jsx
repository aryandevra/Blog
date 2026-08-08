import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router';
import toast from 'react-hot-toast';

const Protected = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const authStatus = useSelector(state => state.auth.status);

  // Redirect users based on their authentication status
  useEffect(() => {
    // Wait until authStatus is definitively true or false (not undefined/null/loading)
    if (authStatus === undefined || authStatus === null) {
      return;
    }

    if (authentication && authStatus !== authentication) {
      toast.error('Please log in to access this page');
      navigate('/login', { replace: true });
    } else if (!authentication && authStatus !== authentication) {
      navigate('/', { replace: true });
    }
  }, [authStatus, authentication, navigate]);

  // Render children if passed directly, otherwise render the nested route via Outlet
  return children ? children : <Outlet />;
};

export default Protected;
