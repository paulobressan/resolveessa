"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const environment_1 = require("../../common/environment");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        maxlength: 80,
        minlength: 3
    },
    fone: {
        type: String,
        required: [true, 'fone is required'],
        maxlength: 20,
        minlength: 11
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    email: {
        type: String,
        maxlength: 255,
        minlength: 6
    },
    isEmail: {
        type: Boolean,
        default: false
    },
    profiles: {
        type: [String],
        default: ['user']
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
userSchema.methods.hasAnyProfile = function (...profiles) {
    return profiles.some(profile => this.profiles.indexOf(profile) !== -1);
};
userSchema.methods.matchesPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
userSchema.statics.findByEmail = function (email, projection) {
    return this.findOne({ email }, projection);
};
userSchema.statics.findByEmailOrFone = function (fone, email, projection) {
    return this.findOne({ $or: [{ fone }, { email }] }, projection);
};
const hashPassword = function (obj, next) {
    bcrypt.hash(obj.password, environment_1.environment.secutiry.saltRounds)
        .then(hash => {
        obj.password = hash;
        next();
    }).catch(next);
};
const saveMiddleware = function (next) {
    const user = this;
    if (!user.isModified('password'))
        next();
    else
        hashPassword(user, next);
};
const updateMiddleware = function (next) {
    if (!this.getUpdate().password) {
        next();
    }
    else {
        hashPassword(this.getUpdate(), next);
    }
};
userSchema.pre('save', saveMiddleware);
userSchema.pre('findOneAndUpdate', updateMiddleware);
exports.User = mongoose.model('User', userSchema);
//# sourceMappingURL=users.model.js.map