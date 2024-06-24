<script setup>
import { RouterView } from 'vue-router'
import TheNavbar from './components/TheNavbar.vue'
</script>

<template>  
  <div>
    <the-navbar />
    <RouterView />
  </div>
</template>
