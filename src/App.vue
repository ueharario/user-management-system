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
              {{ getGenderLabel(user.gender) }}
            </td>
          </tr>
          <tr>
            <td>
              {{ userData.name }}
            </td>
            <td>
              {{ getGenderLabel(userData.gender) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import UserForm from '@/components/UserForm.vue'
import { GENDER_ARRAY, DEFAULT_USER } from '@/constants/USERS.js'
import ApiGetUserData from '@/api/api.js'

export default {
  data() {
    return {
      title: 'ユーザ管理システム',
      user: DEFAULT_USER,
      userData: {},
      isShow: false,
    }
  },
  components: {
    UserForm
  },
  // computed は使わない。
  // computed: {
  //   genderLabel() {
  //     if (!this.userData.gender) { return }
  //     const targetGender = GENDER_ARRAY.find((v) => v.id === this.userData.gender)
  //     return targetGender.label
  //   }
  // },
  mounted() {
    this.userData = {
      ...DEFAULT_USER,
      ...this.json.userData
    }
    ApiGetUserData( ( result ) => {
      this.userData = result
    })
  },
  methods: {
    create() {
      this.open()
    },
    open() {
      this.isShow = true
    },
    getGenderLabel(gender) {
      const targetGender = GENDER_ARRAY.find((v) => v.id === gender)
      return targetGender.label
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
</style>
