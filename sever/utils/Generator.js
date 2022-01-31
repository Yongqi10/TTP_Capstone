const jwt = require('jsonwebtoken')

require('dotenv').config()

function Generator(u_id,u_type){

    const payload = {

        user: u_id,
        type: u_type,
    }


    return jwt.sign(payload, process.env.Secret, { expiresIn: "1hr" });

}

module.exports = Generator;