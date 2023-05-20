import mongoose from 'mongoose'
mongoose.set('strictQuery', true)

export default async () => {

  try {
    await mongoConnect()
  } catch (err) {
    await mongoConnect()
    throw err
  }
}

async function mongoConnect () {
  if (!process.env.MONGO_URL) {
    throw new Error('Invalid mongodb url')
  }
  try {
    await mongoose.connect(process.env.MONGO_URL)
  } catch (error) {
    throw error
  }
}
