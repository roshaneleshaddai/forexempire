import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Trainee from "@/lib/models/Trainee";

export async function POST(request) {
  try {
    await connectToDatabase();
    const data = await request.json();

    // Validate required fields
    const requiredFields = ["name", "email", "phone", "address"];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Check if email already exists
    const existingTrainee = await Trainee.findOne({ email: data.email });
    if (existingTrainee) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Create new trainee
    const trainee = new Trainee(data);
    await trainee.save();

    // TODO: Send email with payment instructions

    return NextResponse.json(
      { message: "Registration successful" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
