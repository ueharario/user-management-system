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
    </div>
  </div>
</template>

<script>
import UserForm from '@/components/UserForm.vue'
import { GENDER_ARRAY, TITLE, DEFAULT_EDIT_INDEX } from '@/constants/USERS.js'

export default {
  data() {
    return {
      TITLE,
      user: {},
      isShow: false,
      isEdit: true
    }
  },
  components: {
    UserForm
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
    /**
     * 新規作成
     * @param {object} user 登録するユーザ
     */
    createUser(user) {
      this.$store.dispatch('UsersApi/createUser', user)
    },

    /**
     * 編集
     * @param {object} user 更新するユーザ
     */
    updateUser(user) {
      this.$store.dispatch('UsersApi/updateUser', user)
    },

    /**
     * 削除
     * @param {object} user 削除するユーザ
     */
    deleteUser(user) {
      this.$store.dispatch('UsersApi/deleteUser', user)
    },

    /**
     * 新規作成モード
     */
    create() {
      this.isEdit = false
      this.openUserForm()
    },

    /**
     * 編集モード
     * @param {number} id 選択したユーザの id
     */
    update(id) {
      this.isEdit = true
      this.user = this._users.find((v) => v.id === id)
      this.openUserForm()
    },

    /**
     * 性別のラベル表示
     * @param {number} gender 1: Male, 2: Female
     */
    getGenderLabel(gender) {
      const targetGender = GENDER_ARRAY.find((v) => v.id === Number(gender))
      return targetGender.label
    },

    /**
     * UserForm を開く
     */
    openUserForm() {
      this.isShow = true
    },

    /**
     * UserForm を閉じる
     * @param {boolean} isShow コンポーネントんの表示切替
     */
    closeUserForm(isShow) {
      this.isShow = isShow
      this.user = {}
      this.editIndex = DEFAULT_EDIT_INDEX
      this.sortUser()
    },

    /**
     * user を id 順に並び替える
     */
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
</style>
