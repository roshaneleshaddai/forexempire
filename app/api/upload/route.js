import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import connectToDatabase from "@/lib/mongodb";
import Image from "@/lib/models/Image";
import { verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Middleware to verify admin token
const verifyAdmin = (request) => {
  const token = request.cookies.get("admin_token")?.value;
  if (!token) {
    return false;
  }
  try {
    verify(token, JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
};

export async function POST(request) {
  // Verify admin authentication
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  const formData = await request.formData();
  const image = formData.get("image");
  const category = formData.get("category");
  const date = formData.get("date");

  if (!image) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  try {
    // Convert the image to base64
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");
    const dataURI = `data:${image.type};base64,${base64Image}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "trade",
      resource_type: "auto",
    });

    if (!result || !result.secure_url) {
      return NextResponse.json(
        { error: "Error uploading image" },
        { status: 500 }
      );
    }

    // Save to database
    const newImage = new Image({
      category,
      imageUrl: result.secure_url,
      date: new Date(date),
    });

    await newImage.save();

    return NextResponse.json({
      success: true,
      imageUrl: result.secure_url,
      category,
      date,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        error: "Failed to upload image",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
