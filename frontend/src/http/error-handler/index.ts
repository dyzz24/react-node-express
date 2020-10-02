import { AxiosResponse } from 'axios';

export const errorHandler = async <T>(
  request: () => Promise<AxiosResponse<T>>
): Promise<AxiosResponse<T>> => {
  try {
    return await request();
  } catch (err) {
    // errorCodesParsingHOF(err.response.status);
    return err.response;
  }
};
