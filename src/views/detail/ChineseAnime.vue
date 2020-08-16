<template>
  <div>
    <ChineseAnime :place="place">
      <span slot="topTitle">国内动漫</span>
    </ChineseAnime>
  </div>
</template>

<script>
import ChineseAnime from 'components/detail/Detail'
export default {
  name: '',
  data() {
    return {
      place: '国内'
    }
  },
  components: {
    ChineseAnime
  }
}
</script>

<style scoped>

</style>
