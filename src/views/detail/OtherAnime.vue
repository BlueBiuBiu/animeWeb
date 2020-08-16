<template>
  <div>
    <OtherAnime :place="place">
      <span slot="topTitle">其它动漫</span>
    </OtherAnime>
  </div>
</template>

<script>
import OtherAnime from 'components/detail/Detail'
export default {
  name: '',
  data() {
    return {
      place: '其它'
    }
  },
  components: {
    OtherAnime
  }
}
</script>

<style scoped>

</style>
