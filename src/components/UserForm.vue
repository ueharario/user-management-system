<template>
    <div class="card">
        <div class="card-body">
            <div class="card-text">
                <div class="form-group">
                    <input type="text" class="form-control" v-model="editUser.name">
                </div>
                <div class="form-group">
                    <select class="form-group" v-model="editUser.gender">
                        <option v-for="column in GENDER_ARRAY" v-bind:key="column.id" :value="column.id">
                            {{ column.label }}
                        </option>
                    </select>
                </div>
                <button @click="close">やめる</button>
                <button @click="save">更新</button>
            </div>
        </div>
    </div>
</template>

<script>
import { GENDER, GENDER_ARRAY } from '@/constants/USERS.js'

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
                gender: GENDER.male.id
            },
            GENDER,
            GENDER_ARRAY
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