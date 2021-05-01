<template>
  <b-container v-if="character != undefined" id="specificCharacter">
    <b-row class="nameCharacter" align-v="center" align-h="center">
      <b-col sm="auto">
        <h2 class="title">{{ character.name }}</h2>
      </b-col>
      <b-col sm="auto">
        <b-badge
          :class="lowerCase(character.house) + ' badgeCharacter'"
          v-if="character.house != ''"
          >{{ character.house }}</b-badge
        >
      </b-col>
    </b-row>
    <b-row class="characterPresentation" align-v="center" align-h="center">
      <b-col class="fullWidth"></b-col>
      <b-col sm="4" class="fullWidth">
        <img :src="character.image" alt="characterIMG" class="characterIMG" />
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
                <p :class="' value fullWidth ' + lowerCase(character.house)">
                  {{ firstCapital(character[item]) }}
                </p>
              </b-col>
            </b-row>
          </div>
          <b-row class="fullWidth tag">
            <b-col sm="7" class="fullWidth">
              <p class="subTitle key">Rol:</p>
            </b-col>
            <b-col sm="3" class="fullWidth value">
              <p
                :class="' value fullWidth ' + lowerCase(character.house)"
                v-if="character.hogwartsStaff"
              >
                Hogwarts staff
              </p>
              <p
                :class="' value fullWidth ' + lowerCase(character.house)"
                v-else-if="character.hogwartsStudent"
              >
                Hogwarts student
              </p>
              <p
                :class="' value fullWidth ' + lowerCase(character.house)"
                v-else
              >
                Other
              </p>
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
          <b-row align-v="center" align-h="center">
            <p class="title">WAND</p>
          </b-row>
          <b-row align-v="center" align-h="center">
            <b-col
              sm="8"
              :class="'horizontalLine ' + lowerCase(character.house)"
            ></b-col>
          </b-row>
          <b-row>
            <b-col sm="auto" id="wandContainer">
              <img
                src="../assets/wand.svg"
                alt="magic wand"
                class="wandImage"
                v-if="character.house"
                :id="'wand' + lowerCase(character.house)"
              />
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
                    :class="' value fullWidth ' + lowerCase(character.house)"
                    v-if="character.wand[item] != '' && item == 'length'"
                  >
                    {{ character.wand[item] }}"
                  </b-row>
                  <b-row
                    :class="' value fullWidth ' + lowerCase(character.house)"
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
      <b-col class="fullWidth"></b-col>
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
      var result = text.replace(/([A-Z])/g, " $1");
      var finalResult = result.charAt(0).toUpperCase() + result.slice(1);
      return finalResult;
    },
    lowerCase(text) {
      return text.toLowerCase();
    },
  },
  beforeMount() {
    this.character = this.getCharacter(
      this.$route.params.name.replace("-", " ")
    );
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
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/globalStyles.scss";
.characterPresentation {
  margin-top: 1em;
  & .characterIMG {
    object-fit: cover;
    width: 20em;
    height: auto;
    object-position: top;
    top: -1em;
    position: relative;
  }
}

#specificCharacter {
  background: linear-gradient(to bottom, $FontColor, white);
  max-width: 100% !important;
}

.value {
  text-align: start;
  margin-left: 0.5em;
  background-color: rgba(255, 255, 255, 0) !important;
  &.gryffindor {
    color: #740001 !important;
  }
  &.slytherin {
    color: #2a623d;
  }
  &.hufflepuff {
    color: $FontColor;
  }
  &.ravenclaw {
    color: #222f5b;
  }
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
  padding-top: 1em;
}

.badgeCharacter {
  font-size: 1.5em;
}

.wandImage {
  width: 8em !important;
  height: 8em !important;
  border-style: solid;
  border-width: 0.5em;
  padding: 1em;
  &#wand {
    &gryffindor {
      border-color: #740001 !important;
    }
    &slytherin {
      border-color: #2a623d;
    }
    &hufflepuff {
      border-color: #f0c75e;
    }
    &ravenclaw {
      border-color: #222f5b;
    }
  }
}

#wandContainer {
  margin-top: auto !important;
  margin-bottom: auto !important;
}
.characterData {
  margin-right: 2em;
}

.horizontalLine {
  &.gryffindor {
    border-block-color: #740001 !important;
    box-shadow: 1px 1px 3px 1px #740001 !important;
  }
  &.slytherin {
    border-block-color: #2a623d !important;
    box-shadow: 1px 1px 3px 1px #2a623d !important;
  }
  &.hufflepuff {
    border-block-color: #f0c75e !important;
    box-shadow: 1px 1px 3px 1px #f0c75e !important;
  }
  &.ravenclaw {
    border-block-color: #222f5b !important;
    box-shadow: 1px 1px 3px 1px #222f5b !important;
  }
}
</style>
