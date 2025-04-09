// app/api/images/route.js
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Image from '@/lib/models/Image';

export async function GET() {
  try {
    await connectToDatabase();
    // Use the Mongoose model
    const images = await Image.find({}).sort({ date: -1 }); // Sort by date descending
    
    return NextResponse.json(images);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}