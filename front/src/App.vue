<template>
  <div id="app">
    <div id="nav">
      <router-link style="font-size: 2rem;" to="/">Home</router-link>
      <router-link style="font-size: 2rem;" to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 3rem;
}

#nav {
  padding: 30px;
  display: flex;
  justify-content: space-around;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
