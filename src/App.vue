<template>
  <div>
    <Audio class='audio'></Audio>
    <router-view></router-view>
  </div>
</template>

<script>
import Audio from './components/audio/Audio'
export default {
  components: {
    Audio
  }
}
</script>

<style scoped>
  .audio {
    z-index: 9;
  }
</style>

