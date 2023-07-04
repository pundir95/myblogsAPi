import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "username is required"],
        },
        email: {
            type: String,
            required: [true, "email is required"],
        },
        password: {
            type: String,
            required: [true, "password is required"],
        },
        blogs: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Blog",
            },
        ],
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }

    next();
});


//compare password

userSchema.methods.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch;
}

//jwt token

userSchema.methods.createJWT = function () {
    return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}


export default mongoose.model("User", userSchema);