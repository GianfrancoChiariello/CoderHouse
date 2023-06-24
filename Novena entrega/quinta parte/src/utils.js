import { fileURLToPath } from "url";
import { dirname } from "path";
import jwt from "jsonwebtoken";

const PRIVATE_KEY = "1234";

export const generateToken = (user) => {
    return jwt.sign({user}, PRIVATE_KEY, {
        expiresIn: "24h"
    });
};

export const verifyToken = (req, res, next) => {
    const Authtoken = req.headers.authorization;

    if(!Authtoken) {
        return res.status(401).json({
            auth: false,
            message: "No token provided"
        });
    }

    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, PRIVATE_KEY, (error,credentials) => {
        if(error) {
            return res.status(401).json({
                auth: false,
                message: "Invalid token"
            });
        }
        req.user = credentials.user;
        next();
    });

};




const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;