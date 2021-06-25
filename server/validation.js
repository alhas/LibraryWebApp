import { body } from 'express-validator';

//Register Validation
export const registerValidation = () => {
    return [
        body('username').notEmpty().isLength({ min: 4, max: 16 }).withMessage("User name must be minimum 4 characters"),
        body('email').isEmail().withMessage('Email is not acceptable'),
        body('password').notEmpty().isLength({ min: 6, max: 26 }).withMessage('Password must be more than 6 characters.'),
    ]
}

//Login Validation
export const loginValidation = () => {
    return [
        body('email').isEmail().withMessage('Email is not acceptable').notEmpty().isLength({ min: 6, max: 255 }),
        body('password').notEmpty().isLength({ min: 6, max: 26 }),
    ]
}

export const bookValidation = () => {
    return [
        body('title').notEmpty().isLength({ min: 3 }).withMessage('Should be Min 3 character'),
        body('author').notEmpty().isLength({ min: 3 }).withMessage('Should be Min 3 character'),
        body('description').notEmpty().isLength({ min: 10 }).withMessage('Should be Min 10 character'),
        body('language').notEmpty().isLength({max:20}).withMessage('Max 20 char')

    ]


}