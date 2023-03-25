<template>
    <div class="title">Filters</div>
    <div class="filters_list">
        <div class="filter_wrapper">
            <label>Keywords</label>
            <input type="text">
        </div>
        <div class="filter_wrapper">
            <label>Manufacturer</label>
            <div class="checkbox_wrapper">
                <input type="checkbox" id="val1">
                <label for="val1">Value 1</label>
            </div>
            <div class="checkbox_wrapper">
                <input type="checkbox" id="val2">
                <label for="val2">Value 2</label>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style src="./ProductsFiltering.scss" scoped/>