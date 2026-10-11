import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";

import { authService } from "../appwrite";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from ".";

const Signup = () => {
  // Initialize navigation, Redux and form state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  // Store signup error and loading state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Create a new account and update the application state
  const handleSignup = async data => {
    setLoading(true);
    setError("");

    try {
      const session = await authService.createAccount(data);

      if (session) {
        const userData = await authService.getCurrentUser();

        if (userData) {
          dispatch(
            authLogin({
              $id: userData.$id,
              name: userData.name,
              email: userData.email,
            })
          );
        }

        toast.success("Account created successfully!");
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
      setError(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative mx-auto w-full max-w-lg rounded-xl border border-black/10 bg-gray-100 p-10">
        {/* Authentication header */}
        <div className="mb-2 flex justify-center">
          <Logo className="text-lg font-bold" />
        </div>

        <h2 className="text-center text-2xl font-bold">
          Sign up to create an account
        </h2>

        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>

        {/* Display signup error */}
        {error && (
          <p className="mt-8 text-center text-red-600">&#9888; {error}</p>
        )}

        {/* Signup form */}
        <form noValidate className="mt-8" onSubmit={handleSubmit(handleSignup)}>
          <div className="space-y-5">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              readOnly={loading}
              {...register("name", {
                setValueAs: value => value.trim(),
                required: "Name is required",
                pattern: {
                  value: /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/,
                  message: "Enter a valid name",
                },
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
            />

            {errors.name && (
              <p className="-mt-4 text-sm text-red-500">
                &#9888; {errors.name.message}
              </p>
            )}

            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              readOnly={loading}
              {...register("email", {
                setValueAs: value => value.trim(),
                required: "Email is required",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Enter a valid email address",
                },
              })}
            />

            {errors.email && (
              <p className="-mt-4 text-sm text-red-500">
                &#9888; {errors.email.message}
              </p>
            )}

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

            {errors.password && (
              <p className="-mt-4 text-sm text-red-500">
                &#9888; {errors.password.message}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="mt-8 w-full rounded-xl py-2 hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
