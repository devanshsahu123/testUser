const { hash, genSalt, compare } = require("bcrypt");
const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");



const userSignUp = async (req, res) => {
    try {

        req.body.password = await hash(req.body.password, await genSalt(10));
        const check = await UserModel.create(req.body);
        console.log(check);
        return res.status(200).send({ status: true, msg: "user sign-up Successfully !!" })
    } catch (error) {
        console.log(error);
        return res.status(400).send({ status: false, msg: "user sign-up Error !!" })
    }
}

const userSignIn = async (req, res) => {
    try {
        const { email, password } = req.body
        const findUser = await UserModel.findOne({ email });

        console.log(findUser.password);

        const checkPassword = await compare(password, findUser.password);
        if (!checkPassword) {
            throw new Error('Invalid Password !! forgot you are password')
        }

        const data = {
            fName: findUser.fName,
            lName: findUser.lName,
            email: findUser.email,
        }

        console.log(data);

        const token = await jwt.sign(data, process.env.SECRET_KEY);

        return res.status(200).send({ status: true, msg: "user sign-in Successfully !!", token })
    } catch (error) {
        console.log(error);
        return res.status(400).send({ status: false, msg: "user sign-in Error !!" + " " + error.message })
    }
}

const sendForgotPasswordMail = async(req, res)=>{
    try {
        const email = req.body.email;
      const getUser =   await UserModel.findOne({email});

        const forgotToken = await jwt.sign({userId:getUser.id}, process.env.SECRET_KEY, { expiresIn:300 });

        const forgotPasswordURL = `http://localhost:3010/user/forgot-password/${forgotToken}`

        // use node-mailer for sending the file;
        
        return res.status(200).send({ status: true, msg: "user password rest sended Successfully !!", forgotPasswordURL })
    } catch (error) {
        console.log(error);
        return res.status(400).send({ status: false, msg: "user password reset send mail Error !!" })
    }
}

const renderForgotPasswordFile = (req, res) =>{
    try {
        const userToken = req.params.userToken;

      return res.render('forgot-mail.ejs', {userToken})
        

    } catch (error) {
        console.log(error);
        return res.status(400).send({ status: false, msg: "user password render file Error !!" })
    }
}

const userForgotPassword = async (req, res)=>{
    try {
        const token = req.params.userToken;
        const checkToken = jwt.sign(token, process.env.SECRET_KEY);
        if (!checkToken) throw new Error("something went Wrong link is expired");

        await UserModel.updateOne({ id: checkToken.id},{
            password:req.body.password
        })
        return res.status(200).send({ status: true, msg: "user password rest Successfully !!" })
    } catch (error) {
        console.log(error);
        return res.status(400).send({ status: false, msg: "user password reset Error !!" })
    }
}


module.exports = { userSignUp, userSignIn, sendForgotPasswordMail, renderForgotPasswordFile, userForgotPassword };