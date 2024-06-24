<template>
    <div v-if="user">
        <h3>User</h3>
        <p>Username: {{ user.username }}</p>
        <p>Email: {{ user.email }}</p>
        <p>First name: {{ user.first_name }} </p>
        <p>Last name: {{ user.last_name }}</p>
    </div>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth';
import { computed, onMounted } from 'vue';

const authStore = useAuthStore()

const user = computed(()=>{
  console.log(authStore.userDetail)
  return authStore.userDetail
})

async function getUser(){
  await authStore.getUser()
}

onMounted(async ()=>{
  await getUser()
})
</script>