import { observable, action, computed, configure, runInAction } from "mobx";
import axiosInstance from "../axiosInstance";

import { config } from "../firebaseSetup";

configure({ strict: "always" });

class Auth {
  @observable isLoading = false;
  @observable userInfo = {};

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
      runInAction(() => {
        this.isLoading = false;
        this.userInfo = res.data;
      });
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
      runInAction(() => {
        this.isLoading = false;
        this.userInfo = res.data;
      });

      return res;
    } catch (err) {
      runInAction(() => {
        this.isLoading = false;
      });

      return err;
    }
  }
  @action logOut() {
    this.userInfo = {};
    console.log("logged out");
  }
  @computed get isAuth() {
    return Object.keys(this.userInfo).length > 0;
  }
}

export default new Auth();
