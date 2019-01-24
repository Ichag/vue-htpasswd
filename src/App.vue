<template>
  <div id="app">
    <h1 class="h1">Htpasswd Generator</h1>
    <htpasswd />
  </div>
</template>

<script>
import Htpasswd from "./components/Htpasswd.vue";

export default {
  name: "app",
  components: {
    Htpasswd
  }
};
</script>
