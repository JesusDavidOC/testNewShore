import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  namespaced: true,
  state: () => ({
    list: [],
    houses: [],
    species: [],
    genders: ["male", "female"],
    filters: {
      name: "",
      house: "",
      species: "",
      gender: "",
      rol: "",
    },
    countByHouse: {},
  }),
  mutations,
  actions,
  getters,
};
