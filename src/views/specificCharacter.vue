<template>
  <b-container v-if="character">
    <b-row class="nameCharacter" align-v="center" align-h="center">
      <b-col sm="auto">
        <h2 class="title">{{ character.name }}</h2>
      </b-col>
      <b-col sm="auto">
        <b-badge
          :class="character.house.toLowerCase() + ' badgeCharacter'"
          v-if="character.house != ''"
          >{{ character.house }}</b-badge
        >
      </b-col>
    </b-row>
    <b-row class="characterPresentation" align-v="center" align-h="center">
      <b-col sm="4" class="fullWidth">
        <img :src="character.image" alt="characterIMG" />
      </b-col>
      <b-col sm="auto" class="fullWidth characterData">
        <b-container>
          <div
            v-for="(item, index) in Object.keys(character)"
            :key="'charact' + index"
          >
            <b-row
              class="fullWidth tag"
              v-if="
                character[item] != '' &&
                item != 'house' &&
                item != 'name' &&
                item != 'yearOfBirth' &&
                item != 'wand' &&
                item != 'hogwartsStudent' &&
                item != 'hogwartsStaff' &&
                item != 'image' &&
                item != 'alive'
              "
            >
              <b-col sm="7" class="fullWidth">
                <p class="subTitle">{{ firstCapital(item) + ": " }}</p>
              </b-col>
              <b-col sm="3" class="fullWidth value">
                <p class="contentText value fullWidth">
                  {{ character[item] }}
                </p>
              </b-col>
            </b-row>
          </div>
          <b-row class="fullWidth tag">
            <b-col sm="7" class="fullWidth">
              <p class="subTitle key">Rol:</p>
            </b-col>
            <b-col sm="3" class="fullWidth value">
              <p class="contentText fullWidth" v-if="character.hogwartsStaff">
                Hogwarts staff
              </p>
              <p
                class="contentText fillWidth"
                v-else-if="character.hogwartsStudent"
              >
                Hogwarts student
              </p>
              <p class="contentText fillWidth" v-else>Other</p>
            </b-col>
          </b-row>
        </b-container>
      </b-col>
      <b-col
        sm="auto"
        v-if="
          character.wand.wood != '' ||
          character.wand.core != '' ||
          character.wand.length != ''
        "
      >
        <b-container>
          <b-row>
            <b-col sm="auto" id="wandContainer">
              <img src="../assets/wand.svg" alt="magic wand" id="wand" />
            </b-col>
            <b-col sm="auto">
              <b-container>
                <div
                  v-for="(item, index) in Object.keys(character.wand)"
                  :key="'wand' + index"
                >
                  <b-row
                    class="tag Wand subTitle"
                    v-if="character.wand[item] != ''"
                  >
                    {{ item }}:
                  </b-row>
                  <b-row
                    class="tag Wand contentText"
                    v-if="character.wand[item] != '' && item == 'length'"
                  >
                    {{ character.wand[item] }}"
                  </b-row>
                  <b-row
                    class="tag Wand contentText"
                    v-else-if="character.wand[item] != ''"
                  >
                    {{ character.wand[item] }}
                  </b-row>
                </div>
              </b-container>
            </b-col>
          </b-row>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      character: Object,
    };
  },
  computed: {
    ...mapGetters({
      getCharacter: "characters/getCharacter",
    }),
  },
  methods: {
    firstCapital(text) {
      let textChars = text.split("");
      textChars[0] = textChars[0].toUpperCase();
      return textChars.join().replaceAll(",", "");
    },
  },
  mounted() {
    this.$store.watch(
      (state) => state.characters.list,
      (newValue, oldValue) => {
        if (newValue != oldValue) {
          this.character = this.getCharacter(
            this.$route.params.name.replace("-", " ")
          );
        }
      }
    );
    try {
      this.character = this.getCharacter(
        this.$route.params.name.replace("-", " ")
      );
    } catch (e) {
      e;
    }
  },
};
</script>

<style lang="scss" scoped>
.characterPresentation {
  margin-top: 3em;
  & img {
    object-fit: cover;
    width: 23em;
    height: auto;
    object-position: top;
  }
}

.value {
  text-align: start;
  margin-left: 0.5em;
}
.tag {
  margin-bottom: 0.5em !important;
  white-space: nowrap;
  text-align: start;
  vertical-align: auto;
  &.Wand {
    margin-bottom: 0.3em !important;
    &.contentText {
      margin-left: 0.2em;
    }
  }
}

.nameCharacter {
  margin-top: 2em;
}

.badgeCharacter {
  font-size: 1.5em;
}

#wand {
  width: 8em;
  height: 8em;
  border-style: solid;
  padding: 1em;
}

#wandContainer {
  margin-top: auto !important;
  margin-bottom: auto !important;
}
.characterData {
  margin-right: 2em;
}
</style>
