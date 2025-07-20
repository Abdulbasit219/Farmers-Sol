import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ['farmer', 'buyer'],
        required: true
    },
    isAdmin: {
        type: Number,
        default: 0
    },
    profilePic: {
        type: String,
        default: ''
    }
},{
    timestamps: true
});

const user = mongoose.model('FarmSol', userSchema);
export default user;