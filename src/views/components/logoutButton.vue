<template>
    <div id="logoutButton">
        <font-awesome-icon icon="sign-out-alt" @click="logout"/>
    </div>
</template>

<script>
    export default {
        name: 'logout-button',

        methods: {
            logout() {
                localStorage.clear()
                window.location = '/'
            }
        }
    }
</script>