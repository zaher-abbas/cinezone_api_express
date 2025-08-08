import {body} from 'express-validator'
import {handleValidationErrors} from "./handleValidationErrors.js";

export const userValidator = [
    body('email').trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email is not valid')
        .isLength({max: 255}).withMessage('Email must not exceed 255 characters long'),
    body('password').trim()
        .notEmpty().withMessage('Password is required')
        .isLength({
            min: 8,
            max: 255
        }).withMessage('Password must be at least 8 characters long and not exceed 255 characters long'),
    body('name').trim()
        .notEmpty().withMessage('Name is required')
        .isLength({max: 100}).withMessage('Name must not exceed 100 characters long'),
    handleValidationErrors
]