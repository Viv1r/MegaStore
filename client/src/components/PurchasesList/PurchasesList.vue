<template>

<div v-if="!user.loggedIn" class="message">Please log in!</div>

<template v-else-if="purchases.length">
    <div
        v-for="purchase in purchases"
        class="purchase"
        :key="purchase.id"
    >
        <div class="info">
            #{{ purchase.id }}
        </div>
        <div class="purchase_wrapper">
            <div class="products_list">
                <div
                    v-for="sale in purchase.sales"
                    class="product"
                    @click="openDetailedView(sale.product)"
                >
                    <div class="picture">
                        <img :src="sale.product?.picture || 'src/assets/pictures/no_picture.jpg'" alt="product picture">
                    </div>
                    <div class="info">
                        <div class="title">{{ sale.product?.title }}</div>
                        <div class="attributes">
                            Seller: {{ sale.seller?.title }}<br>
                            Count: {{ sale.product_count }}<br>
                            Total: ${{ sale.sum }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="summary">
                <div class="total">Total: {{ purchase.sum }}</div>
                <div class="date">{{ toDate(purchase.datetime) }}</div>
            </div>
        </div>
    </div>
</template>

<div v-else class="message">No purchases!</div>

</template>

<script>
import { mapMutations, mapState } from "vuex";
import axios from "axios";

export default {
    data() {
        return {
            purchases: []
        }
    },

    computed: {
        ...mapState('user', ['user'])
    },

    methods: {
        ...mapMutations(['openDetailedView']),

        toDate(datetime) {
            return new Date(datetime).toLocaleString();
        },

        async getPurchases() {
            const token = this.user.token;
            if (!token) {
                this.purchases = [];
                return;
            }

            const URL = 'api/purchase';
            const headers = {
                Authorization: 'Bearer ' + token
            }

            const response = await axios.get(URL, {
                headers: headers
            });
            const data = response.data;
            if (data?.purchases) {
                this.purchases = data.purchases;
            } else {
                this.purchases = [];
            }
        }
    },

    watch: {
        'user.loggedIn'() {
            this.getPurchases();
        }
    },

    mounted() {
        this.getPurchases();
    }
}
</script>

<style src="./PurchasesList.scss" scoped/>