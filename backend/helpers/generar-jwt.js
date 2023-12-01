const jwt = require('jsonwebtoken');

const generateJWT = ( data = '' ) => {

    return new Promise( (resolve, reject) => {

        jwt.sign( data, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRED_TIME
        }, (err, token) => {
            if( err ){
                // console.log(err);
                reject('No se pudo generar token')
            } else {
                resolve(token);
            }
        })
    })
};

module.exports = {
    generateJWT
};