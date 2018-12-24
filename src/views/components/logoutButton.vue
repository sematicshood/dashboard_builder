<template>
    <div id="logoutButton">
        <b-btn @click="logout" size="sm" variant="danger">Logout</b-btn>
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