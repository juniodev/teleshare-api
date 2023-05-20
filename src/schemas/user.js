import mongoose from 'mongoose'

const user = mongoose.Schema(
  {
    user: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    telecoin: { type: Number, required: false, default: 0 }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('users', user)
