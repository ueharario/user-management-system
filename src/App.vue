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
          <!-- <tr>
            <td>
              {{ user.name }}
            </td>
            <td>
              {{ getGenderLabel(user.gender) }}
            </td>
          </tr> -->
          <tr v-for="userData in usersData" v-bind:key="userData.id">
              <td>
                {{ userData.name }}
              </td>
              <td>
                {{ getGenderLabel(userData.gender) }}
              </td>
              <td>
                <button class="btn btn-success" @click="edit(userData.id)">
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
// import { API_STATUS, DEFAULT_API_STATUS } from '@/constants/STATUS.js'
import { ApiGetUserData } from '@/api/api.js'

export default {
  data() {
    return {
      TITLE,
      user: {},
      editIndex: DEFAULT_EDIT_INDEX,
      usersData: [],
      // status_code: DEFAULT_API_STATUS.status,
      isShow: false
    }
  },
  components: {
    UserForm
  },
  /** async await を使う */
  async mounted() {
    /** callback を使った場合の呼び出し方 */
    // ApiGetUserData( ( result ) => {
    //   this.userData = result
    // })

    /** Promise を使った場合の呼び出し方 */
    // const { status_code, userData } = await ApiGetUserData()
    // if (status_code === API_STATUS.success.status && userData) {
    //   this.userData = userData
    //   alert(API_STATUS.success.msg)
    // } else {
    //   alert(API_STATUS.error.msg)
    // }

    /** 新規作成、編集 */
    const { usersData } = await ApiGetUserData()
    this.usersData = usersData
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
      this.user = {}
      this.editIndex = DEFAULT_EDIT_INDEX
    },
    edit(index) {
      this.editIndex = index
      this.user = this.usersData[index - 1]
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
