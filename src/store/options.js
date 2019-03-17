import { observable, action, configure, runInAction } from "mobx";
import axiosInstance from "../axiosInstance";

configure({ strict: "always" });

class Options {
  initialType = "foods";
  @observable types = [];
  @observable selectedType = this.initialType;
  @observable isLoading = false;

  @action getAvailableTypes = async () => {
    this.isLoading = true;
    const availableTypes = await axiosInstance.get("/options/types.json");
    runInAction(() => {
      this.types = availableTypes.data ? availableTypes.data : [];
      this.isLoading = false;
    });
  };
  @action setType(type) {
    localStorage.setItem("selectedType", type);
    this.selectedType = type;
  }
}

export default new Options();
