<template>
    <div id="category">
        <b-form-select v-model="val" @change="change()" size="sm">
            <option v-for="category in categories" :value="category" v-text="category" ></option>
        </b-form-select>
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