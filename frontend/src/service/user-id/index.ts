class Service {
  userId: string | null = null;

  setUserId = (id: string | null) => {
    if (!id) return;
    this.userId = id;
    localStorage.setItem('userId', id);
  };

  getUserId = () => this.userId;

  clearUserId = () => {
    this.userId = null;
    localStorage.removeItem('userId');
  };
  checkUserIdInLocalStorage = () => {
    if (localStorage.getItem('userId')) {
      const userId = localStorage.getItem('userId');
      this.userId = userId;
      return true;
    }
  };
}

const instance = new Service();
export { instance as UserIdService };
