const router = require("express").Router();
const passport  =require("passport");

router.get("/login/failed", (req,res)=>{
res.status(401).json({
    error:true,
    message:"Login Failure"
})
})
router.get("/login/success", (req,res)=>{
    if(req.user){
res.status(200).json({
    error:false,
    message:"Successfully Logged IN",
    user:req.user,
})
    }
    else{
        res.status(403).json({error:true,message:"Not Authorized"})
    }
})
router.get("/google/callback",
passport.authenticate("google",{
    successRedirect:process.env.ClientURL,
    failureRedirect:"/login/failed"
}))

router.get("/google",passport.authenticate("google",["profile","email"]));
router.get('/logout', (req, res) => {
    req.logout(function(err) {
      if (err) { 
        return next(err); 
      }
      res.redirect(process.env.ClientURL);
    });
  });
module.exports = router;

