<template>
  <div>
    <input type="text" v-model="name">
  </div>
  <div>
    <input type="radio" value="男性" v-model="gender">男性
    <input type="radio" value="女性" v-model="gender">女性
  </div>
  <div class="center">
    <!-- <button @click="save">保存</button> -->
    <!-- <button @click="remove" v-if="user.id">削除</button> -->
  </div>
</template>

<script>
// export default {
//     name: 'UserForm',
//     props: [
//         'user'
//     ],
//     data() {
//         return {
//             name: this.user.name,
//             gender: this.user.gender
//         }
//     },
//     methods: {
//         save() {
//             let user = {
//                 name: this.name,
//                 gender: this.gender
//             }
//             if (this.user.id) {
//                 user.id = this.user.id
//             }
//             this.$store.commit('save', user)
//             this.$router.push('/')
//         },
//         remove() {
//             this.$store.commit('delete', this.user.id)
//             this.$router.push('/')
//         }
//     }
// }
</script>

<style scoped>
div {
    margin-bottom: 10px;
}
input[type=text] {
    width: 100%;
}
textarea {
    width: 100%;
    height: 30em;
}
button {
    width:5em;
    margin: 3px;
}
.center {
    text-align: center;
}
</style>