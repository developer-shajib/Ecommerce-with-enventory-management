import mongoose, { mongo } from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      trim: true,
      required: true
    },
    mobile: {
      type: String,
      trim: true,
      default: null
    },
    password: {
      type: String,
      trim: true,
      required: true
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other', null],
      default: null
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: true
    },
    photo: {
      type: String,
      default: null
    },
    token: {
      type: String,
      default: null
    },
    status: {
      type: Boolean,
      default: true
    },
    trash: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('User', userSchema);
