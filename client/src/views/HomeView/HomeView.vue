<template>

<Transition name="grow">
  <div class="main_page" v-if="productList.length">
    <div class="container_featured">
      <div class="header_main">Featured products</div>
      <div class="product_list_inline">
        <ProductList
          :startIndex="0"
          :endIndex="4"
        />
      </div>
      <routerLink to="/catalog" class="btn_more">More products</routerLink>
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
        <routerLink to="/catalog" class="btn_catalog">Open the catalog</routerLink>
      </div>
    </div>
  </div>
</Transition>

</template>

<script>
import ProductList from "@/components/ProductList/ProductList.vue";
import { mapState } from "vuex";

export default {
    components: {
        ProductList
    },
    computed: {
        ...mapState(['productList'])
    }
}
</script>

<style src="./HomeView.scss" scoped/>