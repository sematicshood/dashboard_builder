<template>
    <div id="navbar">
        <div class="container-2">
            <div class="logo-left col-md-6">
                <div class="logo-nav">
                    <img src="../assets/logo.jpg" alt="Logo Sematics">
                </div>
            </div>
            <div class="content col-md-6">
                <button-add-row/>
                <font-awesome-icon icon="sync"/>
                <font-awesome-icon icon="save"/>
                <font-awesome-icon icon="undo"/>
                <button-changed></button-changed>
            </div>
        </div>
    </div>
</template>

<script>
    import buttonChanged from './components/buttonChanged.vue'
    import buttonAddRow from './components/buttonAddRow.vue'

    export default {
        name: 'navbar',
        components: {
            buttonChanged, buttonAddRow
        }      
    }
</script>

<style>
    @import '../assets/css/navbar.css';
</style>
