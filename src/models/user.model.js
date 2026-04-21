import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// The mongoose pre hook acts as a middleware and helps to edit data just before storing it into db

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true // if you want to search this again and again its better to toogle index as true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type: String,  // cloudinary url
        },
        // the particular video which is watch its id will be stored here in form of array since there are many videos.
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String, // encrypt
            required: [true, "Password is required"]
        },
        refreshToken: {
            type: String,
        }
    }, {timestamps: true}
)

// here we didnt use callback bcoz callback doesnt have the ref of this
// now we take next as a paramenter, so when our functions work is done call next so that the flag is passes ahead.

userSchema.pre("save", async function (next){
    // but this password will continously change even for a name or avatar edit, so jab password feild bheju tabhi encrypt it.
    if(!this.isModified("password")){
        return next()
    }

    // password feild ko lo and encrypt it
    // 10 is a no.of rounds the password will take to hash
    this.password = bcrypt.hash(this.password, 10)
    next()
})

// we can add custom methods in mongoose
userSchema.methods.isPasswordCorrect = async function (password) {
    // bcrypt is used to check
    // return true or false
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function() {
    // sign methd generates token
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// refresh token has some less info 
userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)