import { Alert, Button, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateStart, updateSuccess, updateFailure, signoutSuccess } from '../redux/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { uploadFile } from '../utils2/uploadFile';
import { CircularProgress } from '@mui/material';

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(currentUser?.profilePicture || '/default-avatar.png');
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
      await uploadFile(file, setImageFileUrl, setImageFileUploading, dispatch, currentUser);
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
      setUpdateUserError('No changes made');
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError('Please wait for image to upload');
      return;
    }

    try {
      setIsUpdating(true);
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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
        localStorage.setItem('user', JSON.stringify(data));
        setUpdateUserSuccess("User's profile updated successfully 🎉");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;

    try {
      await fetch(`/api/user/delete/${currentUser._id}`, { method: 'DELETE' });
      dispatch(updateSuccess(null));
      localStorage.removeItem('user');
      navigate('/sign-up');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const handleSignOut = () => {
    if (!window.confirm("Are you sure you want to sign out?")) return;

    dispatch(signoutSuccess());
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/sign-in', { replace: true });
  };

  return (
    <div className=' mx-auto p-6 w-full bg-white dark:bg-gray-900 rounded-xl shadow-md transition-all duration-300'>
      <h1 className='my-7 text-center font-semibold text-3xl text-gray-900 dark:text-white'>Profile</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='file' accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden />

        <div
          className={`relative w-32 h-32 self-center cursor-pointer rounded-full shadow-md overflow-hidden transition-all duration-300
          ${imageFileUploading ? 'pointer-events-none opacity-50' : 'hover:scale-105 hover:shadow-xl'}`}
          onClick={() => !imageFileUploading && filePickerRef.current.click()}
        >
          {imageFileUploading ? (
            <div className="flex items-center justify-center w-full h-full bg-gray-200 dark:bg-gray-700 rounded-full">
              <CircularProgress size={64} />
            </div>
          ) : (
            <img
              src={imageFileUrl}
              alt='user'
              className='rounded-full w-full h-full object-cover border-4 border-gray-300 dark:border-gray-600'
            />
          )}
        </div>

        <TextInput type='text' id='username' placeholder='Username' defaultValue={currentUser.username} onChange={handleChange} className='h-14 dark:text-white dark:shadow-none' />
        <TextInput type='email' id='email' placeholder='Email' defaultValue={currentUser.email} onChange={handleChange} className='h-14 dark:text-white dark:shadow-none' />
        <TextInput type='password' id='password' placeholder='Password' onChange={handleChange} className='h-14  dark:text-white dark:shadow-none' />

        {updateUserSuccess && <Alert color="green">{updateUserSuccess}</Alert>}
        {updateUserError && <Alert color="red">{updateUserError}</Alert>}

        <Button type="submit" gradientDuoTone="purpleToPink" className="w-full transition transform hover:scale-105 active:scale-95" disabled={isUpdating}>
          {isUpdating ? <CircularProgress size={24} color="inherit" /> : 'Update'}
        </Button>

        {currentUser.isAdmin && (
          <Link to={'/create-post'}>
            <Button type="button" gradientDuoTone="purpleToPink" className="w-full transition transform hover:scale-105 active:scale-95">
              Create a post
            </Button>
          </Link>
        )}
      </form>

      <div className='flex justify-between text-red-600 font-semibold mt-4'>
        <div className='cursor-pointer hover:underline' onClick={handleSignOut}>
          Sign Out
        </div>
        <div className='cursor-pointer hover:underline' onClick={handleDeleteUser}>
          Delete Account
        </div>
      </div>
    </div>
  );
}
