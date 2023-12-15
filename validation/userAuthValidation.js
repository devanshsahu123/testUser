const { body, check } = require("express-validator");
const UserModel = require("../models/user");

// * First Name
// * Last Name
//     * Email
//     * Password
const signUpValidation = [
    body('fName').isString().withMessage('fName must be in String'),
    body('lName').isString().withMessage('fName must be in String'),
    body('email').isEmail().withMessage('invalid Email address')
        .custom(async (email) => {
            
            const checkUser = await UserModel.countDocuments({ email:email });
            console.log(checkUser);
            if (checkUser >= 1) throw new Error('user already exist');
            return true
        }),
    body('password').isStrongPassword().withMessage('Password must be in Strong Formate 8 digit')
];

const signInValidation = [
    body('email').isEmail().withMessage('invalid Email address')
        .custom(async (email) => {
            const checkUser =await UserModel.countDocuments({ email });
            console.log(checkUser);
            if (checkUser !== 1) throw new Error('user not exist');
            return true
        }), 
    body('password').isStrongPassword().withMessage('Password must be in Strong Formate 8 digit')
]

const userForgetPasswordValidationRules = [
    body('password').isStrongPassword().withMessage("password must be strong and of 8 Digites"),
    body('cPassword').isStrongPassword().withMessage("confirm password must match with password")
    .custom(async(cPassword,{req})=>{

        if (cPassword === req.body.password) return true;
        throw new Error("confirm password must match with password")
    })
];

const sendForgotPasswordMailValidationErrors = [
    body('email').isEmail().withMessage('InValid Email address')
    .custom(async(email)=>{
        const checkEmail = await UserModel.countDocuments({email});
        if(checkEmail !== 1) throw new Error("user not exist")
        return true
    })
]

module.exports = {
    signUpValidation,
    signInValidation,
    sendForgotPasswordMailValidationErrors,
    userForgetPasswordValidationRules
}