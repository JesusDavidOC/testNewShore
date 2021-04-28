<template>
  <b-container fluid class="fullWidth">
    <b-row class="fullWidth bg-firstColor" align-v="center" align-h="center">
      <b-col class="fullWidth" sm="auto">
        <NavBar :NavElements="NavElements" />
      </b-col>
    </b-row>
    <b-row class="fullWidth">
      <CardCharacter
        v-for="(item, index) in list"
        :character="item"
        :key="'cardCharacter' + index"
      />
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import NavBar from "../components/NavBar";
import CardCharacter from "../components/CardCharacter";
export default {
  components: {
    NavBar,
    CardCharacter,
  },
  data() {
    return {
      NavElements: [
        {
          name: "House",
          type: "dropDown",
          value: "",
          elements: ["test1", "test2"],
        },
        {
          name: "Gender",
          type: "dropDown",
          value: "",
          elements: ["test1", "test2"],
        },
        {
          name: "Specie",
          type: "dropDown",
          value: "",
          elements: ["test1", "test2"],
        },
        {
          name: "Name",
          type: "inputText",
          value: "",
        },
        {
          name: "Last name",
          type: "inputText",
          value: "",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      list: (state) => state.characters.list,
    }),
  },
  methods: {
    ...mapActions({
      read: "characters/read",
    }),
  },
  mounted() {
    this.read();
  },
};
</script>

<style lang="scss" scoped></style>
