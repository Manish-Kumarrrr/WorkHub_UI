import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  const { image } = await request.json();

  if (!image) {
    return NextResponse.json({ error: 'No image provided' }, { status: 400 });
  }

  try {
    const result = await cloudinary.uploader.upload(image, {
      upload_preset: 'ml_default',
      transformation: [
        { width: 200, height: 200, crop: 'thumb', gravity: 'face' }, // Circular crop
        { fetch_format: 'auto', quality: 'auto' }, // Optimize format and quality
      ],
    });

    return NextResponse.json({ 
      success: true, 
      url: result.secure_url 
    });
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
