import React, { useState } from "react";
import { Label, TextInput, Alert } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }

    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.message || "Signup failed!");
        setLoading(false);
        return;
      }

      setSuccessMessage("Account created successfully!");
      setLoading(false);
      navigate("/sign-in");
    } catch (error) {
      setErrorMessage(error.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 px-4">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700 flex flex-col md:flex-row">
        
        {/* Left Section - Branding */}
        <div className="md:w-1/2 flex flex-col justify-center items-center text-center p-10">
          <Link to="/" className="text-4xl font-bold dark:text-white">
            <span className="px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              TECH-Blog
            </span>
          </Link>
          <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">
            Sign up with your email and password
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">
            Or sign up with Google.
          </p>
        </div>

        {/* Right Section - Form */}
        <div className="md:w-1/2 flex flex-col justify-center p-10">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-6">
            Create an Account
          </h2>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div>
              <Label className="text-lg dark:text-gray-300" value="Username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                required
                onChange={handleChange}
                className="py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 transition-all duration-200 shadow-sm"
              />
            </div>
            <div>
              <Label className="text-lg dark:text-gray-300" value="Email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                required
                onChange={handleChange}
                className="py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 transition-all duration-200 shadow-sm"
              />
            </div>
            <div className="relative">
              <Label className="text-lg dark:text-gray-300" value="Password" />
              <TextInput
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                id="password"
                required
                onChange={handleChange}
                className="py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 transition-all duration-200 shadow-sm pr-12"
              />
              <button
                type="button"
                className="absolute right-3 bottom-2 text-gray-600 dark:text-gray-300 p-1"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>

            {/* Sign Up Button */}
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
                "Sign Up"
              )}
            </button>
            <OAuth />
          </form>

          {/* Success and Error Messages */}
          {successMessage && (
            <Alert className="mt-4" color="success">
              {successMessage}
            </Alert>
          )}
          {errorMessage && (
            <Alert className="mt-4" color="failure">
              {errorMessage}
            </Alert>
          )}

          {/* Already have an account? */}
          <div className="flex justify-center gap-2 text-lg mt-6 text-gray-700 dark:text-gray-300">
            <span>Already have an account?</span>
            <Link to="/sign-in" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
