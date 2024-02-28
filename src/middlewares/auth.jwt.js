import { verifyToken } from "../utils/token/handle-token.js";
import boom from '@hapi/boom'

export const checkToken = async (req, res, next) => {
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1]
    if (!token) {
        return res.status(401).json({ message: "Token not provied" });
    }
    try {
        const payload = await verifyToken(token)
        if(payload){
            next()
        }
    } catch (error) {
        next(boom.unauthorized())
    }
}