import { useEffect, useState } from 'react';
import { IToken, TokenService } from '../../service/token';
import { get, post } from '../../http';
import {
  IGlobalResponse,
  ITokens,
  IUser,
} from '../../components/login-register-forms';
import { UserIdService } from '../../service/user-id';

const getUserInfo = async () => {
  const data = await get<IUser>(`/v1/users/${TokenService.getUserId()}`);
  return data;
};

export const useCheckAuthStatus = () => {
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const tryToRefresh = async () => {
    const data = await post<IToken>(`/v1/auth/refresh-tokens`, {
      refreshToken: TokenService.getRefreshToken(),
    });
    if (data.status === 200) {
      TokenService.setToken(data.data.access.token, data.data.refresh.token);
      return true;
    }
  };
  const checkResponse = async () => {
    if (
      TokenService.checkTokenInLocalStorage() &&
      UserIdService.checkUserIdInLocalStorage()
    ) {
      const response = await getUserInfo();
      if (response.status === 200) {
        setUserInfo(response.data);
      } else if (response.status === 401) {
        const retry = await tryToRefresh();
        if (retry) {
          await checkResponse();
        } else {
          TokenService.clearToken();
          UserIdService.clearUserId();
        }
      } else {
        TokenService.clearToken();
        UserIdService.clearUserId();
      }
    }
  };

  useEffect(() => {
    checkResponse();
  }, []);

  return { userInfo };
};
