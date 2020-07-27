// Used as middleware to set a body field
// equal to specifed path variable (param) name
// e.g used to connect a new resource with another resource
// specified as a path variable in url when using nested routes
// defaults paramName to fieldNameId
const setBodyFieldFromParam = (fieldName, paramName = `${fieldName}Id`) => (
  req,
  res,
  next
) => {
  if (!req.body[fieldName]) req.body[fieldName] = req.params[paramName];
  next();
};

module.exports = setBodyFieldFromParam;
