import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userId: { type: Number, unique: true, required: true},
});

// Auto-increment userId
userSchema.pre('save', async function(next) {
  if (this.isNew) {
    const lastUser = await this.constructor.findOne({}, {}, { sort: { 'userId': -1 } });
    this.userId = lastUser ? lastUser.userId + 1 : 1;
  }
  next();
});

// ✅ Prevent OverwriteModelError
const UsersLogin = mongoose.models.UsersLogin || mongoose.model("UsersLogin", userSchema);

export default UsersLogin;
