const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    const token = req.header('Authorization');
    if(!token){
        res.send('no token found in the header');
    }else{
        try{
            jwt.verify(token.split(' ')[1],'privatekey');
            next();
        }
        catch(error){
            res.send('invalid token');

        }
    }
}