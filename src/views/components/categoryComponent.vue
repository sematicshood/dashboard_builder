<template>
    <div id="category">
        <select v-model="val" @change="change()"  class="custom-select custom-select-sm">
            <option v-for="category in categories" :value="category" v-text="category" ></option>
        </select>
    </div>
</template>

<script>
    export default {
        name: 'category-component',

        data() {
            return {
                val: [],
                categories: ['crm', 'product', 'all', 'sale', 'hr', 'purchase']
            }
        },

        methods: {
            change() {
                this.$store.dispatch('models/setCategory', this.$data.val)
            }
        }
    }
</script>