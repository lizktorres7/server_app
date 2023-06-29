const jwt = require('jsonwebtoken');

const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = {uid};
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{ 
            //expiresIn:'24h'
        }, (error, token) => {
            if (error) {
                console.log(error)
                reject('Failed to generate token');
            }else{
                resolve(token);
            }
        })
    })
}


module.exports = {
    generateJWT
}