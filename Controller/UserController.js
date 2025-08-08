import {database} from "../Config/database.js";

export const registerUser = async (req, res) => {
    try {
        const {name, email, hashedPassword} = req.body;
        await database.query('INSERT INTO user (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
        return res.sendStatus(201)
    } catch (err) {
        return res.sendStatus(500);
    }
}