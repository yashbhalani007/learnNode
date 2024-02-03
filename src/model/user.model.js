const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        address: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
        },
        mobile_no: {
            type: Number,
            required: true,
            minlength: 10
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
        },
        profile_pic: {
            type: {
                public_id: String,
                url: String
            }
        },
        refresh_token: {
            type: String,
        },
        is_Active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema)
module.exports = User;