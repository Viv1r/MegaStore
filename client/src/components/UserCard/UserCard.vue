<template>
  <div class="user_card">
    <div class="user_info">
      <div class="profile_picture">
        <img :src="user.profilePicture || 'src/assets/pictures/no_picture.jpg'" alt="picture">
      </div>
      <div class="name">{{ user.name }}</div>
      <div class="email">{{ user.email }}</div>
    </div>
    <div class="actions_list">
      <div class="link" @click="$emit('editProfile')">Edit profile</div>
      <div class="link" @click="$emit('purchases')">Purchases history</div>
      <a class="link" href="api/crm">Manage stores</a>
      <div class="link huge" @click="logout()">Logout</div>
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
    ...mapActions('user', ['logout'])
  },
  emits: ['purchases', 'editProfile']
}
</script>

<style src="./UserCard.scss" scoped/>