<template>
    <div class="sidebar">
        <div class="sidebar__top_block">
            <div class="btn_close" @click="$emit('close')">
                <img src="../../assets/svg/menu.svg" alt="menu">
            </div>
        </div>
        <a v-for="category in categories" class="sidebar__link" @click="goToCatalog(category.id)">
          {{ category.name }}
        </a>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState(['categories'])
    },
    methods: {
        goToCatalog(categoryId) {
            this.$router.push({ path: '/catalog', query: { category: categoryId }});
            this.$emit('close');
        }
    },
    emits: ['close']
}
</script>

<style src="./Sidebar.scss" scoped/>