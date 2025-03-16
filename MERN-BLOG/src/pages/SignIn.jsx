import React, { useState } from "react";
import { Label, TextInput, Alert } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }

    dispatch(signInStart());
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(signInFailure(data.message || "Invalid credentials"));
        return;
      }

      dispatch(signInSuccess(data));
      setSuccessMessage("Logged in successfully! Redirecting...");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      dispatch(signInFailure("An error occurred. Please try again."));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 px-4">
      <div className="p-12 max-w-5xl w-full min-h-[75vh] bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-300 dark:border-gray-700 flex flex-col md:flex-row">
        
        {/* Left Section - Branding */}
        <div className="md:w-1/2 flex flex-col justify-center items-center text-center p-10">
          <Link to="/" className="text-4xl font-bold dark:text-white">
            <span className="px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              TECH-Blog
            </span>
          </Link>
          <p className="text-lg text-gray-700 mt-4 dark:text-gray-300">
            Sign in with your email and password
          </p>
          <p className="text-lg text-gray-700 mt-4 dark:text-gray-300">
            Or use Google for quick access.
          </p>
        </div>

        {/* Right Section - Form */}
        <div className="md:w-1/2 flex flex-col justify-center p-10">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-6">
            Sign In
          </h2>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            
            <div className="relative">
              <Label className="text-lg dark:text-gray-300" value="Your Email" />
              <div className="relative border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <TextInput
                  type="email"
                  placeholder="name@company.com"
                  id="email"
                  required
                  onChange={handleChange}
                  className="w-full py-3 px-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 border-none"
                />
              </div>
            </div>
            
            <div className="relative">
              <Label className="text-lg dark:text-gray-300" value="Your Password" />
              <div className="relative border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <TextInput
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  id="password"
                  required
                  onChange={handleChange}
                  className="w-full py-3 px-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 border-none"
                />
                {/* Password Visibility Toggle */}
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300 p-2"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg px-5 py-3 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-pink-500/50"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></div>
                  <span className="pl-3">Loading...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
            <OAuth />
          </form>

          {/* Success Message */}
          {successMessage && (
            <Alert className="mt-4" color="success">
              {successMessage}
            </Alert>
          )}

          {/* Error Message from Redux */}
          {error && (
            <Alert className="mt-4" color="failure">
              {error}
            </Alert>
          )}

          {/* Sign Up Link */}
          <div className="flex justify-center gap-2 text-lg mt-6">
            <span className="text-gray-700 dark:text-gray-300">Don't have an account?</span>
            <Link to="/sign-up" className="text-blue-500 dark:text-blue-400 hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
