const logTime = (req, res, next)=>{
    console.log('Request time', new Date());
    next();
};

module.exports = logTime;