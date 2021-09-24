const {StatusCodes} =  require ('http-status-codes');

const isAdmin = (req,res, next)=>{
  if (req.user.roles.indexOf('admin') !== 1) {
    return next();
  }
  res.status(StatusCodes.UNAUTHORIZED).send('This action needs admin privileges!')
};

module.exports = isAdmin;