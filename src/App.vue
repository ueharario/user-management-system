<template>
  <div id="app">
    <div class="home">
      <h2>{{ TITLE.title }}</h2>
      <button class="btn btn-primary my-2" @click="create">{{ TITLE.create }}</button>
      <UserForm v-if="isShow" @send="createUser" @close="closeUserForm" :user="user" />
      <table class="table">
        <thead>
          <tr>
            <th>{{ TITLE.name }}</th>
            <th>{{ TITLE.gender }}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" v-bind:key="user.id">
              <td>{{ user.name }}</td>
              <td>{{ getGenderLabel(user.gender) }}</td>
              <td>
                <button class="btn btn-success" @click="edit(user.id)">
                  {{ TITLE.edit }}
                </button>
              </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import UserForm from '@/components/UserForm.vue'
import { GENDER_ARRAY, TITLE, DEFAULT_EDIT_INDEX } from '@/constants/USERS.js'
import { ApiGetUserData } from '@/api/api.js'

export default {
  /** maybe! */
  data() {
    return {
      TITLE,
      user: {},
      users: [],
      usersData: [],
      editIndex: DEFAULT_EDIT_INDEX,
      isShow: false
    }
  },
  components: {
    UserForm
  },
  /** OK! */
  async mounted() {
    const { usersData } = await ApiGetUserData()
    this.usersData = usersData
    this.users = usersData
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
    /** NG! */
    createUser(user) {
      this.user = user
    },
    /** NG! */
    closeUserForm(isShow) {
      this.isShow = isShow
      this.user = {}
      this.editIndex = DEFAULT_EDIT_INDEX
    },
    /** OK! */
    edit(index) {
      this.editIndex = index -1
      this.user = this.users[this.editIndex]
      this.open()
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
