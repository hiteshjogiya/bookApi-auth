const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('./Model/user');
const jwt = require('jsonwebtoken');
const auth = require('./verifytoken');

router.post('/register',async (req,res)=>{

    const salt = await bcrypt.genSalt(10);
    const hashedpswd = await bcrypt.hash(req.body.pswd,salt);
    const user = new User({
        uname:req.body.uname,
        pswd:hashedpswd
    });
    await user.save();
    res.send(user);
    
});
router.post('/login',async (req,res)=>{
    const user = await User.findOne({uname:req.body.uname});
    if(!user){
        return res.send('user not exits..!!');
    }
    else{
        const isvalid = await bcrypt.compare(req.body.pswd,user.pswd);
        if(!isvalid){
            res.send('password is not correct');

        }
        else{
           
            //res.send('login sucessfull');
            const token = jwt.sign({_id:user._id},'privatekey');
            //res.header('auth-token',token);
            res.send({token});
        }
    }

});
router.get('/books',auth,(req,res)=>{
    res.json({
        title:"c",
        qty:45
    });
});
router.get('/bills',auth,(req,res)=>{
    res.json({
        title:"c",
        amount:450
    });
});
module.exports = router;