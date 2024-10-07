import { v2 as cloudinary } from "cloudinary";
import config from "../config";
import fs from "fs";
export interface UploadResult {
  secure_url: string;
}

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret,
});

export const uploadImageToCloudinary = async (image: string, path: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, function (error, result) {
      if (error) {
        reject(error);
      }
      resolve(result);
      fs.unlink(path, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("File deleted successfully");
      });
    });
  });
};

export const deleteImageToCloudinary = async (image: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(image, function (error, result) {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};
