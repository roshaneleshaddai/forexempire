// models/Image.js
import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  date: { type: Date, required: true },
});

export default mongoose.models.Image || mongoose.model('Image', ImageSchema);
