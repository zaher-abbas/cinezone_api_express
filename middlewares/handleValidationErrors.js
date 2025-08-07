import {validationResult} from "express-validator";

export function handleValidationErrors
(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            Errors: errors.array()
        });
    }
    next();
};