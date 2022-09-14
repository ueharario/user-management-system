<template>
  <div id="app">
    <div class="home">
      <h1>{{ title }}</h1>
      <button class="btn btn-primary my-2" @click="create">新規作成</button>
      <UserForm v-if="isShow" @send="createUser" @close="closeUserForm" :name="name" />
      <ul>
        <li>
          {{ name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import UserForm from '@/components/UserForm.vue'

export default {
  data() {
    return {
      title: 'ユーザ管理システム',
      name: 'なまえ',
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
    createUser(name) {
      this.name = name
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
