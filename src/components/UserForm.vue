<template>
    <div class="card">
        <div class="card-body">
            <div class="card-text">
                <div class="form-group">
                    <label>{{ TITLE.name }}</label>
                    <input type="text" class="form-control" v-model="editUser.name">
                    <p class="errors form-text" v-if="!!errors.name">{{ errors.name }}</p>
                </div>
                <div class="form-group">
                    <label>{{ TITLE.gender }}</label>
                    <select class="form-control" v-model="editUser.gender">
                        <option v-for="column in GENDER_ARRAY" v-bind:key="column.id" :value="column.id">
                            {{ column.label }}
                        </option>
                    </select>
                    <p class="errors form-text" v-if="!!errors.gender">{{ errors.gender }}</p>
                </div>
                <div class="form-group" v-if="isMale">
                    <input class="form-control" type="text" placeholder="Male_Message" v-model="editUser.maleMsg">
                    <p class="errors form-text" v-if="!!errors.maleMsg">{{ errors.maleMsg }}</p>
                </div>
                <div class="form-group" v-if="isFemale">
                    <input class="form-control" type="text" placeholder="Female_Message" v-model="editUser.femaleMsg">
                    <p class="errors form-text" v-if="!!errors.femaleMsg">{{ errors.femaleMsg }}</p>
                </div>
                <div class="form-group float-right">
                    <button class="btn btn-outline-secondary btn-sm my-2 mr-2" @click="close">{{ TITLE.close }}</button>
                    <button class="btn btn-outline-warning btn-sm my-2" @click="update" v-if="isEdit">{{ TITLE.update }}</button>
                    <button class="btn btn-outline-warning btn-sm my-2" @click="register" v-else>{{ TITLE.register }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { GENDER, GENDER_ARRAY, DEFAULT_USER, TITLE } from '@/constants/USERS.js'
import * as yup from "yup";

const UserSchema = yup.object().shape({
    name: yup.string().required('Name is required.'),
    gender: yup.string().required('Gender is a required selection.'),
    maleMsg: yup.string().when("gender", {
        is: 1 ,
        then: yup.string().required('This is a required message.')
    }),
    femaleMsg: yup.string().when('gender', {
        is: 2,
        then: yup.string().required('This is a required message.')
    })
})

export default {
    props: {
        user: {
            type: Object,
            default: DEFAULT_USER
        },
        isShow: {
            type: Boolean,
            default: false
        },
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            editUser: {},
            errors: DEFAULT_USER,
            GENDER_ARRAY,
            TITLE
        }
    },
    computed: {
        isMale() {
            return this.editUser.gender === GENDER.male.id
        },
        isFemale() {
            return this.editUser.gender === GENDER.female.id
        }
    },
    mounted() {
        this.$watch(
            () => this.user,
            (newValue, oldValue) => {
                if (newValue !== oldValue) {
                    const { id, name, gender, maleMsg, femaleMsg } = newValue
                    this.editUser = { id, name, gender, maleMsg, femaleMsg }
                }
            },
            {
                immediate: true,
                deep: true
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
        update() {
            UserSchema.validate(this.editUser, { abortEarly: false })
            .then(() => {
                console.log("clear")
                this.$emit('edit', this.editUser)
                this.close()
            })
            .catch((err) => {
                console.log("error")
                err.inner.forEach((error) => {
                    this.errors = { ...this.errors, [error.path]: error.message}
                })
            })
        },
        register() {
            UserSchema.validate(this.editUser, { abortEarly: false })
            .then(() => {
                console.log("clear")
                this.$emit('new', this.editUser)
                this.close()
            })
            .catch((err) => {
                console.log("error")
                err.inner.forEach((error) => {
                    this.errors = { ...this.errors, [error.path]: error.message}
                })
            })
        },
        validate(field) {
            UserSchema.validateAt(field, this.editUser)
                .then(() => (this.errors[field] = ''))
                .catch((err) => {
                    this.errors[err.path] = err.message
                })
        }
    }
}
</script>

<style scoped>
.errors {
  color: red;
}
</style>