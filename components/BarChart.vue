<template>
  <div class="wrapper">
    <svg ref="vis" class="vis">
      <g v-if="width && height && cities.length">
        <g
          v-for="({ label, d, fill, cx, y, transform }) in cities"
          :key="label"
          :style="{ transform }">
          <path
            :d="d"
            :style="{ fill }" />
          <text
            :x="cx"
            :y="y"
            text-anchor="middle">
            {{ label }}
          </text>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import { map, isUndefined, sortBy } from 'lodash'
import { mapState, mapGetters } from 'vuex'
import { scaleLinear, scaleBand } from 'd3-scale'
import { schemeCategory10 } from 'd3-scale-chromatic'
import { KEY_CONTINENT, KEY_NAME } from '~/store/config'

export default {
  data: () => {
    return {
      margin: {
        left: 20,
        right: 20,
        top: 10,
        bottom: 30
      },
      height: 0,
      width: 0
    }
  },
  computed: {
    ...mapState({
      data: state => state.data.cities.data,
      key: state => state.settings.key,
      isColored: state => state.settings.isColored,
      isSorted: state => state.settings.isSorted
    }),
    ...mapGetters([
      'continents'
    ]),
    extentY () {
      const values = map(this.data, this.key)
      return [0, Math.max(...values)]
    },
    scaleY () {
      return scaleLinear()
        .range([this.height - this.margin.bottom, this.margin.top])
        .domain(this.extentY).nice()
    },
    scaleX () {
      return scaleBand()
        .range([this.margin.left, this.width - this.margin.right])
        .domain(map(sortBy(this.data, this.isSorted ? this.key : KEY_NAME).reverse(), KEY_NAME))
        .padding(0.3)
    },
    cities () {
      const width = this.scaleX.bandwidth()
      const base = this.height - this.margin.bottom

      return map(this.data, (datum) => {
        const x = this.scaleX(datum[KEY_NAME])
        const y = this.scaleY(datum[this.key])
        const cx = width / 2
        return {
          ...datum,
          label: datum[KEY_NAME],
          d: `M0 ${base} L0 ${y} L${width} ${y} L ${width} ${base} Z`,
          fill: this.isColored ? schemeCategory10[this.continents.indexOf(datum[KEY_CONTINENT]) || 0] : '#000',
          cx,
          y: base + this.margin.bottom / 2,
          transform: `translateX(${x}px)`
        }
      })
    }
  },
  mounted () {
    this.calcSizes()
    window.addEventListener('resize', this.calcSizes, false)
  },
  updated () {
    this.calcSizes()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.calcSizes, false)
  },
  methods: {
    calcSizes () {
      const { vis: el } = this.$refs
      if (!isUndefined(el)) {
        this.width = el.clientWidth || el.parentNode.clientWidth
        this.height = el.clientHeight || el.parentNode.clientHeight
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  .wrapper {
    @include center();
    width: 100%;
    height: 100vh;

    .vis {
      max-width: 1200px;
      width: 100%;
      height: 100%;

      g {
        transition: transform 0.3s;
      }

      path {
        transition: d 0.3s, fill 0.3s;
      }
    }
  }
</style>
