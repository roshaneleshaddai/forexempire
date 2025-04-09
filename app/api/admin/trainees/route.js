import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Trainee from "@/lib/models/Trainee";
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

export async function GET(request) {
  try {
    // Verify admin authentication
    if (!verifyAdmin(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const trainees = await Trainee.find({}).sort({ registrationDate: -1 });

    return NextResponse.json(trainees);
  } catch (error) {
    console.error("Failed to fetch trainees:", error);
    return NextResponse.json(
      { error: "Failed to fetch trainees" },
      { status: 500 }
    );
  }
}
