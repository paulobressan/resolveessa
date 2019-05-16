"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
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
exports.Problem = mongoose.model('Problem', problemSchema);
//# sourceMappingURL=problems.model.js.map