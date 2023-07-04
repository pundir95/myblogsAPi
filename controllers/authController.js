import userSchema from "../models/userModel.js";

export const registerController = async (req, res, next) => {

    const { username, email, password, lastName } = req.body;

    if (!username) {
        return next("name is required")
    }

    if (!email) {
        return next("email is required");
    }
    if (!password) {
        return next("password is required and greater than 6 character");
    }

    const existingUser = await userSchema.findOne({ email })
    if (existingUser) {
        return next("Email Already Register Please Login");
    }

    const user = await userSchema.create({ username, email, password, lastName });

    res.status(201).send({
        success: true,
        message: "User Created Successfully",
    });
}

export const loginRegister = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next("Please Provide All fields")
    }

    const user = await userSchema.findOne({ email }).select("+password");
    if (!user) {
        return next("invalid username and Password")
    }
    //compare password

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return next("invalid Username and Password")
    }
    user.password = undefined;
    const token = user.createJWT();

    res.status(200).json({
        success: true,
        message: "Login SUccessfully",
        user,
        token,
    })
}


