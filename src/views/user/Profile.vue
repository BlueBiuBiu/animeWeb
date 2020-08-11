<template>
  <div class="profile">
    <table>
      <tr>
        <td>用户</td>
        <td>{{this.$store.state.loginUsername}}</td>
      </tr>
      <tr>
        <td>性别</td>
        <td></td>
      </tr>
      <tr>
        <td>年龄</td>
        <td></td>
      </tr>
      <tr>
        <td>地址</td>
        <td></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: ''
}
</script>

<style scoped>
  table {
    color: white;
    margin: 0 auto;
    margin-top: 20%;
  }
  td {
    padding: 10px;
    padding-right: 10px;
    border-bottom: 1px solid white;
    margin-right: 5px;
  }

</style>
