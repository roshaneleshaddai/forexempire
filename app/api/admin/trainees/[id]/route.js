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

export async function PATCH(request, { params }) {
  try {
    // Verify admin authentication
    if (!verifyAdmin(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const { paymentStatus } = await request.json();

    await connectToDatabase();
    const trainee = await Trainee.findByIdAndUpdate(
      id,
      { paymentStatus },
      { new: true }
    );

    if (!trainee) {
      return NextResponse.json({ error: "Trainee not found" }, { status: 404 });
    }

    return NextResponse.json(trainee);
  } catch (error) {
    console.error("Failed to update trainee:", error);
    return NextResponse.json(
      { error: "Failed to update trainee" },
      { status: 500 }
    );
  }
}
