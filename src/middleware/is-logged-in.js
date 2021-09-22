const {StatusCodes} = require('http-status-codes');
const users = require('../data/users')
const jwt = require('jsonwebtoken');



const isLoggedIn = (req, res, next)=> {
    const token = getTokenFromRequest(req);

    if (token) {
        const payload = verifyToken(token);
        if (payload) {
            req.user = payload;
            return next();
        }
    }
        res.status(StatusCodes.UNAUTHORIZED).send('Authentication required');

};

const getTokenFromRequest = (req) =>{
  const authHeader = req.headers['authorization'];

  if(authHeader){
      return authHeader.split(' ')[1];
  }
  return false;

};

const verifyToken = (token) => {
    const tokenPayload = jwt.decode(token);
    console.log(tokenPayload);
    if (tokenPayload) {
        const user = users.find(user => user.username === tokenPayload.username);
        console.log(user);
        if (user)
            try {
                return jwt.verify(token, user.secret);
            } catch (e) {
                return false;
            }
    }
};

module.exports = isLoggedIn;