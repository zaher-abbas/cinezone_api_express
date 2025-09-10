import {body} from 'express-validator'
import {handleValidationErrors} from "./handleValidationErrors.js";

export const movieValidator = [
    body('title').trim()
        .notEmpty().withMessage('Movie title is required')
        .isLength({max: 100}).withMessage('Movie title must not exceed 100 characters long'),
    body('director').trim()
        .notEmpty().withMessage('Movie director is required')
        .isLength({max: 100}).withMessage('Movie director must not exceed 100 characters long'),
    body('release_year').trim()
        .notEmpty().withMessage('Release year is required')
        .isInt({min: 1900}).withMessage('Year must be a integer and greater than 1900')
    ,
    body('rating').trim()
        .notEmpty().withMessage('Rating is required')
        .isFloat({min: 1, max: 10}).withMessage('Rating must be a float between 1 and 10'),
    body('category_id')
        .notEmpty().withMessage('Category is required')
        .isInt({min: 1}).withMessage('Category must be a integer'),
    handleValidationErrors

]