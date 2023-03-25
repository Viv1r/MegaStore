<template>

<div class="purchases_page">
    <div class="main_title">Purchases history</div>
    <div class="container">
        <div class="purchases_list">
            <PurchasesList/>
        </div>
    </div>
</div>

</template>

<script>
import PurchasesList from "../../components/PurchasesList/PurchasesList.vue";

export default {
    components: {
        PurchasesList
    }
}
</script>

<style src="./PurchasesHistory.scss" scoped/>