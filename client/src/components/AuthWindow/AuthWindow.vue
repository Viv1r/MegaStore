<template>

<div class="auth_window_wrapper" @click="$emit('close')">
    <div class="auth_window" @click.stop>
        <div class="btn_close" @click="$emit('close')">✕</div>
        <div class="switcher_wrapper">
            Log in
            <Switcher @switchOn="registerMode = true" @switchOff="registerMode = false"/>
            Register
        </div>
        <div class="form_wrapper">
            <template v-if="registerMode">
                <div class="field_wrapper">
                    Name
                    <input type="text" v-model="form.name" @keydown.enter="register()">
                </div>
                <div class="field_wrapper">
                    E-mail
                    <input type="text" v-model="form.email" @keydown.enter="register()">
                </div>
                <div class="field_wrapper">
                    Password
                    <input type="password" v-model="form.password" @keydown.enter="register()">
                </div>
                <div class="field_wrapper">
                    Confirm password
                    <input type="password" v-model="form.passwordConfirm" @keydown.enter="register()">
                </div>

                <div v-if="authError" class="error_message">{{ authError }}</div>
                <button class="btn_auth" :class="{active: canSubmit}" @click="register()">
                    <template v-if="processingAuth">...</template>
                    <template v-else>Register</template>
                </button>
            </template>

            <template v-else>
                <div class="field_wrapper">
                    E-mail
                    <input type="text" v-model="form.email" @keydown.enter="login()">
                </div>
                <div class="field_wrapper">
                    Password
                    <input type="password" v-model="form.password" @keydown.enter="login()">
                </div>

                <div v-if="authError" class="error_message">{{ authError }}</div>
                <button class="btn_auth" :class="{active: canSubmit}" @click="login()">
                    <template v-if="processingAuth">...</template>
                    <template v-else>Log in</template>
                </button>
            </template>
        </div>
    </div>
</div>

</template>

<script>
import { mapState } from 'vuex';
import Switcher from '../Switcher/Switcher.vue';

export default {
    components: {
        Switcher
    },
    
    data() {
        return {
            registerMode: false,
            form: {
                email: '',
                name: '',
                password: '',
                passwordConfirm: ''
            }
        }
    },

    computed: {
        ...mapState(['authError', 'processingAuth']),

        formValid() {
            if (this.registerMode) {
                if (Object.values(this.form).some(elem => !elem)) return false;
                if (this.form.password !== this.form.passwordConfirm) return false;
            } else {
                if (!(this.form.email && this.form.password)) return false;
            }
            return true;
        },
        
        canSubmit() {
            return this.formValid && !this.processingAuth;
        }
    },

    methods: {
        register() {
            if (!this.canSubmit) return;
            this.$store.dispatch('user/register', this.form);
        },

        login() {
            if (!this.canSubmit) return;
            this.$store.dispatch('user/login', {
                email: this.form.email,
                password: this.form.password
            });
        }
    },

    emits: ['close']
}
</script>

<style src="./AuthWindow.scss" scoped/>