<template>
    <div class="dialog">
        <el-dialog
            :title="dialog.title"
            v-model="dialog.show"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
        >
            <div class="formdiv">
                <el-form
                    ref="form"
                    :model = "formData"
                    :rules = "form_rules"
                    label-width = "120px"
                    style = "margin:10px;width:auto;"
                >
                    <el-form-item label="收支类型">
                        <el-select v-model="formData.type" placeholder="收支类型">
                            <el-option v-for="(formatype,index) in format_type_list" :key="index" :label="formatype" :value="formatype">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="describe" label="收支描述">
                        <el-input type="describe" v-model="formData.describe"></el-input>
                    </el-form-item>
                    <el-form-item prop="income" label="收入">
                        <el-input type="income" v-model="formData.income"></el-input>
                    </el-form-item>
                    <el-form-item prop="expend" label="支出">
                        <el-input type="expend" v-model="formData.expend"></el-input>
                    </el-form-item>
                    <el-form-item prop="cash" label="现金余额">
                        <el-input type="cash" v-model="formData.cash"></el-input>
                    </el-form-item>
                    <el-form-item prop="remark" label="备注">
                        <el-input type="remark" v-model="formData.remark"></el-input>
                    </el-form-item>
                    <el-form-item class="text_right">
                        <el-button @click="dialog.show = false">取消</el-button>
                        <el-button type="primary" @click='onSubmit("form")'>提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default{
        name:'dialog',
        data(){
            return{

                format_type_list:[
                    "提现",
                    "手续费",
                    "摇骰子",
                    "搞颜色",
                    "差旅",
                    "设备",
                    "日常"

                ],
                form_rules:{
                    describe:[
                        {required:true,message:"收支描述不能为空",trigger:"blur"}
                    ],
                    income:[
                        {required:true,message:"收入不能为空",trigger:"blur"}
                    ],
                    expend:[
                        {required:true,message:"支出不能为空",trigger:"blur"}
                    ],
                    cash:[
                        {required:true,message:"现金余额不能为空",trigger:"blur"}
                    ]
                }
            }
        },
        methods:{
            onSubmit(form){
                this.$refs[form].validate(valid => {
                    if(valid){
                        const url = this.dialog.option === "add" ? "add" : `edit/${this.formData.id}`
                        this.$axios.post(`/api/profiles/${url}`,this.formData)
                         .then(res =>{
                             console.log(res)
                             //添加成功,这个地方老显示不出来，我加了一个判断放到fundlist的getprofile了，伴随update时间触发
                             this.$message({
                                    message:"操作成功咧",
                                    type:"success"
                                })
                             //隐藏dialog
                            this.dialog.show = false  
                            this.dialog.returnres = true  
                             //自动刷新一下页面
                             this.$emit('update')
                         }).catch((err) =>{
                             console.log(err)
                             this.$message({
                                 message:"操作失败咧"})
                         })
                        
                    } 
                    
                         
                } )
            }
        },
        props:{
            dialog:Object,
            //其实我觉得就是利用了object props的点，不能修改但是可以修改对象属性
            formData:Object
        }
    }
</script>

<style scoped>

</style>