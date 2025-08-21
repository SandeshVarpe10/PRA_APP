const jwt = require('jsonwebtoken');
const SECRET_KEY = "#4545#";

exports.getUserFromToken = (req, res, next) => {
    console.log("Cookies received on backend:", req.cookies); 
    const token = req.cookies.token;
    console.log("hell",token)
    console.log(token);
    if (token) {
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            req.user = decoded;
        } catch (err) {
            req.user = null;
        }
    } else {
        req.user = null;
    }
    next();
};