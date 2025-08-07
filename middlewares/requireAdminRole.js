import {query} from 'express-validator'

export const requireAdminRole = (req, res, next) => {

    if (query('role').equals('admin'))
        next();
    else
        return res.status(403).send('Forbidden, only admin can access this route');

}