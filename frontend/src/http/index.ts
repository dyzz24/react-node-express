import axios, { AxiosResponse } from 'axios';
import { errorHandler } from './error-handler';
import { TokenService } from '../service/token';

const getToken = () => {
  axios.defaults.headers.common = {
    Authorization: `bearer ${TokenService.getToken()}`,
  };
};

export const get = <T>(url: string) => {
  getToken();
  return errorHandler(
    (): Promise<AxiosResponse<T>> => {
      return axios.get(url);
    }
  );
};

export const post = <T, Y = {}>(url: string, data?: Y) => {
  getToken();
  return errorHandler(
    (): Promise<AxiosResponse<T>> => {
      return axios.post(url, data);
    }
  );
};

export const patch = <T, Y = {}>(url: string, data: Y) => {
  getToken();
  return errorHandler(
    (): Promise<AxiosResponse<T>> => {
      return axios.patch(url, data);
    }
  );
};

export const put = <T, Y>(url: string, data: Y) => {
  getToken();
  return errorHandler(
    (): Promise<AxiosResponse<T>> => {
      return axios.put(url, data);
    }
  );
};
