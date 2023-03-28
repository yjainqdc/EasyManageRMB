<template>
<el-row class="menu_page">
    <el-col :span="12">
      <el-menu
        active-text-color="#292525"
        background-color="#524a4a"
        class="el-menu-vertical-demo"
        text-color="#fff"
      >
        <router-link to="/home">
            <el-menu-item index="0">
            <template #title>
                <el-icon><Document /></el-icon>
                <span>首页</span>
                </template>
            </el-menu-item>
        </router-link>
        <template v-for="item in items">
              <el-sub-menu v-if="item.children" :index="item.path" :key="item.path">
                <template #title>
                    <component :is="item.icon" class="icons"></component>
                    <span>{{item.name}}</span>
                </template>
                    <router-link v-for="(citem,cindex) in item.children" :to="citem.path" :key="cindex">
                        <el-menu-item :index="citem.path">
                            <template #title>
                                <component :is="citem.icon" class="icons"></component>
                                <span>{{citem.name}}</span>
                            </template>
                        </el-menu-item>
                    </router-link>
                
              </el-sub-menu>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
    export default{
        name:'left-menu',
        data(){
            return{
                items:[
                    {
                        icon:"Money",
                        name:'资金管理',
                        path:'fund',
                        children:[{path:'fundlist',name:'资金流水',icon:"Coin"}]
                    },
                    {
                        icon:"PieChart",
                        name:'信息管理',
                        path:'info',
                        children:[{path:'infoshow',name:'个人信息',icon:"Bell"}]
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .menu_page {
    position: fixed;
    top: 71px;
    left: 0;
    min-height: 100%;
    background-color: #524a4a;
    z-index: 99;
    }
    .el-menu {
    border: none;
    }
    .fa-margin {
    margin-right: 5px;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
    min-height: 400px;
    }
    .el-menu-vertical-demo {
    width: 35px;
    }
    .el-sub-menu .el-menu-item {
    min-width: 180px;
    }
    .hiddenDropdown,
    .hiddenDropname {
    display: none;
    }
    a {
    text-decoration: none;
    }
    .icons{
        width: 18px;
        margin-right: 5px;
    }
</style>