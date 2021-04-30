<template>
  <div>
    <b-card
      :img-src="character.image"
      img-alt="Card image"
      img-top
      class="mb-1 cardCharacter"
      @click="sendTo()"
    >
      <b-badge
        :class="character.house.toLowerCase()"
        v-if="character.house != ''"
        >{{ character.house }}</b-badge
      >
      <b-badge class="badge" v-if="character.house == ''">Not-House</b-badge>
      <b-container class="fullWidth">
        <b-row class="card-body-row fullWidth">
          <b-col sm="12" class="fullWidth">
            <b-container class="fullWidth">
              <b-row class="fullWidth tag">
                <b-col sm="4" class="fullWidth v-top">
                  <p class="subTitle">Name:</p>
                </b-col>
                <b-col sm="8" class="fullWidth v-center">
                  <p class="contentText value fullWidth">
                    {{ character.name }}
                  </p>
                </b-col>
              </b-row>
              <b-row class="fullWidth tag">
                <b-col sm="4" class="fullWidth v-top">
                  <p class="subTitle key">Specie:</p>
                </b-col>
                <b-col sm="8" class="fullWidth v-center">
                  <p class="contentText value fullWidth">
                    {{ character.species }}
                  </p>
                </b-col>
              </b-row>
              <b-row class="fullWidth tag">
                <b-col sm="4" class="fullWidth v-top">
                  <p class="subTitle key">Rol:</p>
                </b-col>
                <b-col sm="8" class="fullWidth v-center">
                  <p
                    class="contentText value fullWidth"
                    v-if="character.hogwartsStaff"
                  >
                    Hogwarts staff
                  </p>
                  <p
                    class="contentText value fillWidth"
                    v-else-if="character.hogwartsStudent"
                  >
                    Hogwarts student
                  </p>
                  <p class="contentText value fillWidth" v-else>Other</p>
                </b-col>
              </b-row>
            </b-container>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    character: Object,
  },
  methods: {
    prepareRoute() {
      return this.character.name.replace(" ", "-");
    },
    sendTo() {
      this.$router.push("characters/" + this.prepareRoute());
    },
  },
};
</script>

<style lang="scss" scoped>
.card-body-row {
  max-height: 15em;
  height: 100%;
  margin: 0;
}
.card-body {
  & .subTitle,
  .contentText {
    margin: 0;
  }
  & .contentText {
    padding-left: 0.5em;
  }
}
.cardCharacter > img {
  object-fit: cover;
  width: auto;
  height: 17em;
  object-position: top;
}
.cardCharacter {
  max-width: 15em;
  width: 15em;
  margin: 1em;
  transition: top 1s;
}

.cardCharacter:hover {
  transition: all 0.3s ease-in-out;
  transform: scale(1.05);
  cursor: pointer;
}

.value {
  text-align: start;
}
.tag {
  margin-bottom: 0.5em !important;
  white-space: nowrap;
}

.badge {
  position: relative;
  bottom: 18em;
  left: 4em;
  font-size: 1em !important;
  &.gryffindor {
    background-color: #740001 !important;
  }
  &.slytherin {
    background-color: #2a623d;
  }
  &.hufflepuff {
    background-color: #f0c75e;
  }
  &.ravenclaw {
    background-color: #222f5b;
  }
}
</style>
