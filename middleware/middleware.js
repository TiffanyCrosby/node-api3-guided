exports.logger = (req, res, next) => {
    const method = req.method;
    const endpoint = req.originalUrl;
  
    console.log(`${method} to ${endpoint}`)
  
    next();
  }

exports.addName= (name) =>{
    return function(req, res, next) {
    req.name = name
    next();
  }}
  
exports.notFound = (req, res, next) => {
    res.status(404).json({errorMessage: "Opps, did not find what you're looking for!"})
  }