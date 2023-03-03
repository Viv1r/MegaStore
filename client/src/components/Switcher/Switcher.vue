<template>
    <div class="switcher" :class="{active: active}" @click="turn()">
        <div class="switch"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: false
        }
    },
    methods: {
        turn() {
            this.active = !this.active;
            if (this.active) this.$emit('switchOn')
            else this.$emit('switchOff');
        }
    },
    emits: ['switchOn', 'switchOff']
}
</script>

<style lang="scss" scoped>
    .switcher {
        width: 36px;
        height: 22px;
        border-radius: 10px;
        background-color: #acacac;
        box-shadow: inset 0 0 5px rgba($color: #000000, $alpha: .5);
        transition: all .15s ease-in-out;
        cursor: pointer;
        user-select: none;

        &.active {
            background-color: lime;

            .switch {
                transform: translateX(28px);
            }
        }
    }

    .switch {
        position: absolute;
        width: 20px;
        height: 28px;
        top: -3px;
        left: -6px;
        border: 1px solid #7f7f7f;
        border-radius: 8px;
        background-color: #ffffff;
        transition: all .15s ease-in-out;
    }
</style>