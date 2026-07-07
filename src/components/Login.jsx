import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

import { authService } from "../appwrite";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from ".";

function Login() {
  // Initialize navigation, Redux and form state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: {
      // errors,
      isValid,
    },
  } = useForm({
    mode: "onChange",
  });

  // Store login error and loading state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Authenticate the user
  const handleLogin = async (data) => {
    setLoading(true);
    setError("");

    try {
      const session = await authService.login(data);

      if (session) {
        const userData = await authService.getCurrentUser();

        if (userData) {
          dispatch(
            authLogin({
              $id: userData.$id,
              name: userData.name,
              email: userData.email,
            }),
          );
        }

        navigate("/");
      }
    } catch (error) {
      setError(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full items-center justify-center">
      <div className="relative mx-auto w-full max-w-lg rounded-xl border border-black/10 bg-gray-100 p-10">
        {/* Header */}
        <div className="mb-2 flex justify-center">
          <Logo className="text-lg font-bold" />
        </div>

        <h2 className="text-center text-2xl font-bold">
          Sign in to your account
        </h2>

        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="text-primary font-medium transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {/* Display login error */}
        {error && (
          <p className="mt-8 text-center text-red-600">&#9888; {error}</p>
        )}

        {/* Login form */}
        <form noValidate className="mt-8" onSubmit={handleSubmit(handleLogin)}>
          <div className="space-y-5">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              readOnly={loading}
              {...register("email", {
                setValueAs: (value) => value.trim(),
                required: "Email is required",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Enter a valid email address",
                },
              })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              readOnly={loading}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
            />

            <Button
              type="submit"
              disabled={!isValid || loading}
              className="mt-8 w-full rounded-xl py-2 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {loading ? "Logging..." : "Log In"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
