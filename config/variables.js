require('dotenv').config();

module.exports = {
    secret: process.env.SESSION_SECRET,
    // expiration: process.env.SESSION_EXPIRATION
};