import admin from '../config/firebase-config.js'

class Middleware {
    async decodeToken(req,res,next){
        const token = req.headers.authorization.split(" ")[1];
        try
        {
            const decodeValue = await admin.auth().verifyIdToken(token);

            console.log(decodeValue);
            if(decodeValue){
                req.user = decodeValue;
                return next()
            }
        
            return res.json({message : "Un Authorized"})
        }
        catch(e)
        {
            return res.json({message : "Internal Error" + e.message})
        }

    }
}

export const middleware = new Middleware();