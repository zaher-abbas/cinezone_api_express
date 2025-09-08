import {database} from "../Config/database.js";
import {body} from "express-validator";

export const findUserByEmail = async (req, res, next) => {
    const {email} = req.body;
    try {
        const result = await database.query('SELECT * FROM users WHERE email = ?', [email]);
        const [users] = result;
        if (users.length === 0)
            return res.status(401).send('Email or password is incorrect');
        req.user = users[0];
        next();
    } catch (err) {
        return res.sendStatus(500);
    }
}