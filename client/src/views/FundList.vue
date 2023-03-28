<template>
    <div class="fillcontainer">
        <div>
            <el-form :inline="true" ref="add_data" :model="search_data">
                <!-- 筛选 -->
                <el-form-item label="按照时间筛选" class="date">
                    <el-date-picker
                        v-model="search_data.startTime"
                        type="datetime"
                        placeholder="选择开始时间"
                        />
                    到
                    <el-date-picker
                        v-model="search_data.endTime"
                        type="datetime"
                        placeholder="选择结束时间"
                        />
                </el-form-item>
                <el-form-item class="btnLeft">
                    <el-button type="primary" icon="search" @click="handleSearch()">
                        筛选
                    </el-button>
                </el-form-item>
                <el-form-item class="btnRight">
                    <el-button  type="primary" size="large" icon="plus" @click="handleAdd()" v-if="user.identity">添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table_container">
            <el-table 
            v-if="tableData.length > 0" 
            :data="tableData" 
            style="width: 100%">
                <el-table-column label="序号" width="100" type="index" align="center">
                </el-table-column>
                <el-table-column label="创建时间" width="250" prop="data" align="center">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                        <el-icon><timer /></el-icon>
                        <span style="margin-left: 10px">{{ scope.row.data }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="收支类型" width="150" prop="type" align="center">
                </el-table-column>
                <el-table-column label="收支描述" width="180" prop="describe" align="center">
                </el-table-column>
                <el-table-column label="收入" width="170" prop="income" align="center">
                    <template #default="scope">
                        <span class="income">{{ scope.row.income }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="支出" width="170" prop="expend" align="center">
                    <template #default="scope">
                        <span class="expend">{{ scope.row.expend }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="账户现金" width="170" prop="cash" align="center">
                    <template #default="scope">
                        <span class="cash">{{ scope.row.cash }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="备注" width="220" prop="remark" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <el-button 
                        size="small"
                        type="warning"
                        @click="handleEdit(scope.$index, scope.row)"  v-if="user.identity">Edit
                        </el-button>
                        <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"  v-if="user.identity">Delete
                        </el-button>
                        <span v-if="!user.identity">权限不足，请<el-button @click="drawer = true">充值</el-button></span>
                                        <el-drawer v-model="drawer" title="I am the title" :with-header="false" modal=false>
                                            <img src="../assets/222.jpg" class="drawer">
                                            <h1>随便给点啦</h1>
                                        </el-drawer>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-row>
                <el-col>
                    <div class="pagination">
                          <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="paginations.page_index"
                                :page-size="paginations.size"
                                :page-sizes="paginations.page_sizes"
                                :layout="paginations.layout"
                                :total="paginations.total"
                            />
                    </div>
                </el-col>
            </el-row>
        </div>
        <Dialog :dialog="dialog" :formData="formData" @update="getProfile()"></Dialog>
    </div>
</template>

<script>
    import Dialog from "../components/Dialog.vue"
    import { useStore } from "vuex"
    export default{
        name:"fundlist",
        setup() {
            const store = useStore()
            // console.log(store)
            return { store }
        },
        created() {
            console.log(this)
            this.getProfile();
        },
        data(){
            return{
                drawer:false,
                search_data:{
                    startTime:"",
                    endTime:""
                },
                filterTableData:[],
                paginations:{
                    page_index:1,//当前位于哪页
                    total:0,
                    page_size:10,//一页显示多少条
                    page_sizes:[5,10,15,20],//每页显示多少条
                    layout:"total,sizes,prev,pager,next,jumper" //翻页属性
                },
                tableData:[],
                dialog:{
                    show:false,
                    title:"", 
                    option:'',
                    returnres:false
                },
                
                //子组件dialog的数据
                formData:{
                    type:"",
                    describe:"",
                    income:"",
                    expend:"",
                    cash:"",
                    remark:"",
                    id:""           
                },
            }
        },
        methods:{
            getProfile(){
                console.log("111")
                this.$axios.get("/api/profiles")
                .then(res=>{
                    this.allTableData=res.data;
                    this.filterTableData =res.data;
                    //设置分页数据
                    this.setpaginations();
                })
                .catch(err=>{console.log(err)})

                if(this.dialog.returnres){
                    this.$message({
                        message:"操作成功咧",
                        type:"success"
                    })
                    this.dialog.returnres = false
                }    

            },
            handleEdit(index,row){
                    this.dialog={
                        show:true,
                        title:"修改资金信息",
                        option:"edit",
                        returnres:false
                    };
                    this.formData={
                        type:row.type,
                        describe:row.describe,
                        income:row.income,
                        expend:row.expend,
                        cash:row.cash,
                        remark:row.remark,
                        id:row._id
                    }
            },
            handleDelete(index,row){
                this.$axios.delete(`/api/profiles/delete/${row._id}`)
                         .then(res =>{
                             console.log(this)
                             //删除成功
                             this.$message({
                                    message:"删除成功咧",
                                    type:"success"
                                })
                             //自动刷新一下页面
                             this.getProfile()
                         }).catch((err) =>{
                             console.log(err)
                             this.$message({
                                 message:"删除失败咧"})
                         })
            },
            handleAdd(index,row){
                    this.dialog={
                        show:true,
                        title:"添加资金信息",
                        option:"add",
                        returnres:false
                    };
                    this.formData={
                        type:"",
                        describe:"",
                        income:"",
                        expend:"",
                        cash:"",
                        remark:"",
                        id:""  
                    }     
            },
            //分页
            handleSizeChange(page_size){
                //切换size
                this.paginations.total = this.allTableData.length;
                this.paginations.page_index = 1;
                this.paginations.page_size = page_size
                //设置切换的分页数据
                this.tableData = this.allTableData.filter((item,index) => {
                    return index<page_size;
                })
            },
            handleCurrentChange(page){
                //获取当前页数据索引
                this.paginations.page_index = page;
                let index = this.paginations.page_size*(page-1);
                //数据的总数
                let nums = this.paginations.page_size*page;
                //容器
                let tables = []
                for(let i =index;i<nums;i++){
                    if(this.allTableData[i]){
                        tables.push(this.allTableData[i]);
                    }
                    this.tableData = tables;
                }

            },
            setpaginations(){
                this.paginations.total = this.allTableData.length;
                this.paginations.page_index = 1;
                this.paginations.page_size = 10;
                //设置默认的分页数据
                this.tableData = this.allTableData.filter((item,index) => {
                    return index<this.paginations.page_size;
                })
            },

            //筛选
            handleSearch(){
                if(!this.search_data.startTime||!this.search_data.endTime){
                    this.$message({
                        type:"warning",
                        message:"请选择时间区间"
                    });
                    this.getProfile()
                    return
                }
                const sTime = this.search_data.startTime.getTime();
                const eTime = this.search_data.endTime.getTime();           
                this.allTableData = this.filterTableData.filter(item =>{
                    let date = new Date(item.date);
                    let time = date.getTime();
                    return time >= sTime&&time <= eTime;
                })
                
                this.setpaginations()
            },

            
        },
        computed:{
            //权限控制
            user(){
                return this.store.getters.user;
            }
        },
        components:{
            Dialog,
        }
    }
</script>

<style scoped>
    .income{
        color: crimson;
    }
    .expend{
        color: rgb(16, 139, 16);
    }
    .cash{
        color: cornflowerblue;
    }
    .fillcontain {
        width: 100%;
        height: 100%;
        padding: 16px;
        box-sizing: border-box;
    }
    .btnRight{
        margin-top: 10px;
        float:right;
    }
    .pagination{
        float: right;
        margin-top: 10px;
        margin-right: 100px;
    }
    .date{
        margin-top: 15px;
        margin-left: 15px;
    }
    .btnLeft{
        padding-top: 15px;

    }
    .drawer{
        width: 300px;
    }
    </style>