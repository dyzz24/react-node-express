class Service {
  token: string | null = null;

  setToken = (aToken: string, rToken: string) => {
    this.token = aToken;
    localStorage.setItem('token', aToken);
    localStorage.setItem('refreshToken', rToken);
  };

  getToken = () => this.token;

  getRefreshToken = () => localStorage.getItem('refreshToken');

  getUserId = () => localStorage.getItem('userId');

  checkTokenInLocalStorage = () => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      this.token = token;
      return true;
    }
  };

  clearToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    this.token = null;
  };
}

export interface IToken {
  access: {
    token: string;
    refresh: string;
  };
  refresh: {
    token: string;
    refresh: string;
  };
}

const instance = new Service();
export { instance as TokenService };
