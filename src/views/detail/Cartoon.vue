<template>
  <div>
    <Top :isShow="false" class="top"></Top>
    <iframe src="https://www.kaimanhua.com/top/free.html" scrolling="auto" class="t-iframe" onLoad="iFrameHeight()"
    sandbox="allow-scripts allow-same-origin allow-popups"></iframe>
  </div>
</template>

<script>
import Top from "components/home/Top"
export default {
  name: '',
  components: {
    Top
  }
}
</script>

<style scoped>
  iframe {
    position: absolute;
    top: 65px;
    width: 99%;
    height: 600px;
  }
  .top {
    width: 100%;
    background: #1dafd3;
  }
</style>
