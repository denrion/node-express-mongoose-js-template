const status = require('http-status');
const APIFeatures = require('../utils/APIFeatures');
const catchAsync = require('../utils/catchAsync');
const InternalServerError = require('../utils/errors/InternalServerError');
const NotFoundError = require('../utils/errors/NotFoundError');
const lowercaseFirstLetter = require('../utils/helpers/lowercaseFirstLetter');
const setCorrectPluralSuffix = require('../utils/helpers/setCorrectPluralSuffix');
const ResponseStatus = require('../constants/ResponseStatus');

const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const filter = req.dbFilter || {};

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const documents = await features.query;
    const totalResults = await Model.countDocuments();

    res.status(status.OK).json({
      status: ResponseStatus.SUCCESS,
      returnedResults: documents.length,
      totalResults,
      pagination: features.createPaginationLinks(totalResults),
      data: {
        [setCorrectPluralSuffix(
          lowercaseFirstLetter(Model.modelName)
        )]: documents,
      },
    });
  });

const getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if (populateOptions) query = query.populate(populateOptions);

    const document = await query;

    if (!document)
      return next(new NotFoundError('No document found with the specified id'));

    res.status(status.OK).json({
      status: ResponseStatus.SUCCESS,
      data: {
        [setCorrectPluralSuffix(
          lowercaseFirstLetter(Model.modelName)
        )]: document,
      },
    });
  });

const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.create(req.body);

    if (!document)
      return next(
        new InternalServerError(
          'Error occured while creating a document. Please, try again.'
        )
      );

    res.status(status.CREATED).json({
      status: ResponseStatus.SUCCESS,
      data: {
        [setCorrectPluralSuffix(
          lowercaseFirstLetter(Model.modelName)
        )]: document,
      },
    });
  });

const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!document)
      return next(new NotFoundError('No document found with the specified id'));

    res.status(status.OK).json({
      status: ResponseStatus.SUCCESS,
      data: {
        [setCorrectPluralSuffix(
          lowercaseFirstLetter(Model.modelName)
        )]: document,
      },
    });
  });

const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);

    if (!document)
      return next(new NotFoundError('No document found with the specified id'));

    res
      .status(status.NO_CONTENT)
      .json({ status: ResponseStatus.SUCCESS, data: null });
  });

module.exports = { getAll, getOne, createOne, updateOne, deleteOne };
