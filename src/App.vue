<template>
  <div id="app">
    <div class="container">
      <h2 class="text-center">{{ TITLE.title }}</h2>
      <UserForm v-if="isShow" @send="updateUser" @close="closeUserForm" :user="user" />
      <button class="btn btn-outline-success btn-sm my-2 float-right" @click="create">{{ TITLE.create }}</button>
      <table class="table table-striped mt-2">
        <thead class="thead-dark">
          <tr>
            <th>{{ TITLE.name }}</th>
            <th>{{ TITLE.gender }}</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" v-bind:key="user.id">
              <td class="col-md-5 align-middle">{{ user.name }}</td>
              <td class="col-md-5 align-middle">{{ getGenderLabel(user.gender) }}</td>
              <td class="col-md-1">
                <button class="btn btn-outline-primary btn-sm" @click="edit(user.id)">
                  {{ TITLE.edit }}
                </button>
              </td>
              <td class="col-md-1">
                <button class="btn btn-outline-danger btn-sm" @click="deleteItem(user.id)">
                  {{ TITLE.delete }}
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
  data() {
    return {
      TITLE,
      user: {},
      users: [],
      usersData: [],
      isShow: false
    }
  },
  components: {
    UserForm
  },
  async mounted() {
    const { usersData } = await ApiGetUserData()
    this.users = usersData
    this.sortItem()
  },
  methods: {
    create() {
      this.openUserForm()
    },
    openUserForm() {
      this.isShow = true
    },
    getGenderLabel(gender) {
      const targetGender = GENDER_ARRAY.find((v) => v.id === gender)
      return targetGender.label
    },
    updateUser(user) {
      if (user.id === undefined)
      {
        let maxId = 0
        for (let i = 0; i < this.users.length; i++) {
          if (maxId < this.users[i].id) maxId = this.users[i].id
        }
        user.id = maxId + 1
        this.users.push(user)
        this.sortItem()
      }
      else {
        this.users = this.users.filter((v) => v.id !== user.id )
        this.users.push(user)
        this.sortItem()
      }
    },
    closeUserForm(isShow) {
      this.isShow = isShow
      this.user = {}
      this.editIndex = DEFAULT_EDIT_INDEX
    },
    edit(id) {
      this.user = this.users.find((v) => v.id === id)
      this.openUserForm()
    },
    deleteItem(id) {
      this.users = this.users.filter((v) => v.id !== id )
      this.sortItem()
    },
    sortItem() {
      this.users.sort((before, after) => before.id - after.id)
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
