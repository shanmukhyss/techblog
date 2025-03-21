import { useState } from 'react';
import { Button, FileInput, Select, TextInput, Alert } from 'flowbite-react';
import { CircularProgress, TextareaAutosize } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { uploadFile } from '../utils2/uploadFile';

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Upload Image Handler
  const handleUploadImage = async () => {
    if (!file) {
      setImageUploadError('Please select an image');
      return;
    }

    setImageUploadError(null);
    setImageUploadProgress(50);

    try {
      await uploadFile(file, 
        (url) => {
          setFormData({ ...formData, image: url });
          setImageUploadProgress(null);
        },
        (isUploading) => {
          setImageUploadProgress(isUploading ? 50 : null);
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
    }
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        setPublishError(data.message);
        setLoading(false);
        return;
      }

      setPublishError(null);
      setLoading(false);
      navigate(`/post/${data.slug}`);
    } catch (error) {
      setPublishError('Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="p-5 w-full max-w-full  min-h-[calc(100vh-4rem-8rem)] transition-all duration-300 bg-white dark:bg-gray-900">
      <h1 className="text-center text-3xl my-7 font-semibold text-gray-800 dark:text-gray-100">
        Create a Post
      </h1>
      
      <form className="flex flex-col gap-6 bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md transition-all duration-300" onSubmit={handleSubmit}>
        
        {/* Title & Category */}
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm"
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <Select
            className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm"
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>

        {/* Image Upload */}
        <div className="flex gap-4 items-center justify-between border-4 border-dotted p-4 rounded-lg border-gray-400 dark:border-gray-600">
          <FileInput
            type="file"
            accept="image/*"
            className="dark:text-gray-300"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
            onClick={handleUploadImage}
            disabled={imageUploadProgress !== null}
          >
            {imageUploadProgress !== null ? (
              <>
                <CircularProgress size={20} className="text-white" />
                Uploading...
              </>
            ) : (
              <>
                📤 Upload Image
              </>
            )}
          </Button>
        </div>

        {/* Upload Error Message */}
        {imageUploadError && <Alert severity="error">{imageUploadError}</Alert>}

        {/* Display Uploaded Image */}
        {formData.image && (
          <img
            src={formData.image}
            alt="Uploaded"
            className="w-full h-72 object-cover rounded-lg shadow-sm"
          />
        )}

        {/* Content Textarea */}
        <TextareaAutosize
          minRows={6}
          placeholder="Write something..."
          className="border p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
          required
          onChange={(e) => {
            setFormData({ ...formData, content: e.target.value });
          }}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <CircularProgress size={20} className="text-white" />
              Publishing...
            </>
          ) : (
            <>
              🚀 Publish Post
            </>
          )}
        </Button>

        {/* Publish Error Message */}
        {publishError && (
          <Alert className="mt-5" severity="error">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
