import cloudinary from "../utils/cloudinaryConfig.js";

export const streamUpload = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "articles" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      },
    );
    stream.end(fileBuffer);
  });
};
