<template>
  <div class="options">
    <ul>
      <li
        v-for="option in options"
        :key="option"
        :class="{ isActive: option === key }"
        @click="() => changeSettings({ key: 'key', value: option })">
        {{ option }}
      </li>
    </ul>
    <label><input v-model="isColored" type="checkbox">is coloured?</label>
    <label><input v-model="isSorted" type="checkbox">is sorted?</label>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { KEY_RATIO, KEY_POPULATION, KEY_AREA } from '~/store/config'

export default {
  data: () => {
    return {
      options: [KEY_RATIO, KEY_POPULATION, KEY_AREA]
    }
  },
  computed: {
    ...mapState({
      key: state => state.settings.key,
      color: state => state.settings.isColored,
      sorted: state => state.settings.isSorted
    }),
    isColored: {
      get () {
        return this.color
      },
      set (value) {
        this.changeSettings({ key: 'isColored', value })
      }
    },
    isSorted: {
      get () {
        return this.sorted
      },
      set (value) {
        this.changeSettings({ key: 'isSorted', value })
      }
    }
  },
  methods: {
    ...mapActions('settings', [
      'changeSettings'
    ])
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  .options {
    background-color: rgba(255, 255, 255, 0.2);
    top: $spacing / 2;
    position: fixed;
    right: $spacing / 2;
    padding: $spacing;
    border: 1px solid #666;
    border-radius: 2px;
    color: #333;

    ul {
      list-style: none;

      li {
        cursor: pointer;

        &:hover {
          color: blue;
        }

        &.isActive {
          font-weight: bold;
          cursor: default;
          pointer-events: none;
        }
      }
    }

    label {
      display: block;
    }
  }
</style>
