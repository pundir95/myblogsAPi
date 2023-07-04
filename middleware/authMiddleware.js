import JWT from "jsonwebtoken";


const userAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return next("Authentication Failed");
    }
    const token = authHeader.split(" ")[1];

    try {
        const payload = JWT.verify(token, process.env.JWT_SECRET);
        req.user = payload.userId
        next()
    } catch (error) {
        next("Auth Failed")
    }
}

export default userAuth;