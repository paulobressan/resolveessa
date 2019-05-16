import * as express from 'express'
import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'
import { environment } from '../../common/environment';

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
})

export interface User extends mongoose.Document {
    name: string,
    fone: string,
    password: string,
    email: string,
    isEmail: boolean,
    isAtivo: boolean,
    profiles: String[],
    dateUpdate: Date,
    dateCreate: Date,
    hasAnyProfile(...profiles: string[]): boolean,
    matchesPassword(password: string): boolean
}

userSchema.methods.hasAnyProfile = function (...profiles: string[]): boolean {
    return profiles.some(profile => this.profiles.indexOf(profile) !== -1)
}

userSchema.methods.matchesPassword = function (password: string): boolean {
    return bcrypt.compareSync(password, this.password)
}

export interface UserModel extends mongoose.Model<User> {
    findByEmail(email: string, projection?: string): Promise<User>,
    findByEmailOrFone(fone: string, email?: string, projection?: string): Promise<User>
}

userSchema.statics.findByEmail = function (email: string, projection?: string): Promise<User> {
    return this.findOne({ email }, projection)
}

userSchema.statics.findByEmailOrFone = function (fone: string, email: string, projection?: string): Promise<User> {
    return this.findOne({ $or: [{ fone }, { email }] }, projection)
}

const hashPassword = function (obj: User, next: express.NextFunction) {
    bcrypt.hash(obj.password, environment.secutiry.saltRounds)
        .then(hash => {
            obj.password = hash
            next()
        }).catch(next)
}

const saveMiddleware = function (next: express.NextFunction) {
    const user: User = <User>this;
    if (!user.isModified('password'))
        next()
    else hashPassword(user, next)
}

const updateMiddleware = function (next: express.NextFunction) {
    if (!this.getUpdate().password) {
        next()
    } else {
        hashPassword(this.getUpdate(), next)
    }
}

userSchema.pre('save', saveMiddleware)
userSchema.pre('findOneAndUpdate', updateMiddleware)

export const User = mongoose.model<User, UserModel>('User', userSchema);