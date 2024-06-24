<template>
    <header>
        <router-link :to="{name: 'home'}">Home</router-link>
        <router-link :to="{name: 'login'}">Login</router-link>
        <router-link :to="{name: 'register'}">Register</router-link>
        <router-link :to="{name: 'user'}" v-if="isAuthenticated">User</router-link>
        
    </header>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
import { computed } from 'vue';
// import { useRouter } from 'vue-router';

const authStore = useAuthStore()

// const router = useRouter()

// const user = computed(()=>{
//   return authStore.user
// })

const isAuthenticated = computed(()=>{
  return authStore.isAuthenticated
})

// async function logout(){
//   await authStore.logout()
//     .then( res => {
//       router.replace({name: 'home'})
//     })
//     .catch(err => {
//       console.log(err.message)
//     })
// }

</script>