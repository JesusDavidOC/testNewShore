<template>
  <b-navbar>
    <b-navbar-nav>
      <b-row>
        <div v-for="(item, index) in NavElements" :key="'nav' + index">
          <b-col v-if="item.type == 'dropDown'" sm="auto">
            <b-nav-item-dropdown
              :text="item.name"
              class="color-secondColor subTitle"
            >
              <b-dropdown-item
                href="#"
                v-for="(item1, index1) in item.elements"
                :key="index + index1"
                >{{ item1 }}</b-dropdown-item
              >
            </b-nav-item-dropdown>
          </b-col>
          <b-col v-else-if="item.type == 'inputText'" sm="auto">
            <b-nav-form>
              <b-form-input
                size="md"
                class="mr-sm-2"
                :placeholder="item.name"
              ></b-form-input>
            </b-nav-form>
          </b-col>
        </div>
      </b-row>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  props: {
    NavElements: Array,
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
</style>
