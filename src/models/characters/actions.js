import axios from "axios";

export default {
  read({ commit }) {
    axios
      .get("http://hp-api.herokuapp.com/api/characters")
      .then((result) => {
        commit("setList", result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
