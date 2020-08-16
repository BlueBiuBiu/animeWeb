<template>
  <div>
    <JapanAnime :place="place"></JapanAnime>
  </div>
</template>

<script>
import JapanAnime from 'components/detail/Detail'

export default {
  name: '',
  data() {
    return {
      place: '日本'
    }
  },
  components: {
    JapanAnime
  },
  methods: {

  },
}
</script>

<style scoped>

</style>
