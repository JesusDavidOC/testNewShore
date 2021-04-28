<template>
  <b-card
    :img-src="character.image"
    img-alt="Card image"
    img-top
    class="mb-1 cardCharacter"
  >
    <b-container class="fullWidth">
      <b-row class="card-body-row fullWidth">
        <b-col sm="12" class="fullWidth">
          <b-container class="fullWidth">
            <b-row class="fullWidth tag">
              <b-col sm="4" class="fullWidth v-top">
                <p class="subTitle key">Name:</p>
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
                <p class="subTitle key">House:</p>
              </b-col>
              <b-col sm="8" class="fullWidth v-center">
                <p class="contentText value fullWidth">
                  {{ character.house }}
                </p>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </b-card>
</template>

<script>
export default {
  props: {
    character: Object,
  },
};
</script>

<style lang="scss" scope>
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
.card > img {
  object-fit: cover;
  width: auto;
  height: 17em;
  object-position: top;
}
.cardCharacter {
  max-width: 15em;
  width: 15em;
  margin: 1em;
}

.card:hover {
  transition: all 0.3s ease-in-out;
  transform: scale(1.05);
  cursor: pointer;
}

.value {
  text-align: start;
}
.tag {
  margin-bottom: 0.5em !important;
}
</style>
