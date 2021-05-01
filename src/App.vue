<template>
  <div id="app">
    <b-container fluid class="fullWidth">
      <b-row class="fullWidth bg-firstColor" align-v="center" align-h="center">
        <b-col class="fullWidth" sm="auto">
          <NavBar />
        </b-col>
      </b-row>
      <b-row class="fullWidth">
        <b-col class="fullWidth" sm="12">
          <router-view />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 30px;
}
</style>

<script>
import { mapActions } from "vuex";
import NavBar from "./components/NavBar";

export default {
  components: {
    NavBar,
  },

  methods: {
    ...mapActions({
      readFirst: "characters/readFirst",
    }),
  },
  mounted() {
    this.readFirst();
  },
};
</script>
