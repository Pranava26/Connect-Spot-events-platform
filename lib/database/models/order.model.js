import { Schema, model, models } from 'mongoose'

const OrderSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

const Order = models.Order || model('Order', OrderSchema)

export default Order