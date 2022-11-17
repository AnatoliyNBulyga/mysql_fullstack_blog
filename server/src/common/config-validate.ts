import * as Joi from '@hapi/joi';

export const validationSchema = Joi.object({
  PORT: Joi.number(),
  DB_TYPE: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  JWT_ACCESS_SECRET: Joi.string().required(),
  JWT_ACCESS_EXPIRATION_TIME: Joi.number().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_REFRESH_EXPIRATION_TIME: Joi.number().required(),
});
