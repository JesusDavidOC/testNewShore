<template>
  <b-navbar>
    <b-navbar-nav>
      <b-row v-if="!this.$route.params.name">
        <div v-for="(item, index) in NavElements" :key="'nav' + index">
          <b-col v-if="item.type == 'dropDown'" sm="auto">
            <b-nav-item-dropdown
              :text="item.name"
              class="color-secondColor subTitle"
            >
              <b-dropdown-item
                href="#"
                :value="item1"
                @click="setValue(item1, item.model)"
                v-for="(item1, index1) in item.elements"
                :key="index + index1"
                >{{ getNumber(item, item1, index1) }}
                {{ item1 }}</b-dropdown-item
              >
            </b-nav-item-dropdown>
          </b-col>
          <b-col v-else-if="item.type == 'inputText'" sm="auto">
            <b-nav-form>
              <b-form-input
                size="md"
                class="mr-sm-2"
                :placeholder="item.name"
                v-model="filters1[item.model]"
                @keydown="changeName()"
              ></b-form-input>
            </b-nav-form>
          </b-col>
        </div>
      </b-row>
      <b-row v-else>
        <b-button class="returnHome" @click="toHome()"
          >Return to explore <b-icon icon="arrow-left"></b-icon
        ></b-button>
      </b-row>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      filters1: {
        name: "",
        house: "",
        species: "",
        gender: "",
        rol: "",
      },
      NavElements: [
        {
          name: "House",
          type: "dropDown",
          elements: this.$store.state.characters.houses,
          model: "house",
        },
        {
          name: "Rol",
          type: "dropDown",
          elements: ["Student", "Staff", "Other"],
          model: "rol",
        },
        {
          name: "Gender",
          type: "dropDown",
          elements: this.$store.state.characters.genders,
          model: "gender",
        },
        {
          name: "Specie",
          type: "dropDown",
          elements: this.$store.state.characters.species,
          model: "species",
        },
        {
          name: "Name or last name",
          type: "inputText",
          model: "name",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      houses: (state) => state.characters.houses,
      species: (state) => state.characters.species,
      genders: (state) => state.characters.genders,
      countByHouse: (state) => state.characters.countByHouse,
    }),
  },
  methods: {
    ...mapActions({
      setFilters: "characters/setFilters",
    }),
    getIndex(name) {
      for (const index in this.NavElements) {
        const element = this.NavElements[index];
        if (element.name.toLowerCase() == name.toLowerCase()) {
          return index;
        }
      }
    },
    getNumber(item, item1, index1) {
      if (item.model == "house") {
        return `(${this.countByHouse[index1][item1]})`;
      }
    },
    toHome() {
      this.$router.push("/");
    },
    setValue(value, filter) {
      this.filters1[filter] = value;

      this.setFilters(this.filters1);
    },

    changeName() {
      this.setFilters(this.filters1);
    },
  },

  created() {
    this.$store.watch(
      (state) => state.characters.houses,
      (newValue, oldValue) => {
        if (newValue != oldValue) {
          this.NavElements[this.getIndex("house")].elements = newValue;
        }
      }
    );

    this.$store.watch(
      (state) => state.characters.species,
      (newValue, oldValue) => {
        if (newValue != oldValue) {
          this.NavElements[this.getIndex("Specie")].elements = newValue;
        }
      }
    );
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/palette.scss";
::v-deep .dropdown-toggle span {
  color: $SecondColor !important;
}

::v-deep .dropdown-toggle::after {
  color: $SecondColor !important;
}

.returnHome {
  background-color: $FourthColor;
  &:hover {
    background-color: $FirstColor;
    border-color: $FirstColor;
  }
}
</style>
