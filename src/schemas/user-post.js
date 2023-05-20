import mongoose from 'mongoose'

const userPost = mongoose.Schema(
  {
    user: { type: String, required: true },
    telecoin: { type: Number, required: false, default: 0 },
    img: { type: String, required: false },
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    sub: { type: String, required: true },
    telegram_type: { type: Number, required: true },
    category: { type: Number, required: true },
    reported: { type: Boolean, required: false, default: false },
    status: { type: Number, required: true }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('users_post', userPost)
