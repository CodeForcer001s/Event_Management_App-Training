import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  eventName: { type: String, required: true },
  eventType: { type: String, required: true },
  eventDate: { type: Date, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'UsersLogin' }
});

const Events = mongoose.models.Events || mongoose.model("Events", eventSchema);
export default Events;