import {database} from "../Config/database.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const insert = async (req, res) => {
    try {
        const {name, email, hashedPassword} = req.body;
        await database.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
        return res.status(201).send({message: 'User created successfully'});
    } catch (err) {
        return res.sendStatus(500);
    }
}

export const login = (req, res) => {
    const {id} = req.user;
    const iat = Date.now() / 1000; //Date.now returns in milliseconds, so we divise it by 1000
    const exp = iat + (60 * 60 * 24); //expires after one day
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({sub: id, iat: iat, exp: exp}, secret);
    res.cookie('token', token, {
        httpOnly: process.env.COOKIE_HTTP_ONLY,
        secure: process.env.COOKIE_SECURE,
        sameSite: process.env.COOKIE_SAME_SITE,
        maxAge: 1000 * 60 * 60 * 24}); //cookie for one day
    return res.status(200).send({message: 'Login successful'});
}

export async function profile(req, res) {
    const userId = req.auth.sub;
    try {
        const result = await database.query('SELECT name, email FROM users WHERE id = ?', [userId]);
        const [users] = result;
        return res.status(200).json({name: users[0].name, email: users[0].email})
    } catch (err) {
        return res.sendStatus(500);
    }
}

export const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).send({message: 'Logout successful'});
}

