<template>
    <div id="navbar">
        <div class="container-2">
            <div class="logo-left col-md-6">
                <div class="logo-nav">
                    <img src="../assets/logo.jpg" alt="Logo Sematics">
                </div>
            </div>
            <div class="content col-md-6">
                <a href="#">
                    <button-add-row/> 
                </a>
                <button-sync/>
                <a href="#">
                    <button-save/>
                </a>
                <a href="#">
                    <button-cancel/>
                </a>
                <a href="#">
                    <button-changed></button-changed>
                </a>
                <a href="#">
                    <logout-button/>
                </a>                
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
    import buttonShare from './components/row/buttonShare.vue'

    export default {
        name: 'navbar',
        components: {
            buttonChanged, buttonAddRow, buttonSave, buttonCancel, logoutButton, buttonSync, buttonShare
        }      
    }
</script>

<style>
    @import '../assets/css/navbar.css';
</style>
