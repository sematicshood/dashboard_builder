<template>
    <div id="navbar">
        <div class="container-2">
            <div class="logo-left col-md-6">
                <div class="logo-nav">
                    <img src="../assets/logo.jpg" alt="Logo Sematics">
                </div>
            </div>
            <div class="content col-md-6">
                <button-sync/>
                <button-add-row/>  
                <button-save/>
                <button-cancel/>
                <button-changed></button-changed>
                <logout-button/>
            </div>
        </div>
    </div>
</template>

<script>
    import logoutButton from './components/logoutButton.vue'
    import buttonChanged from './components/buttonChanged.vue'
    import buttonAddRow from './components/buttonAddRow.vue'
    import buttonSave from './components/selectComponent/buttonSaveComponent.vue'
    import buttonCancel from './components/selectComponent/buttonCancelComponent.vue'
    import buttonSync from './components/row/buttonSync.vue'

    export default {
        name: 'navbar',
        components: {
            buttonChanged, buttonAddRow, buttonSave, buttonCancel, logoutButton, buttonSync
        }      
    }
</script>

<style>
    @import '../assets/css/navbar.css';
</style>
