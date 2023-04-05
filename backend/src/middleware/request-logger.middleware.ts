import { RequestHandler } from 'express';

const LogRequest: RequestHandler = async (req, _res, next): Promise<void> => {
  console.log(`METHOD: ${req.method}, PATH:${req.path}`);

  return next();
};

export { LogRequest };
