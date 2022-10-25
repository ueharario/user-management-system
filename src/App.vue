<template>
  <div id="app">
    <div class="container">
      <h2 class="text-center">{{ TITLE.title }}</h2>
      <UserForm v-if="isShow" @new="createUser" @edit="updateUser" @close="closeUserForm" :user="user" :isEdit="isEdit" />
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
          <tr v-for="user in _users" :key="user.id">
              <td class="col-md-5 align-middle">{{ user.name }}</td>
              <td class="col-md-5 align-middle">{{ getGenderLabel(user.gender) }}</td>
              <td class="col-md-1">
                <button class="btn btn-outline-primary btn-sm" @click="update(user.id)">
                  {{ TITLE.edit }}
                </button>
              </td>
              <td class="col-md-1">
                <button class="btn btn-outline-danger btn-sm" @click="deleteUser(user.id)">
                  {{ TITLE.delete }}
                </button>
              </td>
          </tr>
        </tbody>
      </table>
      <PopupDialog />
      <!-- <PopupDialog @confirm="confirm" /> -->
    </div>
  </div>
</template>

<script>
import UserForm from '@/components/UserForm.vue'
import PopupDialog from '@/components/PopupDialog.vue'
import { GENDER_ARRAY, TITLE, DEFAULT_EDIT_INDEX } from '@/constants/USERS.js'

export default {
  data() {
    return {
      TITLE,
      user: {},
      isShow: false,
      isEdit: true,
      // hoge: false
    }
  },
  components: {
    UserForm,
    PopupDialog
  },
  computed: {
    _users() {
      return this.$store.getters['UsersApi/_users']
    }
  },
  async created() {
    await this.$store.dispatch('UsersApi/fetchUsers')
  },
  methods: {
    // confirm(value) {
    //   this.hoge = value
    //   console.log(this.hoge)
    // },
    createUser(user) {
      this.$store.dispatch('UsersApi/createUser', user)
    },
    updateUser(user) {
      this.$store.dispatch('UsersApi/updateUser', user)
    },
    deleteUser(user) {
      this.$store.dispatch('UsersApi/deleteUser', user)
    },

    /** 新規作成モード */
    create() {
      this.isEdit = false
      this.openUserForm()
    },

    /** 編集モード */
    update(id) {
      this.isEdit = true
      this.user = this._users.find((v) => v.id === id)
      this.openUserForm()
    },

    /** 性別のラベル表示 */
    getGenderLabel(gender) {
      const targetGender = GENDER_ARRAY.find((v) => v.id === Number(gender))
      return targetGender.label
    },

    /** UserForm を開く */
    openUserForm() {
      this.isShow = true
    },

    /** UserForm を閉じる */
    closeUserForm(isShow) {
      this.isShow = isShow
      this.user = {}
      this.editIndex = DEFAULT_EDIT_INDEX
      this.sortUser()
    },

    /** user を id 順に並び替える */
    sortUser() {
      this._users.sort((prev, nxt) => prev.id - nxt.id)
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
