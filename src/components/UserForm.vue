<template>
    <div class="card">
        <div class="card-body">
            <div class="card-text">
                <div class="form-group">
                    <input type="text" class="form-control" v-model="editUser.name">
                </div>
                <div class="form-group">
                    <select class="form-group" v-model="editUser.gender">
                        <option disabled="disabled">選択してください</option>
                        <option>男性</option>
                        <option>女性</option>
                    </select>
                </div>
                <button @click="close">やめる</button>
                <button @click="save">更新</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        user: Object,
        isShow: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            editUser: {
                name: '',
                gender: ''
            }
        }
    },
    mounted() {
        this.$watch(
            () => this.user,
            (newValue, oldValue) => {
                if (newValue !== oldValue) {
                    this.editUser.name = newValue.name
                    this.editUser.gender = newValue.gender
                }
            },
            {
                immediate: true,
                deep: true,
            }
        )
    },
    methods: {
        close() {
            this.reset()
            this.$emit('close', false)
        },
        reset() {
            this.editUser = null
        },
        save() {
            this.$emit('send', this.editUser)
            this.close()
        }
    }
}
</script>