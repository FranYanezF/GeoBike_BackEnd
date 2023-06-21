const authRouter = require('express').Router()
const { login, register, index } = require('../controllers/auth')
const passport = require("passport")

authRouter.get("/login/success" ,(req,res)=>{
    if(req.user){
        res.status(200).json({
            error:false,
            message:"login de Google exitoso",
            user : req.user
        })
    }
    else{
        res.status(403).json({
            error:true,
            message:"No Autorizado"
        })
    }
})

authRouter.get("/login/failed" ,(req,res)=>{
    res.status(401).json({
        error:true,
        message:"fallo login de Google"
    })
})

authRouter.get(
    "/google/callback",
    passport.authenticate("google",{
        successRedirect:process.env.CLIENT_URL,
        failureRedirect:"/login/failed",
    })
)

authRouter.get("/google",passport.authenticate("google",["profile","email"]))

authRouter.get("/logout",(req,res)=>{
    req.logOut();
    res.redirect(process.env.CLIENT_URL)
})

authRouter.post('/login', login)
authRouter.post('/register', register)

module.exports = authRouter
