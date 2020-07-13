const FILTER_TYPE = Object.freeze({
  REQ_PARAMS: 'params',
  REQ_USER: 'user',
});

// Used as a middelware to filter db results
// Use FILTER_TYPE.REQ_PARAMS when getting results connected to the resource id specified as a path variable
// Use FILTER_TYPE.REQ_USER for filtering results connected to the currently logged in user
// it sets the filter on req.dbFilter field which is later accessed in the handlerFactory.getAll function
const setFindFilterFromRequest = (
  fieldToSet = '',
  reqField = FILTER_TYPE.REQ_PARAMS,
  key = ''
) => (req, res, next) => {
  const value = req[reqField][key];
  req.dbFilter = value ? { [fieldToSet]: value } : {};

  next();
};

module.exports = setFindFilterFromRequest;
