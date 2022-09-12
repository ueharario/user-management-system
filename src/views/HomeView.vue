<template>
  <div class="home">
    <ul v-if="hasUsers">
      <li v-for="user in users" :key="user.id">
        <router-link :to="{name: 'edit', params: { id: user.id } }">
          {{ user.name }}
        </router-link>
      </li>
    </ul>
    <p v-else>ユーザー情報がありません</p>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  computed: {
    hasUsers() {
      return this.$store.getters.getCount
    },
    users() {
      return this.$store.getters.getAll
    }
  }
}
</script>

<style scoped>
ul {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

li a {
  color: #999;
  text-decoration: none;
  width: 100%;
  display: block;
}
</style>