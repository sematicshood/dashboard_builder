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
                <button-save/>
                <button-cancel/>
                <button-changed></button-changed>
                <font-awesome-icon icon="sign-out-alt" />
            </div>
        </div>
    </div>
</template>

<script>
    import buttonChanged from './components/buttonChanged.vue'
    import buttonAddRow from './components/buttonAddRow.vue'
    import buttonSave from './components/selectComponent/buttonSaveComponent.vue'
    import buttonCancel from './components/selectComponent/buttonCancelComponent.vue'

    export default {
        name: 'navbar',
        components: {
            buttonChanged, buttonAddRow, buttonSave, buttonCancel
        }      
    }
</script>

<style>
    @import '../assets/css/navbar.css';
</style>
