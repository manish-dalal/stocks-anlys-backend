import mongoose from 'mongoose'
const { Schema } = mongoose

const positionSchema = new Schema(
  {
    text: { type: String, required: true }
  },
  { timestamps: true }
)

const positionModel = mongoose.model('positions', positionSchema)

export { positionModel }
