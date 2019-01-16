<template>
    <div id="category">
        <select v-model="val" @change="change()"  class="custom-select custom-select-sm">
            <option v-for="(category, i) in categories" :value="category" v-text="category" :key="i"></option>
        </select>
    </div>
</template>

<script>
    export default {
        name: 'category-component',

        data() {
            return {
                val: [],
                categories: ['all', 'penjualan', 'pembelian', 'crm', 'kontak', 'proyek', 'penagihan', 'timesheet', 'karyawan', 'produk', 'beban']
            }
        },

        methods: {
            change() {
                this.$store.dispatch('models/setCategory', this.$data.val)
            }
        }
    }
</script>