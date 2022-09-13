<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <h1>{{ title }}</h1>
                <button class="btn btn-primary my-2" @click="create">新規作成</button>
                <CreateView v-if="isShowCreate" />
                <EditView v-if="isShowEdit" />
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th>名前</th>
                            <th>性別</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id">
                            <td>{{ user.name }}</td>
                            <td>{{ user.gender }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import CreateView from './CreateView.vue'
import EditView from './EditView.vue'
import USERS from '@/constants/USERS.js'

export default {
    data() {
        return {
            title: 'ユーザ管理システム',
            user: {
                id: '',
                name: '',
                gender: ''
            },
            users: [],
            isShowCreate: false,
            // isShowEdit: false
        }
    },
    components: {
        CreateView,
        EditView,
    },
    created() {
        this.users = USERS
    },
    methods: {
        create() {
            this.openCreate()
        },
        openCreate() {
            this.isShowCreate = true
        }
    }
}
</script>