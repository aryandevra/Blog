import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";

import { login, logout } from "./store/authSlice";
import { useDocumentTitle } from "./hooks";
import { authService } from "./appwrite";
import { Footer, Header, Loader, ScrollToTop } from "./components";

function App() {
  // Set the document title
  useDocumentTitle("Blog");

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  // Check the user's authentication status on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await authService.getCurrentUser();

        if (userData) {
          dispatch(
            login({
              $id: userData.$id,
              name: userData.name,
              email: userData.email,
            }),
          );
        } else {
          dispatch(logout());
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  // Show a loading indicator while checking authentication
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-100">
      <ScrollToTop />
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;
