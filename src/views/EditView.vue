<template>
    <UserForm v-if="user" :user="user" />
    <p v-else>指定されたユーザー情報はありません</p>
</template>

<script>
import UserForm from '@/components/UserForm.vue'
export default {
    name: 'EditView',
    components: {
        UserForm
    },
    computed: {
        user() {
            const id = parseInt(this.$route.params.id)
            return this.$store.getters.getUserById(id)
        }
    }
}
</script>