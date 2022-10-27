<template>
    <div id="overlay">
        <div id="content">
            <div class="group-form">
                <label>{{ TITLE.name }}</label>
                <InputTextName v-model="editUser.name" :editUser="editUser" @blur="validate('name')" />
                <p class="errors form-text" v-if="!!errors.name">{{ errors.name }}</p>
            </div>
            <div class="form-group">
                <label>{{ TITLE.gender }}</label>
                <SelectItem v-model="editUser.gender" :editUser="editUser" :options="GENDER_ARRAY" @blur="validate('gender')" />
                <p class="errors form-text" v-if="!!errors.gender">{{ errors.gender }}</p>
            </div>
            <div class="form-group" v-if="isMale">
                <InputTextMaleMsg v-model="editUser.maleMsg" :editUser="editUser" @blur="validate('maleMsg')" />
                <p class="errors form-text" v-if="!!errors.maleMsg">{{ errors.maleMsg }}</p>
            </div>
            <div class="form-group" v-if="isFemale">
                <InputTextFemaleMsg v-model="editUser.femaleMsg" :editUser="editUser" @blur="validate('femaleMsg')" />
                <p class="errors form-text" v-if="!!errors.femaleMsg">{{ errors.femaleMsg }}</p>
            </div>
            <div class="form-group float-right">
                <button class="btn btn-outline-secondary btn-sm my-2 mr-2" @click="close">{{ TITLE.close }}</button>
                <button class="btn btn-outline-warning btn-sm my-2" @click="openConfirm" v-if="isEdit">{{ TITLE.update }}</button>
                <button class="btn btn-outline-warning btn-sm my-2" @click="openConfirm" v-else>{{ TITLE.register }}</button>
            </div>
            <PopupDialog @confirm="confirm" />
        </div>
    </div>
</template>

<script>
import InputTextName from '@/components/InputField/InputTextName.vue'
import SelectItem from '@/components/InputField/SelectItem.vue'
import InputTextMaleMsg from '@/components/InputField/InputTextMaleMsg.vue'
import InputTextFemaleMsg from '@/components/InputField/InputTextFemaleMsg.vue'
import PopupDialog from '@/components/PopupDialog.vue'
import { DialogUtil } from '@/components/PopupDialog.vue'
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
        InputTextName,
        SelectItem,
        InputTextMaleMsg,
        InputTextFemaleMsg,
        PopupDialog
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
        /**
         * 確認ダイアログでユーザ選択後、登録処理を行います。
         * @param {boolean} userChoice 確認ダイアログの結果です。
         */
        confirm(userChoice) {
            if (this.isEdit) this.successUpdate(userChoice)
            else this.successRegister(userChoice)
        },

        /**
         * 確認ダイアログを開く
         */
        openConfirm() {
            DialogUtil.showDialog()
        },

        /**
         * 新規作成モードで登録する
         * @param {boolean} userChoice 確認ダイアログの結果です。
         */
        successRegister(userChoice) {
            if (userChoice) {
                UserSchema.validate(this.editUser, { abortEarly: false })
                .then(() => {
                    this.$emit('new', this.editUser)
                    this.close()
                })
                .catch((err) => {
                    err.inner.forEach((error) => {
                        this.errors = { ...this.errors, [error.path]: error.message}
                    })
                })
            }
        },

        /**
         * 編集モードで更新する
         * @param {boolean} userChoice 確認ダイアログの結果です。
         */
        successUpdate(userChoice) {
            if (userChoice) {
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
            }
        },

        /**
         * バリデーションチェック
         * @param {string} field 入力内容
         */
        validate(field) {
            UserSchema.validateAt(field, this.editUser)
                .then(() => (this.errors[field] = ''))
                .catch((err) => {
                    this.errors[err.path] = err.message
                })
        },

        /**
         * ダイアログを閉じる
         */
        close() {
            this.reset()
            this.$emit('close', false)
        },

        /**
         * 入力項目をリセットする
         */
        reset() {
            this.editUser = DEFAULT_USER
        },
    }
}
</script>

<style scoped>
.errors {
  color: red;
}

#overlay{
  z-index:1;

  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);

  display: flex;
  align-items: center;
  justify-content: center;
}

#content{
  z-index:2;
  width:50%;
  padding: 1em;
  background:#fff;
}
</style>