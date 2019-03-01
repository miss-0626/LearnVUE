<template>
  <div class="home">
    <h1>{{ msg }}</h1>
    <ul>
      <router-link id="Login" to="/Login">Login</router-link>
      <router-link id="Student" to="/Student">Student</router-link>
      <router-link id="Teacher" to="/Teacher">Teacher</router-link>
      <router-link id="Manager" to="/Manager">Manager</router-link>
      <router-link id="show" to="/show">展示</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to The experimental teaching management system'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
