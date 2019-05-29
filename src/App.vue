<template>
  <div id="app" class="container">

    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow rounded mt-sm-0 mt-md-4 mb-5">
      <a class="navbar-brand" href="/">Lexis Site</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-item nav-link" to='/'>Home</router-link>
          <router-link class="nav-item nav-link" to='/CheckUser'>Check user</router-link>
          <router-link class="nav-item nav-link" to='/Dashboard'>Dashboard</router-link>
        </div>
      </div>
    </nav>

    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
    
  </div>
</template>

<script>
export default {

}
</script>

<style type="text/css">
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>