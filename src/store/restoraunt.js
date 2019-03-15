import { observable, action, computed, configure, runInAction } from "mobx";
import axiosInstance from "../axiosInstance";

configure({ strict: "always" });

class Restoraunt {
  @observable foods = [];
  @observable drinks = [];
  @observable filterText = "";
  @observable isLoading = false;

  @action async getFoods(url) {
    this.isLoading = true;
    const foods = await axiosInstance.get(url);
    runInAction(() => {
      this.isLoading = false;
      this.foods = foods.data;
    });
  }

  @action getDrinks() {}

  @computed get foodsCount() {
    return this.foods.length;
  }
  @computed get drinksCount() {
    return this.drinks.length;
  }

  @computed get filteredFoods() {
    return this.foods.filter(food =>
      food.name.toLowerCase().includes(this.filterText)
    );
  }
}

export default new Restoraunt();
