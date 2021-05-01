import axios from "axios";

export default {
  async readFirst({ state, commit }) {
    await axios
      .get("http://hp-api.herokuapp.com/api/characters")
      .then((result) => {
        commit("setList", result.data);
      })
      .catch((err) => {
        console.log(err);
      });
    let houses = [];
    let species = [];
    let listCounter = [];
    for (const index in state.list) {
      const element = state.list[index];
      if (!houses.includes(element.house) && element.house != "") {
        houses.push(element.house);
        let temp = {};
        temp[element.house] = 1;
        listCounter.push(temp);
      } else {
        for (const key in listCounter) {
          let counter = listCounter[key];
          if (Object.keys(counter)[0] == element.house) {
            listCounter[key][element.house]++;
          }
        }
      }
      if (!species.includes(element.species)) {
        species.push(element.species);
      }
    }
    commit("setSpecies", species);
    commit("setHouses", houses);
    commit("setCountByHouse", listCounter);
  },

  async read({ commit }, payload) {
    await axios
      .get(payload)
      .then((result) => {
        commit("setList", result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  async setFilters({ state, commit, dispatch }, payload) {
    let newList = [];
    if (payload.house != "") {
      await dispatch(
        "read",
        "http://hp-api.herokuapp.com/api/characters/house/" + payload.house
      );
    } else {
      await dispatch("readFirst");
    }

    for (const key1 in state.list) {
      if (
        (payload.species == "" ||
          state.list[key1].species == payload.species) &&
        (payload.name.trim() == "" ||
          state.list[key1].name
            .toLowerCase()
            .includes(payload.name.toLowerCase())) &&
        (payload.gender == "" || state.list[key1].gender == payload.gender) &&
        (payload.rol == "" ||
          (payload.rol == "Student" && state.list[key1].hogwartsStudent) ||
          (payload.rol == "Staff" && state.list[key1].hogwartsStaff) ||
          (payload.rol == "Other" &&
            !state.list[key1].hogwartsStudent &&
            !state.list[key1].hogwartsStaff))
      ) {
        newList.push(state.list[key1]);
      }
    }

    commit("setFilters", payload);
    commit("setList", newList);
  },
};
