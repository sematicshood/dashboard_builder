<template>
    <div id="syncButton">
        <font-awesome-icon icon="sync" @click="sync"/>
    </div>
</template>

<script>
    export default {
        name: 'button-sync',

        methods: {
            sync() {
                this.$store.dispatch('rows/syncDatabase')
            }
        }
    }
</script>