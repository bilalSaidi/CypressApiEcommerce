const Ajv = require('ajv');
const userResponseSchema = require('./userResponse.schema.json');
const paginatedUserResponseSchema = require('./paginatedUserResponse.schema.json');
const tokenResponseSchema = require('./tokenResponse.schema.json');
const updateResponseSchema = require('./updateResponse.schema.json');
const unauthorizedResponseSchema = require('./unauthorizedResponse.schema.json');
const itemNotFoundResponseSchema = require('./itemNotFoundResponse.schema.json');
const duplicateConflictResponseSchema = require('./duplicateConflictResponse.schema.json');

const ajv = new Ajv({ allErrors: true });

const validators = {
  userResponse: ajv.compile(userResponseSchema),
  paginatedUserResponse: ajv.compile(paginatedUserResponseSchema),
  tokenResponse: ajv.compile(tokenResponseSchema),
  updateResponse: ajv.compile(updateResponseSchema),
  unauthorizedResponse: ajv.compile(unauthorizedResponseSchema),
  itemNotFoundResponse: ajv.compile(itemNotFoundResponseSchema),
  duplicateConflictResponse: ajv.compile(duplicateConflictResponseSchema)
};

module.exports = validators;