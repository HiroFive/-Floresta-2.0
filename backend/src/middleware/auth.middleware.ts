import jwt_decode from 'jwt-decode';
import { userService } from '~/services';

export const authMiddleware = (roles) => {
  return async (req, _res, next) => {
    const token = req?.headers?.token as string;

    try {
      if (token) {
        const decodedToken = jwt_decode(token);
        let user: any = await userService.getUserBySubId(decodedToken?.['sub']);
        user = user?.[0]?.dataValues;

        if (user?.role) {
          roles.forEach((role) => {
            if ([user?.role].includes(role)) return next();
          });
        } else {
          throw new Error('no role');
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
};
