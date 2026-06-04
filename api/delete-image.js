import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    const { publicId } = req.body;

    const result =
      await cloudinary.uploader.destroy(publicId);

    return res.status(200).json(result);

  } catch (error) {

    return res.status(500).json({
      error: error.message
    });

  }

}