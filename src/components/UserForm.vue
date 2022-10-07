<template>
    <div class="card">
        <div class="card-body">
            <div class="card-text">
                <div class="group-form">
                    <label>{{ TITLE.name }}</label>
                    <InputText v-model="editUser.name" @blur="validate('name')" />
                    <p class="errors form-text" v-if="!!errors.name">{{ errors.name }}</p>
                </div>
                <div class="form-group">
                    <label>{{ TITLE.gender }}</label>
                    <SelectItem v-model="editUser.gender" :options="GENDER_ARRAY" @blur="validate('gender')" />
                    <p class="errors form-text" v-if="!!errors.gender">{{ errors.gender }}</p>
                </div>
                <div class="form-group" v-if="isMale">
                    <InputText placeholder="Male_Message" v-model="editUser.maleMsg" @blur="validate('maleMsg')" />
                    <p class="errors form-text" v-if="!!errors.maleMsg">{{ errors.maleMsg }}</p>
                </div>
                <div class="form-group" v-if="isFemale">
                    <InputText placeholder="Female_Message" v-model="editUser.femaleMsg" @blur="validate('femaleMsg')" />
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
import InputText from '@/components/InputText.vue'
import SelectItem from '@/components/SelectItem.vue'
import { GENDER, GENDER_ARRAY, DEFAULT_USER, TITLE } from '@/constants/USERS.js'
import * as yup from "yup";

const UserSchema = yup.object().shape({
    name: yup.string().required('Name is required.'),
    gender: yup.number().required('Gender is a required selection.'),
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
    components: {
        InputText,
        SelectItem
    },
    computed: {
        isMale() {
            return Number(this.editUser.gender) === GENDER.male.id
        },
        isFemale() {
            return Number(this.editUser.gender) === GENDER.female.id
        }
    },
    mounted() {
        this.$watch(
            () => this.user,
            (newValue, oldValue) => {
                if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
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
                this.$emit('edit', this.editUser)
                this.close()
            })
            .catch((err) => {
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