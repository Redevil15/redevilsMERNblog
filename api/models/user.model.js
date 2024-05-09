import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePictureL: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2017/07/11/14/10/happy-dog-2493688_1280.jpg",
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;