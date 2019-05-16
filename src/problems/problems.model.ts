import * as mongoose from 'mongoose';

export interface Problem extends mongoose.Document {
    user: mongoose.Types.ObjectId;
    subCategory: mongoose.Types.ObjectId;
    observation: string;
    latitude: string;
    longitude: string;
}

const problemSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true
    },
    observation: {
        type: String,
        max: [500, 'observation problem limit exceeded 500 characters']
    },
    latitude: {
        type: String,
        max: [50, 'latitude problem limit exceeded 50 characters']
    },
    longitude: {
        type: String,
        max: [50, 'longitude problem limit exceeded 50 characters']
    },
    isAtivo: {
        type: Boolean,
        required: false,
        default: true
    },
    dateUpdate: {
        type: Date,
        required: false,
        default: new Date()
    },
    dateCreate: {
        type: Date,
        required: false,
        default: new Date()
    }
});

export const Problem = mongoose.model<Problem>('Problem', problemSchema);