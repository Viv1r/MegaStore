<template>

<div class="main_page">
    <div class="container_featured">
        <div class="header_main">Featured products</div>
        <div class="product_list_inline">
            <ProductList
                :startIndex="0"
                :endIndex="4"
            />
        </div>
        <div class="btn_more">More products</div>
    </div>
    <div class="container_recommended">
        <div class="header_main">Recommended for you</div>
        <div class="product_list_inline">
            <ProductList
                :startIndex="0"
                :endIndex="4"
                :reversed="true"
            />
        </div>
    </div>
    <div class="container_catalog_reference">
        <div class="container_catalog_reference__content">
            <div class="header_bigger">Looking for something else?</div>
            <div class="btn_catalog">Open the catalog</div>
        </div>
    </div>
</div>

</template>

<script>
import ProductList from "@/components/ProductList/ProductList.vue";

export default {
    components: {
        ProductList
    }
}
</script>

<style src="./HomeView.scss" scoped/>