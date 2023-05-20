import mongoose from 'mongoose'

const appConfig = mongoose.Schema(
  {
    sig: { type: String, required: true },
    package: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('apps', appConfig)
