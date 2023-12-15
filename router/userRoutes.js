const { userSignUp, userSignIn, userForgotPassword, sendForgotPasswordMail, renderForgotPasswordFile } = require('../controller/userAuthController');
const handleValidationErrors = require('../middleware/handleValidationErrors');
const userAuthMiddleWare = require('../middleware/userAuthMiddleware');
const { signUpValidation, signInValidation, userForgetPasswordValidationRules, sendForgotPasswordMailValidationErrors } = require('../validation/userAuthValidation');

const router = require('express').Router();

router.post('/sign-up',
    signUpValidation,
    handleValidationErrors,
    userSignUp)

router.post('/sign-in',
    signInValidation,
    handleValidationErrors,
    userSignIn);

router.post('/send-forgot-password-mail',
    sendForgotPasswordMailValidationErrors,
    handleValidationErrors,
    sendForgotPasswordMail
    );

router.get('/forgot-password/:userToken', renderForgotPasswordFile)

router.post('/forgot-password/:userToken',
    userForgetPasswordValidationRules,
    handleValidationErrors,
    userForgotPassword
);

router.use(userAuthMiddleWare);

module.exports = router