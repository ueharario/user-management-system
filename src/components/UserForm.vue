<template>
    <div class="card">
        <div class="card-body">
            <div class="card-text">
                <form @submit="save">
                <div class="form-group">
                    <label>{{ TITLE.name }}</label>
                    <input type="text" class="form-control" v-model="name" required>
                    <p class="error">{{ errors.name }}</p>
                </div>
                <div class="form-group">
                    <label>{{ TITLE.gender }}</label>
                    <select class="form-group" v-model="gender" required>
                        <option v-for="column in GENDER_ARRAY" v-bind:key="column.id" :value="column.id">
                            {{ column.label }}
                        </option>
                    </select>
                    <p class="error">{{ errors.gender }}</p>
                    <input v-if="isMale" type="text" placeholder="Male" v-model="male" required>
                    <p class="error">{{ errors.male }}</p>
                    <input v-if="isFemale" type="text" placeholder="Female" v-model="female" required>
                    <p class="error">{{ errors.female }}</p>
                </div>
                <button class="btn btn-secondary" @click="close">{{ TITLE.close }}</button>
                <button class="btn btn-warning" type="submit">{{ TITLE.save }}</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { GENDER_ARRAY, DEFAULT_USER, TITLE, DEFAULT_EDIT_INDEX } from '@/constants/USERS.js'
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
            isVisible: false,
            GENDER_ARRAY,
            TITLE
        }
    },
    setup() {
        const schema = object({
            name: string().trim().required().min(2, 'Please enter a name of at least 2 characters.'),
            gender: string().required().matches(/^(?!gender)/, { message: 'Please select a gender.'}),
            male: string().trim().required('Please enter.'),
            female: string().required('Please enter.')
        })
        const formValues = {
            name: DEFAULT_USER.name,
            gender: DEFAULT_USER.gender
        }
        const { errors } = useForm({
            validationSchema: schema,
            initialValues: formValues
        })
        const { value: name } = useField('name')
        const { value: gender, meta } = useField('gender')
        const { value: male } = useField('male')
        const { value: female } = useField('female')
        return {
            name,
            gender,
            errors,
            meta,
            male,
            female
        }
    },
    computed: {
        isMale() {
            return this.gender === 1
        },
        isFemale() {
            return this.gender === 2
        }
    },
    mounted() {
        this.$watch(
            () => this.user,
            (newValue, oldValue) => {
                if (newValue !== oldValue) {
                    // const { id, name, gender } = newValue
                    // this.editUser = { id, name, gender }
                    const id = newValue.id
                    this.editUser.id = id
                    this.name = newValue.name
                    this.gender = newValue.gender
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
            this.editUser.name = this.name
            this.editUser.gender = this.gender
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