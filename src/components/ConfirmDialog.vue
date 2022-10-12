<template>
    <teleport to="body">
        <div class="modal" v-if="isOpen" @click="cancel()">
            <div class="modal-content">
                <p class="message">{{ message }}</p>
                <div class="btn-container">
                    <button class="btn btn-ok" @click="ok()">Yes</button>
                    <button class="btn btn-cancel" @click="cancel()">No</button>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            isOpen: false,
            resolves: () => {}
        }
    },
    methods: {
        async confirm() {
            return await new Promise((resolve) => {
                this.isOpen = false
                this.resolves = resolve
            })
        },
        close() {
            this.isOpen = false
            this.resolves = () => {}
        },
        ok() {
            this.resolves(true)
            this.close()
        },
        cancel() {
            this.resolve(false)
            this.close()
        }
    }
}
</script>