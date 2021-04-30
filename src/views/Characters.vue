<template>
  <b-container fluid class="fullWidth">
    <b-row
      align-v="center"
      align-h="center"
      class="tiketsFilters"
      id="row-badges"
    >
      <b-container>
        <b-row align-v="center" align-h="center">
          <p class="title">Filters</p>
        </b-row>
        <b-row align-v="center" align-h="center">
          <div
            v-for="(item, index) in Object.keys(filters)"
            :key="'filterBadges' + index"
          >
            <b-col sm="auto" v-if="filters[item] != ''">
              <b-badge
                :class="'badgeFilter subTitle ' + filters[item].toLowerCase()"
                >{{ item }}: {{ filters[item] }}
                <b-icon
                  icon="x-circle-fill"
                  @click="
                    (event) => {
                      let newList = filters;
                      newList[item] = '';
                      setFilters(newList);
                    }
                  "
                ></b-icon
              ></b-badge>
            </b-col>
          </div>
        </b-row>
        <b-row align-v="center" align-h="center">
          <div class="horizontalLine"></div>
        </b-row>
      </b-container>
    </b-row>
    <b-row class="fullWidth" align-v="center" align-h="center">
      <CardCharacter
        v-for="(item, index) in list"
        :character="item"
        :key="'cardCharacter' + index"
      />
    </b-row>
  </b-container>
</template>

<script>
import CardCharacter from "../components/CardCharacter.vue";

import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      changes: 0,
    };
  },
  components: {
    CardCharacter,
  },
  computed: {
    ...mapState({
      list: (state) => state.characters.list,
      filters: (state) => state.characters.filters,
    }),
  },
  methods: {
    ...mapActions({
      setFilters: "characters/setFilters",
    }),
    hasSomeFilter() {
      let class1 =
        "row tiketsFilters align-items-center justify-content-center notCollapsed fullWidth";
      let class2 =
        "row tiketsFilters align-items-center justify-content-center isCollapsed fullWidth";
      for (const key in Object.keys(this.filters)) {
        if (this.filters[Object.keys(this.filters)[key]] != "") {
          document.getElementById("row-badges").className = class2;
          return true;
        }
      }

      document.getElementById("row-badges").className = class1;
      return false;
    },
  },
  mounted() {
    this.hasSomeFilter();
    for (const key in Object.keys(this.filters)) {
      this.$store.watch(
        (state) => state.characters.filters[Object.keys(this.filters)[key]],
        (newValue, oldValue) => {
          if (newValue != oldValue) {
            console.log(this.hasSomeFilter());
          }
        }
      );
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/globalStyles.scss";

.badgeFilter {
  & svg {
    cursor: pointer;
  }
}
.tiketsFilters {
  contain: content;
  -webkit-transition: height 1s;
  -moz-transition: height 1s;
  -ms-transition: height 1s;
  -o-transition: height 1s;
  transition: height 1s;
  &.title {
    margin-bottom: 0%;
  }
  &.isCollapsed {
    height: 7em;
  }
  &.notCollapsed {
    height: 0;
  }
}

.horizontalLine {
  border-bottom-style: solid;
  border-width: 2px;
  height: 0;
  border-block-color: $FirstColor;
  box-shadow: 1px 1px 3px 1px $FirstColor;
  margin-top: 1em;
  margin-bottom: 1em;
  width: 60%;
}
</style>
