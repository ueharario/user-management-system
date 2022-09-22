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
                <button class="btn btn-secondary" @click="close">{{ TITLE.close }}</button>
                <button class="btn btn-warning" @click="save">{{ TITLE.save }}</button>
            </div>
        </div>
    </div>
</template>

<script>
import { GENDER_ARRAY, DEFAULT_USER, TITLE, DEFAULT_EDIT_INDEX } from '@/constants/USERS.js'

export default {
    props: {
        user: {
            type: Object,
            default: DEFAULT_USER
        },
        editIndex: {
            type: Number,
            default: DEFAULT_EDIT_INDEX
        },
        isShow: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            editUser: {},
            GENDER_ARRAY,
            TITLE
        }
    },
    mounted() {
        console.log(this.user)
        this.$watch(
            () => this.user,
            (newValue, oldValue) => {
                if (newValue !== oldValue) {
                    const { id, name, gender } = newValue
                    this.editUser = { id, name, gender }
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
            this.editUser = DEFAULT_USER
        },
        save() {
            this.$emit('send', this.editUser)
            this.close()
        }
    }
}
</script>