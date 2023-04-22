import { HttpCode } from '../common/enums';

export const checkIsFound = (res) => {
  return res === null || res?.length === 0 ? HttpCode.NOT_FOUND : HttpCode.OK;
};
