import mongoose from "mongoose";

const hostedSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UsersLogin', required: true },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    description: { type: String },
    capacity: { type: Number },
    status: { type: String, enum: ['upcoming', 'ongoing', 'completed'], default: 'upcoming' }
});

export default mongoose.model("Hosted", hostedSchema);