<template>
    <div class="card">
        <div class="card-body">
            <div class="card-text">
                <div class="form-group">
                    <input type="text" class="form-control" v-model="name">
                </div>
                <div class="form-group">
                    <select class="form-group" v-model="gender">
                        <option disabled="disabled">選択してください</option>
                        <option value="男性">男性</option>
                        <option value="女性">女性</option>
                    </select>
                </div>
                <button @click="cancel">やめる</button>
                <button @click="save">更新</button>
            </div>
        </div>
    </div>
</template>

<script>
export const USER = {
    id: 0,
    name: '',
    gender: ''
}

export default {
    props: {
        USER: Object
    },
    data() {
        return {
            id: 0,
            name: '',
            gender: ''
        }
    },
    methods: {
        cancel() {
            this.reset()
            this.isShowCreate = false
        },
        reset() {
            this.name = '',
            this.gender = ''
        },
        save() {
            let user = {
                name: this.name,
                gender: this.gender
            }
            this.$emit('save', user)
            this.reset()
        }
    }
}
</script>