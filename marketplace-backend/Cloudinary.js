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

module.exports = { uploadOnCloudinary };
