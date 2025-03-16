export async function uploadFile(file, setImageFileUrl, setImageFileUploading, dispatch, currentUser) {
  if (!file) return;

  setImageFileUploading(true);
  console.log("Uploading file:", file.name);

  try {
    // Prepare form data for Cloudinary
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mern-blog"); // Replace with your Cloudinary Upload Preset

    // Upload to Cloudinary
    const response = await fetch("https://api.cloudinary.com/v1_1/dgxzb3v77/image/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Cloudinary upload failed: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.secure_url) {
      throw new Error("Upload failed, no URL returned from Cloudinary.");
    }

    console.log("✅ File uploaded. Cloudinary URL:", data.secure_url);

    // Set the image URL in the state
    setImageFileUrl(data.secure_url);

    // Dispatch updateSuccess action to update Redux and LocalStorage
    const updatedUser = {
      ...currentUser,
      profilePicture: data.secure_url,
    };

    dispatch(updateSuccess(updatedUser)); // Update Redux state
    localStorage.setItem('user', JSON.stringify(updatedUser)); // Update LocalStorage

  } catch (error) {
    console.error("❌ Error in Cloudinary upload:", error);
  } finally {
    setImageFileUploading(false); // Ensure this always runs
  }
}
