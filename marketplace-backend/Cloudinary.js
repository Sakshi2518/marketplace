const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Cloudinary configuration
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Function to upload file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    try {
        // Check if the file exists
        if (!localFilePath || !fs.existsSync(localFilePath)) {
            console.log("File does not exist");
            return null;
        }

        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"  // Automatically determine the file type (image, video, etc.)
        });

        // Log the success message (optional)
        console.log("File successfully uploaded to Cloudinary:", response.secure_url);

        // Remove the local file after successful upload (async version)
        await fs.promises.unlink(localFilePath);

        // Return the Cloudinary response
        return response;

    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error.message);

        // Remove the local file in case of failure (async version)
        await fs.promises.unlink(localFilePath);

        // Return null to indicate failure
        return null;
    }
};

// Function to delete file from Cloudinary
const deleteFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        if (result.result !== 'ok') {
            console.log(`Error deleting image with public ID ${publicId}:`, result);
            return { success: false, message: 'Failed to delete image from Cloudinary' };
        }
        console.log(`Image with public ID ${publicId} deleted successfully`);
        return { success: true, message: 'Image deleted from Cloudinary' };
    } catch (error) {
        console.error("Error deleting file from Cloudinary:", error.message);
        return { success: false, message: error.message };
    }
};

module.exports = { uploadOnCloudinary, deleteFromCloudinary };
