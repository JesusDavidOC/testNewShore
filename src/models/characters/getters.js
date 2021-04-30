export default {
  getCharacter: (state) => (name) => {
    for (const key in state.list) {
      const element = state.list[key];
      if (name == element.name) {
        return element;
      }
    }
  },
};
