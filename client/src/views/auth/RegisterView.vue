<template>
    <div>
        <form @submit.prevent="registerUser">
            <label for="username">Username</label>
            <input v-model="formData.username" type="text" id="username" />

            <label for="first_name">First Name</label>
            <input v-model="formData.first_name" type="text" id="first_name" />

            <label for="last_name">Last Name</label>
            <input v-model="formData.last_name" type="text" id="last_name" />

            <label for="email">Email address</label>
            <input v-model="formData.email" type="email" id="email" />

            <label for="password">Password</label>
            <input v-model="formData.password" type="password" id="password" />

            <label for="password_confirm">Confirm Password</label>
            <input v-model="formData.password_confirm" type="password" id="password_confirm" />
            <button type="submit">Register</button>
       </form>
    </div>
</template>

<script>
import { useAuthStore } from '../../stores/auth';

export default {
    data() {
        return {
            formData: {
                username : "",
                first_name : "",
                last_name : "",
                email : "",
                password : "",
                password_confirm : "",
            }
        }
    },
    methods: {
        async registerUser() {
            console.log("VIEW REGISTER")
            if(this.password !== this.password_confirm) {
                return;
            }
            const authStore = useAuthStore();
            await authStore.register(this.formData);
            this.$router.push('/login');
        }
    }

};    
</script>