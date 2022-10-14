<template>
    <div id="overlay" v-if="showDialog">
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

const _DialogUtil = () => {
    let callbacks = []

    const showDialog = () => {
        callbacks.forEach(callback => callback(true))
    }

    const closeDialog = () => {
        callbacks.forEach(callback => callback(false))
    }

    const getCallback = (callback) => {
        callbacks.push(callback)
    }

    return {
        showDialog,
        closeDialog,
        getCallback
    }
}

export const DialogUtil = _DialogUtil()

export default {
    data() {
        return {
            message: 'Confirmation',
            showDialog: false,
            resolve: () => {},
            userChoice: false
        }
    },
    mounted() {
        DialogUtil.getCallback((value) => {
            this.showDialog = value
        })
    },
    methods: {
        async someProcess() {
            DialogUtil.showDialog()
            const answer = await new Promise((resolve) => {
            this.resolve = resolve
            })
            this.userChoice = answer
            DialogUtil.closeDialog()
        },
        successConfirm() {
            this.someProcess()
            this.resolve(true)
            DialogUtil.closeDialog()
        },
        cancelConfirm() {
            this.someProcess()
            this.resolve(false)
            DialogUtil.closeDialog()
        }
    }
}

</script>