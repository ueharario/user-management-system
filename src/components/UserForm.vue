<template>
    <div class="card">
        <div class="card-body">
            <div class="card-text">
                <div class="form-group">
                    <label>{{ TITLE.name }}</label>
                    <input type="text" class="form-control" v-model="editUser.name">
                </div>
                <div class="form-group">
                    <label>{{ TITLE.gender }}</label>
                    <select class="form-control" v-model="editUser.gender">
                        <option v-for="column in GENDER_ARRAY" v-bind:key="column.id" :value="column.id">
                            {{ column.label }}
                        </option>
                    </select>
                </div>
                <div class="form-group float-right">
                    <button class="btn btn-outline-secondary btn-sm my-2 mr-2" @click="close">{{ TITLE.close }}</button>
                    <button class="btn btn-outline-warning btn-sm my-2" @click="save">{{ TITLE.save }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { GENDER_ARRAY, DEFAULT_USER, TITLE } from '@/constants/USERS.js'

export default {
    props: {
        user: {
            type: Object,
            default: DEFAULT_USER
        },
        isShow: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            editUser: {},
            // editFlag: true,
            GENDER_ARRAY,
            TITLE
        }
    },
    mounted() {
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
            // this.$emit('send', this.editFlag)
            this.$emit('send', this.editUser)
            this.close()
        }
    }
}
</script>