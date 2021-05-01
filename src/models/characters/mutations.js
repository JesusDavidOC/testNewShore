export default {
  setList(state, payload) {
    state.list = payload;
  },
  setSpecies(state, payload) {
    state.species = payload;
  },
  setHouses(state, payload) {
    state.houses = payload;
  },

  setFilters(state, payload) {
    state.filters = payload;
  },
  setCountByHouse(state, payload) {
    state.countByHouse = payload;
  },
};
