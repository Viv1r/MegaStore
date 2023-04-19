<template>

<div class="dropdown-list">
    <div class="container">
        <div class="heading" @click="active = !active">
            <div class="title">{{ selectedItem?.name || placeholder }}</div>
            <img src="src/assets/svg/dropdown-arrow.svg" alt=" " class="arrow" :class="{ flip: active }">
            <div v-if="selectedItem" class="btn-clear" @click.stop="clear()">✖</div>
        </div>
        <div v-if="active" class="options">
            <div
                v-for="(option, index) in options"
                class="option"
                :class="{selected: selectedItem?.id === option.id}"
                @click="selectItem(option)"
                :key="index"
            >
                {{ option.name }}
            </div>
        </div>
    </div>
</div>

</template>

<script>
export default {
    data() {
        return {
            active: false
        }
    },
    props: {
        modelValue: {
            default: undefined
        },
        options: {
            type: Array,
            default: []
        },
        placeholder: {
            type: String,
            default: 'Select item'
        }
    },
    computed: {
        selectedItem() {
            return this.options.find((item) => item.id === this.modelValue);
        }
    },
    methods: {
        selectItem(item) {
            this.$emit('update:modelValue', item.id);
            this.active = false;
        },
        clear() {
            this.$emit('update:modelValue', undefined);
        }
    }
}
</script>

<style src="./DropdownList.scss" scoped></style>