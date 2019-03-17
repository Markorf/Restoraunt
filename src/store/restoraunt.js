import { observable, action, computed, configure, runInAction } from "mobx";
import axiosInstance from "../axiosInstance";

configure({ strict: "always" });

class Restoraunt {
  @observable store = [];
  @observable item = {};
  @observable filterText = "";
  @observable isLoading = false;
  @observable modalInfo = {
    show: false,
    message: ""
  };

  @action async getData(type) {
    this.isLoading = true;
    const response = await axiosInstance.get(`/${type}.json`);

    runInAction(() => {
      this.isLoading = false;
      this.store = response.data
        ? Object.keys(response.data).map(key => ({
            ...response.data[key],
            id: key
          }))
        : [];
    });
  }

  @action async getItem(itemId) {
    this.isLoading = true;
    const selectedType = localStorage.getItem("selectedType") || "foods";
    try {
      const response = await axiosInstance.get(
        `/${selectedType}/${itemId}.json`
      );
      runInAction(() => {
        this.isLoading = false;
        this.item = response.data ? { ...response.data, id: itemId } : {};
      });
      return response;
    } catch (err) {
      runInAction(() => {
        this.isLoading = false;
      });
      return err;
    }
  }

  @action async addData(data) {
    this.isLoading = true;
    const selectedType = localStorage.getItem("selectedType") || "foods";
    try {
      const res = await axiosInstance.post(`/${selectedType}.json`, data);
      runInAction(() => {
        this.isLoading = false;
      });
      return res;
    } catch (err) {
      runInAction(() => {
        this.isLoading = false;
      });
      return err;
    }
  }

  @action async editItem(data) {
    this.isLoading = true;
    const selectedType = localStorage.getItem("selectedType") || "foods";
    try {
      const res = await axiosInstance.put(
        `/${selectedType}/${data.id}.json`,
        data
      );
      runInAction(() => {
        this.isLoading = false;
      });
      await this.getItem(data.id);
      return res;
    } catch (err) {
      runInAction(() => {
        this.isLoading = false;
      });
      return err;
    }
  }

  @action async deleteItem(data) {
    this.isLoading = true;
    const selectedType = localStorage.getItem("selectedType") || "foods";
    try {
      const res = await axiosInstance.delete(
        `/${selectedType}/${data.id}.json`
      );

      runInAction(() => {
        this.isLoading = false;
      });
      return res;
    } catch (err) {
      runInAction(() => {
        this.isLoading = false;
      });
      return err;
    }
  }

  @action showModal(modalMessage) {
    this.modalInfo = {
      show: true,
      message: modalMessage
    };
  }

  @action hideModal() {
    this.modalInfo = {
      show: false,
      message: ""
    };
  }

  @computed get storeCount() {
    return this.store.length;
  }

  @computed get filteredStore() {
    return this.store.filter(item =>
      item.name.toLowerCase().includes(this.filterText)
    );
  }
}

export default new Restoraunt();
