export async function downloadFile(imageUrl, setImageFileUrl) {
  try {
    if (!imageUrl) {
      throw new Error("No image URL provided");
    }

    // Cloudinary URLs are already public, so we just set it directly
    setImageFileUrl(imageUrl);
    console.log("Image loaded successfully:", imageUrl);
  } catch (err) {
    console.error("Download failed", err);
  }
}

