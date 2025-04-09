import mongoose from "mongoose";

const TraineeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  paymentAmount: { type: Number, default: 10000 },
  paymentReference: { type: String },
});

export default mongoose.models.Trainee ||
  mongoose.model("Trainee", TraineeSchema);
