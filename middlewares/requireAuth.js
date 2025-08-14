import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const requireAuth = (req, res, next) => {
    const {token} = req.cookies;
    if (!token)
        return res.status(401).send('Token is not provided');
    try {
        req.auth = jwt.verify(token, process.env.JWT_SECRET)
        next();
    } catch (err) {
        return res.status(401).send('Token is not valid');
    }
}