<template>
    <div class="card">
        <div class="card-body">
            <div class="card-text">
                <div class="form-group">
                    <input type="text" class="form-control" v-model="editName">
                </div>
                <button @click="close">やめる</button>
                <button @click="save">更新</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: String,
        isShow: Boolean
    },
    data() {
        return {
            editName: '',
        }
    },
    mounted() {
        this.$watch(
            () => this.editName,
            (editName) => {
                if (editName === '' ) {
                    this.editName = this.name
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
            this.editName = ''
        },
        save() {
            this.$emit('send', this.editName)
            this.close()
        }
    }
}
</script>