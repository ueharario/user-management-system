<template>
    <div class="card">
        <div class="card-body">
            <div class="card-text">
                <div class="form-group">
                    <input type="text" class="form-control" v-model="name">
                </div>
                <button @click="close">やめる</button>
                <button @click="save">更新</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: ''
        }
    },
    methods: {
        close() {
            this.reset()
            this.isShow = false
        },
        reset() {
            this.name = ''
        },
        save() {
            this.$emit('send', this.name)
            this.close()
        }
    }
}
</script>