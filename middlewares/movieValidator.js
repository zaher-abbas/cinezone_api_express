import {body} from 'express-validator'
import {handleValidationErrors} from "./handleValidationErrors.js";

export const movieValidator = [
    body('title').notEmpty().withMessage('Movie title is required')
        .isLength({max: 100}).withMessage('Movie title must not exceed 100 characters long'),
    body('director').notEmpty().withMessage('Movie director is required')
        .isLength({max: 100}).withMessage('Movie director must not exceed 100 characters long'),
    body('release_year').notEmpty().withMessage('Release year is required')
        .isInt({min: 1900}).withMessage('Year must be a integer and greater than 1900')
        .isLength({max: 4}).withMessage('Year must be 4 digits long')
    ,
    body('rating').notEmpty().withMessage('Rating is required')
        .isFloat({min: 1, max: 10}).withMessage('Rating must be a number'),
    handleValidationErrors

]