<template>

<div class="detailed_view_wrapper" @click="openDetailedView(null)">
    <div class="item_card" @click.stop>
        <div class="btn_close" @click="openDetailedView(null)">✕</div>
        <div class="content">
            <div class="left_side">
                <div class="picture">
                    <img
                        :src="product.picture ? product.picture : 'src/assets/pictures/no_picture.jpg'"
                        :alt="product.title"
                    >
                </div>
            </div>
            <div class="right_side">
                <div class="info_block">
                    <div class="title">{{ product.title }}</div>
                    <div v-if="product.category" class="category">{{ product.category.name }}</div>
                    <div class="description">{{ product.description }}</div>
                </div>

                <div v-if="!loadedProduct" class="loading_indicator">Loading...</div>

                <template v-if="product.attributes">
                    <div class="divider"></div>
                    <div class="attributes_block">
                        <div class="title">Attributes</div>
                        <table class="attributes">
                            <tr v-for="(attribute, key) in product.attributes">
                                <td class="attribute_name">{{ key }}</td>
                                <td class="attribute_value">{{ attribute }}</td>
                            </tr>
                        </table>
                    </div>
                </template>

                <template v-if="product.reviews">
                    <div class="divider"></div>
                    <div class="reviews_block">
                        <!-- Отзывы -->
                    </div>
                </template>

                <div class="divider"></div>

                <div class="seller_block" v-if="product.store">
                    <div class="title">Seller:</div> {{ product.store.name }}
                </div>

                <div class="actions_block">
                    <div class="price">
                        {{ '$' + Number(product.price).toFixed(2) }}
                        <div class="postfix" v-if="product.pricePostfix">{{ product.pricePostfix }}</div>
                    </div>


                    <div v-if="!product.countAvailable" class="out_of_stock" @click.stop>Out of stock!</div>

                    <div v-else-if="cartGetCount(product.id)" class="count_selector" @click.stop>
                        <button class="btn_decrease"
                                @click="cartAddCount({id: product.id, count: -1})"
                        >-</button>
                        <input type="text"
                               @keydown.enter="cartSetCount({id: product.id, target: $event.target})"
                               @focusout="cartSetCount({id: product.id, target: $event.target})"
                               :value="cartGetCount(product.id)"
                        >
                        <button class="btn_increase"
                                @click="cartAddCount({id: product.id, count: 1})"
                        >+</button>
                    </div>

                    <div v-else class="btn_add_item" @click.stop="addToCart(product)">Add to cart</div>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import axios from 'axios';

export default {
    data() {
        return {
            loadedProduct: null
        }
    },

    computed: {
        ...mapState(['detailedViewProduct']),
        ...mapGetters('cart', ['cartGetCount']),

        product() {
            return this.loadedProduct || this.detailedViewProduct;
        }
    },

    methods: {
        ...mapMutations('cart', ['addToCart', 'cartAddCount', 'cartSetCount']),
        ...mapMutations(['openDetailedView']),

        async loadProduct() {
            const URL = 'api/products/' + this.detailedViewProduct.id;

            const result = await axios.get(URL);
            const data = result.data;
            
            if (data?.product) {
                const product = data.product;

                this.loadedProduct = {
                    id: product.id,
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    attributes: product.attributes,
                    countAvailable: product.count_available,
                    pricePostfix: product.price_postfix,
                    store: product.store,
                    category: product.category,
                    picture: product.picture
                };
            }
        }
    },

    mounted() {
        this.loadProduct();
    }
}
</script>

<style src="./DetailedView.scss" scoped/>