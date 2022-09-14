<template>
  <div id="app">
    <div class="home">
      <h1>{{ title }}</h1>
      <button class="btn btn-primary my-2" @click="create">新規作成</button>
      <UserForm v-if="isShow" @send="createUser" @close="closeUserForm" :user="user" />
      <table class="table">
        <tbody>
          <tr>
            <td>
              {{ user.name }}
            </td>
            <td>
              {{ user.gender }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import UserForm from '@/components/UserForm.vue'

export default {
  data() {
    return {
      title: 'ユーザ管理システム',
      user: {
        name: 'なまえ',
        gender: '男性'
      },
      isShow: false
    }
  },
  components: {
    UserForm
  },
  methods: {
    create() {
      this.open()
    },
    open() {
      this.isShow = true
    },
    createUser(user) {
      this.user = user
    },
    closeUserForm(isShow) {
      this.isShow = isShow
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 600px;
  margin: 0 auto;
}

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
</style>
