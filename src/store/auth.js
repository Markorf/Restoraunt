import { observable, action, computed, configure, runInAction } from "mobx";
import axiosInstance from "../axiosInstance";
import { config } from "../firebaseSetup";
configure({ strict: "always" });

class Auth {
  @observable isLoading = false;
  @observable _isAuth = null;
  @observable userInfo = {};

  constructor() {
    const logoutTime = localStorage.getItem("logoutTime");
    if (!logoutTime) return;
    if (new Date().getTime() > logoutTime) {
      this.logOut();
    }
  }

  @action logUserIn(userData) {
    this.isLoading = false;
    this._isAuth = true;
    this.userInfo = userData;
    const logoutTime = new Date().setDate(new Date().getDate() + 7);
    localStorage.setItem("logoutTime", logoutTime);
    localStorage.setItem("idToken", userData.idToken);
  }

  @action async tryRegisterUser(userData) {
    this.isLoading = true;
    try {
      const res = await axiosInstance.post(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${
          config.apiKey
        }
        `,
        {
          email: userData.email,
          password: userData.password,
          returnSecureToken: true
        }
      );
      this.logUserIn(res.data);
      return res;
    } catch (err) {
      runInAction(() => {
        this.isLoading = false;
      });
      return err;
    }
  }
  @action async tryAuthUser(userData) {
    this.isLoading = true;
    try {
      const res = await axiosInstance.post(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${
          config.apiKey
        }
      `,
        {
          ...userData,
          returnSecureToken: true
        }
      );
      this.logUserIn(res.data);

      return res;
    } catch (err) {
      runInAction(() => {
        this.isLoading = false;
      });

      return err;
    }
  }
  @action logOut() {
    this._isAuth = false;
    localStorage.removeItem("idToken");
    localStorage.removeItem("logoutTime");
  }

  @computed get isAuth() {
    return this._isAuth || localStorage.getItem("idToken") !== null;
  }
}

export default new Auth();
