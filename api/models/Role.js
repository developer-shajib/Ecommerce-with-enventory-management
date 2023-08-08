import mongoose from 'mongoose';

const roleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    slug: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    permissions: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Permission',
      required: true
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

export default mongoose.model('Role', roleSchema);
