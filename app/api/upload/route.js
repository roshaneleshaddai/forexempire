import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import connectToDatabase from '@/lib/mongodb';
import Image from '@/lib/models/Image';

export async function POST(request) {
    await connectToDatabase();
    const formData = await request.formData();
    const image = formData.get('image'); 
    const category = formData.get('category');
    const date = formData.get('date');

    if (!image) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const fileBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);

    try {
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'trade' },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(buffer);
        });

        if (!result || !result.secure_url) {
            return NextResponse.json({ error: 'Error uploading image' }, { status: 500 });
        }

        const newImage = new Image({
            category,
            imageUrl: result.secure_url,
            date: new Date(date)
        });

        await newImage.save();

        return NextResponse.json({ imageUrl: result.secure_url, category, date });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
