<template>

<div class="edit_profile_wrapper" @click="$emit('close')">
  <div class="edit_profile" @click.stop>
    <div class="btn_close" @click="$emit('close')">✕</div>

    <div class="title">Edit profile</div>
    <form>
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
          <label>Name</label>
          <input type="text" class="base_input" :value="user.name" disabled>
        </div>
        <div class="input_wrapper">
          <label>E-mail</label>
          <input type="text" class="base_input" :value="user.email" disabled>
        </div>
        <div class="input_wrapper">
          <label>Password</label>
          <input type="password" class="base_input" value="pwd_placeholder" disabled>
        </div>
      </div>
    </form>
    <button class="btn-apply">Apply</button>
  </div>
</div>

</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('user', ['user'])
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
        this.updateProfilePicture(imageBase64);
      }
    }
  },
  emits: ['close']
}
</script>

<style src="./EditProfile.scss" scoped/>