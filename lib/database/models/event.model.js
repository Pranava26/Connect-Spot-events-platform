import { model, models, Schema } from "mongoose"

const EventSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    location: {type: String},
    createdAt: {type: Date, default: Date.now},
    imageUrl: {type: String, required: true},
    startDateTime: {type: Date, default: Date.now},
    endDateTime: {type: Date, default: Date.now},
    url: {type: String},
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    organizer: {type: Schema.Types.ObjectId, ref: 'User'},
}) 

const Event = models.Event || model('Event', EventSchema);

export default Event;