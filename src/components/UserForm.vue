<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">{{ TITLE.card_title }}</h5>
            <div class="card-text">
                <form @submit="save">
                    <div class="form-group">
                        <label class="form-label">{{ TITLE.name }}</label>
                        <input type="text" class="form-control" v-model="name" required>
                        <p class="error form-text">{{ errors.name }}</p>
                    </div>
                    <div class="form-group">
                        <label class="form-label">{{ TITLE.gender }}</label>
                        <select class="form-control" v-model="gender" required>
                            <option v-for="column in GENDER_ARRAY" v-bind:key="column.id" :value="column.id">
                                {{ column.label }}
                            </option>
                        </select>
                        <p class="error form-text">{{ errors.gender }}</p>
                        <input class="form-control" v-if="isMale" type="text" placeholder="MaleMessage" v-model="maleMessage" required>
                        <p class="error form-text" v-if="isMale">{{ errors.maleMessage }}</p>
                        <input class="form-control" v-if="isFemale" type="text" placeholder="FemaleMessage" v-model="femaleMessage" required>
                        <p class="error form-text" v-if="isFemale">{{ errors.femaleMessage }}</p>
                    </div>
                    <div class="form-group float-right">
                        <button class="btn btn-outline-secondary btn-sm my-2 mr-2" @click="close">{{ TITLE.close }}</button>
                        <button class="btn btn-outline-warning btn-sm my-2" type="submit">{{ TITLE.save }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { GENDER, GENDER_ARRAY, DEFAULT_USER, DEFAULT_EDIT_INDEX, TITLE } from '@/constants/USERS.js'
import { useField, useForm } from 'vee-validate';
import { object, string } from 'yup';

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
    setup() {
        const schema = object({
            name: string().trim().required().min(2, 'Please enter a name of at least 2 characters.'),
            gender: string().required(),
            maleMessage: string().required('Please enter.'),
            femaleMessage: string().required('Please enter.')
        })
        const formValues = {
            name: DEFAULT_USER.name,
            gender: DEFAULT_USER.gender,
            maleMessage: DEFAULT_USER.maleMessage,
            femaleMessage: DEFAULT_USER.femaleMessage
        }
        const { errors } = useForm({
            validationSchema: schema,
            initialValues: formValues
        })
        const { value: name } = useField('name')
        const { value: gender } = useField('gender')
        const { value: maleMessage } = useField('maleMessage')
        const { value: femaleMessage } = useField('femaleMessage')
        return {
            name,
            gender,
            maleMessage,
            femaleMessage,
            errors
        }
    },
    computed: {
        isMale() {
            return this.gender === GENDER.male.id
        },
        isFemale() {
            return this.gender === GENDER.female.id
        }
    },
    mounted() {
        this.$watch(
            () => this.user,
            (newValue, oldValue) => {
                if (newValue !== oldValue) {
                    const { id, name, gender, maleMessage, femaleMessage } = newValue
                    this.editUser = { id, name, gender, maleMessage, femaleMessage }
                    this.id = newValue.id
                    this.name = newValue.name
                    this.gender = newValue.gender
                    this.maleMessage = newValue.maleMessage
                    this.femaleMessage = newValue.femaleMessage
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
        onSubmit() {
            this.save()
        },
        save() {
            this.editUser = {
                id: this.id,
                name: this.name,
                gender: this.gender,
                maleMessage: this.maleMessage,
                femaleMessage: this.femaleMessage
            }
            this.$emit('send', this.editUser)
            this.close()
        }
    }
}
</script>

<style scope>
.error {
    color: red;
}
</style>