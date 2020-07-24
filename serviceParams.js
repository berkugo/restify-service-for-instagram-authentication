require('dotenv').config();


const serviceParams = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: process.env.GRANT_TYPE,
}


console.log(serviceParams)
module.exports.params = serviceParams
module.exports.url = process.env.AUTH_POST
module.exports.redirect_uri = process.env.REDIRECT_URI
