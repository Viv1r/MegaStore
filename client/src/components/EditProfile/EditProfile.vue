<template>

<div class="edit_profile_wrapper" @click="$emit('close')">
  <div class="edit_profile" @click.stop>
    <div class="btn_close" @click="$emit('close')">✕</div>

    <div class="title">Edit profile</div>
    <form @keydown.enter="sendForm()">
      <div class="container">
        <div class="input_wrapper">
          <label for="inp_profile_picture" class="upload_picture">
            Profile picture
            <div class="profile_picture">
              <img :src="user.profilePicture || 'src/assets/pictures/no_picture.jpg'" alt="picture">
            </div>
          </label>
          <input
            type="file"
            id="inp_profile_picture"
            class="image_input"
            accept="image/jpeg, image/png"
            @change="updatePicture($event.target.files[0])"
          >
        </div>
      </div>
      <div class="container">
        <div class="input_wrapper">
          <label>E-mail</label>
          <input type="text" class="base_input" :value="user.email" disabled>
        </div>
        <div class="input_wrapper">
          <label>Name</label>
          <input type="text" class="base_input" v-model="form.name">
        </div>
        <div class="subtitle">In order to change password</div>
        <div class="input_wrapper">
          <label>Old password</label>
          <input type="password" class="base_input" v-model="form.oldPassword">
        </div>
        <div class="input_wrapper">
          <label>New password</label>
          <input type="password" class="base_input" v-model="form.password" :disabled="!form.oldPassword.length">
        </div>
      </div>
    </form>
    <button class="btn-apply" @click.prevent="sendForm()">Apply</button>
  </div>
</div>

</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      form: {
        name: '',
        oldPassword: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState('user', ['user'])
  },
  mounted() {
    this.form.name = this.user.name;
  },
  methods: {
    ...mapActions('user', ['updateProfilePicture']),

    convertToBase64(file) {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result.split(',').splice(1).toString());
        };
        reader.readAsDataURL(file);
      })
    },

    async updatePicture(image) {
      const imageBase64 = await this.convertToBase64(image);
      if (imageBase64) {
        this.$store.dispatch('user/updateProfilePicture', imageBase64);
      }
    },

    async sendForm() {
      await this.$store.dispatch('user/updateUserData', this.form);
    }
  },
  emits: ['close']
}
</script>

<style src="./EditProfile.scss" scoped/>