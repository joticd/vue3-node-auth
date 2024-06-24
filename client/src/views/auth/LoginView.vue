<template>
    <div>
        <h3>Login</h3>
        <form @submit.prevent="login">
            <p v-if="errorMessage">{{ errorMessage }}</p>
            <label for="email">email</label>
            <input v-model="loginData.email" type="email" />
            <label for="password">password</label>
            <input type="password" v-model="loginData.password" />
            <button type="submit">Login</button>
       </form>
    </div>
</template>

<script>    
    import { useAuthStore } from "../../stores/auth";
    export default {
        data() {
            return {
                formData: {
                    email: "",
                    password: ""
                }
            }
        },
        methods: {
            async login() {
                const authStore = useAuthStore();
                await authStore.login(this.formData);
                this.$router.push('/user');
            }
        }
    }
</script>