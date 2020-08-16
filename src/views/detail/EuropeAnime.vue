<template>
  <div>
    <EuropeAnime :place="place">
      <span slot="topTitle">欧美动漫</span>
    </EuropeAnime>
  </div>
</template>

<script>
import EuropeAnime from 'components/detail/Detail'
export default {
  name: '',
  data() {
    return {
      place: '欧美'
    }
  },
  components: {
    EuropeAnime
  }
}
</script>

<style scoped>

</style>
