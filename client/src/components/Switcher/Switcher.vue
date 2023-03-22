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
        border-radius: 11px;
        background-color: #acacac;
        box-shadow: inset 0 0 5px rgba($color: #000000, $alpha: .5);
        transition: all .15s ease-in-out;
        cursor: pointer;
        user-select: none;

        &.active {
            background-color: lime;

            .switch {
                transform: translateX(14px);
            }
        }
    }

    .switch {
        position: absolute;
        width: 22px;
        height: 22px;
        border: 1px solid #7f7f7f;
        border-radius: 50%;
        background-color: #ffffff;
        transition: all .15s ease-in-out;
    }
</style>