<template>
  <div id="app">
    <div class="home">
      <h1>{{ title }}</h1>
      <button class="btn btn-primary my-2" @click="create">新規作成</button>
      <UserForm v-if="isShow" @send="createUser" @close="closeUserForm" :users="users" />
      <table class="table">
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>
              {{ user.name }}
            </td>
            <td>
              {{ replaceGender(user.gender) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import UserForm from '@/components/UserForm.vue'
import USERS from '@/constants/USERS.js'

export default {
  data() {
    return {
      title: 'ユーザ管理システム',
      users: [
        {
          name: 'なまえ',
          gender: USERS.GENDER.male.id
        }
      ],
      isShow: false,
      USERS
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
    replaceGender(gender) {
      const targetGender = USERS.GENDER_ARRAY.find((v) => v.id === gender)
      gender = targetGender.label
      return gender
    },
    createUser(user) {
      this.users.push(user)
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
