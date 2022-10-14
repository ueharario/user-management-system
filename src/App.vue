<template>
  <div id="app">
    <div class="container">
      <h2 class="text-center">{{ TITLE.title }}</h2>
      <UserForm v-if="isShow" @new="newUser" @edit="editUser" @close="closeUserForm" :user="user" :isEdit="isEdit" />
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
          <tr v-for="user in $store.state.users" v-bind:key="user.id">
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
      <div>{{ $store.state.message }}</div>
      <PopupDialog />
    </div>
  </div>
</template>

<script>
import UserForm from '@/components/UserForm.vue'
import PopupDialog from '@/components/PopupDialog.vue'
import { GENDER_ARRAY, TITLE, DEFAULT_EDIT_INDEX } from '@/constants/USERS.js'
// import { ApiGetUserData } from '@/api/api.js'
import IssueId from '@/utils/IssueId'

export default {
  data() {
    return {
      TITLE,
      user: {},
      // users: [],
      usersData: [],
      isShow: false,
      isEdit: true
    }
  },
  components: {
    UserForm,
    PopupDialog
  },
  async mounted() {
    // const { usersData } = await ApiGetUserData()
    const { usersData } = await this.$store.state.users
    this.users = usersData
    // this.sortItem()
  },
  methods: {
    create() {
      this.isEdit = false
      this.openUserForm()
    },
    openUserForm() {
      this.isShow = true
    },
    getGenderLabel(gender) {
      const targetGender = GENDER_ARRAY.find((v) => v.id === Number(gender))
      return targetGender.label
    },
    newUser(user) {
      user.id = IssueId(this.users, user)
      this.users.push(user)
      this.sortItem()
    },
    editUser(user) {
      this.users = this.users.filter((v) => v.id !== user.id)
      this.users.push(user)
      this.sortItem()
    },
    closeUserForm(isShow) {
      this.isShow = isShow
      this.user = {}
      this.editIndex = DEFAULT_EDIT_INDEX
    },
    edit(id) {
      this.isEdit = true
      this.user = this.users.find((v) => v.id === id)
      this.openUserForm()
    },
    deleteItem(id) {
      this.users = this.users.filter((v) => v.id !== id )
      this.sortItem()
    },
    sortItem() {
      this.users.sort((prev, nxt) => prev.id - nxt.id)
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

#overlay{
  z-index:1;

  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);

  display: flex;
  align-items: center;
  justify-content: center;
}

#content{
  z-index:2;
  width:50%;
  padding: 1em;
  background:#fff;
}
</style>
