import { RequestHandler } from 'express';
import jwt_decode from 'jwt-decode';
import { userService } from '~/services';

export const verifyTokenMiddleware: RequestHandler = async (
  req,
  _res,
  next,
): Promise<void> => {
  const token = req?.headers?.token as string;

  try {
    if (token) {
      const decodedToken = jwt_decode(token);
      const user = await userService.getUserBySubId(decodedToken?.['sub']);

      if (user?.length) {
        return next();
      }
    } else {
      return _res.status(403).json({
        message: 'Forbidden',
      }) as any;
    }
  } catch (error) {
    console.log(error);
    return _res.status(403).json({
      message: 'Forbidden',
    }) as any;
  }
};
