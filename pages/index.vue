<template>
  <main class="container">
    <BarChart />
    <Options />
  </main>
</template>

<script>
import { mapActions } from 'vuex'
import BarChart from '~/components/BarChart'
import Options from '~/components/Options'

export default {
  components: {
    BarChart,
    Options
  },
  created () {
    // Once the component is created, this function is called
    this.loadInvestments()
  },
  methods: {
    // Mapping an action make the function available in the component
    ...mapActions([
      'loadInvestments'
    ])
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

</style>
