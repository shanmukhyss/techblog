import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  signoutSuccess,
} from "../redux/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { uploadFile } from "../utils2/uploadFile";
import { CircularProgress } from "@mui/material";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(
    currentUser?.profilePicture || "/default-avatar.png"
  );
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [formData, setFormData] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.profilePicture) {
      setImageFileUrl(currentUser.profilePicture);
    }
  }, [currentUser]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      await uploadFile(
        file,
        setImageFileUrl,
        setImageFileUploading,
        dispatch,
        currentUser
      );
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    if (Object.keys(formData).length === 0 && !imageFile) {
      setUpdateUserError("No changes made");
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("Please wait for image to upload");
      return;
    }

    try {
      setIsUpdating(true);
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          profilePicture: imageFileUrl || currentUser.profilePicture,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        localStorage.setItem("user", JSON.stringify(data));
        setUpdateUserSuccess("User's profile updated successfully ");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteUser = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    )
      return;

    try {
      await fetch(`/api/user/delete/${currentUser._id}`, { method: "DELETE" });
      dispatch(updateSuccess(null));
      localStorage.removeItem("user");
      navigate("/sign-up");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const handleSignOut = () => {
    if (!window.confirm("Are you sure you want to sign out?")) return;

    dispatch(signoutSuccess());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/sign-in", { replace: true });
  };

  return (
    <div className="mx-0  p-8 w-full max-w-full max-h-full bg-white dark:bg-gray-900 shadow-lg transition-all duration-300">
      {/* Profile Header */}
      <h1 className="mb-6 text-center font-bold text-3xl text-gray-900 dark:text-white">
        Profile
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Profile Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className={`relative w-32 h-32 mx-auto cursor-pointer rounded-full shadow-lg overflow-hidden transition-transform duration-300 
      ${
        imageFileUploading
          ? "pointer-events-none opacity-50"
          : "hover:scale-105 hover:shadow-xl"
      }`}
          onClick={() => !imageFileUploading && filePickerRef.current.click()}
        >
          {imageFileUploading ? (
            <div className="flex items-center justify-center w-full h-full bg-gray-200 dark:bg-gray-700 rounded-full">
              <CircularProgress size={64} />
            </div>
          ) : (
            <img
              src={imageFileUrl}
              alt="User"
              className="w-full h-full object-cover rounded-full border-4 border-gray-300 dark:border-gray-600"
            />
          )}
        </div>

        {/* User Info Inputs */}
        <div className="flex flex-row justify-center ">
          <div className="space-y-4">
            <TextInput
              type="text"
              id="username"
              placeholder="Username"
              defaultValue={currentUser.username}
              onChange={handleChange}
              className="h-12 w-96 px-4 text-gray-900 dark:text-white border-none rounded-lg focus:ring-2 focus:ring-purple-500 transition-all"
            />

            <TextInput
              type="email"
              id="email"
              placeholder="Email"
              defaultValue={currentUser.email}
              onChange={handleChange}
              className="h-12 w-full max-w-md px-4 text-gray-900 dark:text-whiteborder-none rounded-lg focus:ring-2 focus:ring-purple-500 transition-all"
            />

            <TextInput
              type="password"
              id="password"
              placeholder="Password"
              onChange={handleChange}
              className="h-12 w-full max-w-md px-4 text-gray-900 dark:text-white border-none rounded-lg focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>
        </div>
        <div className="flex flex-row justify-center w-full ">
          {/* Success/Error Alerts */}
          {updateUserSuccess && (
            <Alert
              color="green"
              className="text-white max-w-md font-semibold p-3 rounded-md shadow-md bg-green-500 dark:bg-green-600 border border-green-700 dark:border-green-400"
            >
              {updateUserSuccess}
            </Alert>
          )}

          {updateUserError && (
            <Alert
              color="red"
              className="text-white  max-w-md font-semibold p-3 rounded-md shadow-md bg-red-500 dark:bg-red-600 border border-red-700 dark:border-red-400"
            >
              {updateUserError}
            </Alert>
          )}
        </div>
        <div className="flex flex-row justify-center">
          {/* Update Button */}
          <Button
            type="submit"
            gradientDuoTone="purpleToPink"
            className="w-full max-w-md  h-12 rounded-xl font-semibold transition-transform hover:scale-105 active:scale-95"
            disabled={isUpdating}
          >
            {isUpdating ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Update"
            )}
          </Button>
        </div>

        {/* Create Post (Admin Only) */}
        <div className="flex flex-row  justify-center">
          {currentUser.isAdmin && (
            <Link to="/create-post">
              <Button
                type="button"
                gradientDuoTone="purpleToPink"
                className="w-full h-12 rounded-xl font-semibold transition-transform hover:scale-105 active:scale-95"
              >
                Create a Post
              </Button>
            </Link>
          )}
        </div>
      </form>

      {/* Sign Out & Delete Account */}
      <div className="flex flex-row mx-auto max-w-md justify-between mt-6 text-red-600 font-semibold">
        <button
          onClick={handleSignOut}
          className="hover:underline transition-all"
        >
          Sign Out
        </button>
        <button
          onClick={handleDeleteUser}
          className="hover:underline transition-all"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
