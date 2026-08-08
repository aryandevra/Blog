import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { authService } from '../../appwrite';
import { logout } from '../../store/authSlice';
import { Button } from '..';
import toast from 'react-hot-toast';

const LogoutBtn = ({
  bgColor = 'bg-white',
  textColor = 'text-black',
  className = '',
}) => {
  // Initialize Redux, navigation and error state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState('');

  // Handle user logout
  const logoutHandler = async () => {
    setError('');

    try {
      await authService.logout();

      dispatch(logout());

      toast.success('Logout successfully');
      navigate('/', { replace: true });
    } catch (error) {
      toast.error(error?.message || 'Something went wrong');
      setError(error?.message || 'Something went wrong');
    }
  };

  if (error) {
    return (
      <div className="fixed top-0 left-0 h-screen w-screen overflow-hidden bg-white p-4">
        <p className="text-base font-medium text-red-500">Error: {error}</p>
      </div>
    );
  }

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
    </>
  );
};

export default LogoutBtn;
