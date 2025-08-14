import bcrypt from 'bcrypt';

export const verifyPassword = async (req, res, next) => {
    const {password} = req.body;
    try {
        const ok = await bcrypt.compare(password, req.user.password);
        if (!ok)
            return res.status(401).send('Email or password is incorrect');
        next();
    } catch (err) {
        return res.sendStatus(500);
    }
}