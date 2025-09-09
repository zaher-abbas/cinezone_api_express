import {database} from "../Config/database.js";

export const emailNotExistsValidator = async (req, res, next) => {
    const {email} = req.body;
    const result = await database.query('SELECT * FROM users WHERE email = ?', [email]);
    const [users] = result;
    if (users.length > 0)
        return res.status(409).send({message: 'Email already exists'});
    next();
}