import bcrypt from 'bcrypt';

export const hashPassword = async (req, res, next) => {
    const {password} = req.body;
    try {
        req.body.hashedPassword = await bcrypt.hash(password, 10);
        delete req.body.password;
        next();
    } catch (err) {
        return res.sendStatus(500);
    }
}