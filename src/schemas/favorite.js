import mongoose from 'mongoose'

const postFavorite = mongoose.Schema(
  {
    user: { type: String, required: true },
    post_id: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('post_favorite', postFavorite)
