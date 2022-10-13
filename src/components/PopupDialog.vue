<template>
    <div id="overlay" v-if="isOpenPopupDialog">
        <div id="content">
            <p class="message">{{ message }}</p>
            <div class="btn-container float-right">
                <button class="btn btn-outline-primary btn-sm my-2 mr-2" @click="successConfirm">Yes</button>
                <button class="btn btn-outline-danger btn-sm my-2" @click="cancelConfirm">No</button>
            </div>
        </div>
    </div>
    <button class="btn btn-outline-success mr-2" @click="someProcess">Process</button>
    <span>{{ userChoice }}</span>
</template>

<script>
export default {
    data() {
        return {
            message: 'Confirmation',
            isOpenPopupDialog: false,
            resolve: {},
            userChoice: false
        }
    },
    methods: {
        async someProcess() {
            this.isOpenPopupDialog = true
            const answer = await new Promise((resolve) => {
            this.resolve = resolve
            })
            this.userChoice = answer
            this.closePopupDialog()
        },
        closePopupDialog() {
            this.isOpenPopupDialog = false
        },
        successConfirm() {
            this.resolve(true)
            this.closePopupDialog()
        },
        cancelConfirm() {
            this.resolve(false)
            this.closePopupDialog()
        }
    }
}

</script>