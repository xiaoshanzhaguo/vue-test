<template>
    <div class="user">
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="姓名">
                <el-input v-model="model.username"></el-input>
            </el-form-item>
            <el-form-item>
                <!-- !!!! -->
                <el-button type="primary" native-type="submit">保存</el-button>  
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'User',
    data() {
        return {
           model: {}
        }
    },
    methods: {
        async save() {
            console.log('save');
            const res = await this.$http.post('users', this.model) // !!!!
            this.$message({
                type: 'success',
                message: '保存成功'
            })
            console.log(res);
        }
    }
}
</script>

<style lang="less" scoped>

</style>
