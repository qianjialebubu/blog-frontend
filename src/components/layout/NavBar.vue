<template>
    <!--导航-->
    <el-header>
        <h2 class="logo">Hikari</h2>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                 background-color="#545c64" router text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item :index="'/'+item.path" v-for="item in menulist" :key="item.id">
                <template slot="title">
                    <!--                图标-->
                    <i :class="iconsObj[item.id]"></i>
                    <!--                文本-->
                    <span>{{item.authName}}</span>
                </template>
            </el-menu-item>
        </el-menu>
        <el-input
                class="search"
                placeholder="请输入内容"
                prefix-icon="el-icon-search"
                v-model="search"
                size="mini"
                style="width: 200px">
        </el-input>
    </el-header>
</template>

<script>
export default {
    data() {
        return {
            activeIndex: '1',
            menulist: [
                {
                    id: 1,
                    authName: '首页',
                    path: 'index'
                },
                {
                    id: 2,
                    authName: '随笔',
                    path: 'archives'
                },
                {
                    id: 3,
                    authName: '项目',
                    path: 'project'
                },
                {
                    id: 4,
                    authName: '留言',
                    path: 'said'
                },
                {
                    id: 5,
                    authName: '关于我',
                    path: 'about'
                },
            ],
            iconsObj: {
                '1': 'iconfont icon-user',
                '2': 'iconfont icon-tijikongjian',
                '3': 'iconfont icon-shangpin',
                '4': 'iconfont icon-danju',
                '5': 'iconfont icon-baobiao',
                '6': 'iconfont icon-baobiao',
                '7': 'iconfont icon-baobiao'
            },
            isCollapse: false,
            search: ''
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style>
    .search input.el-input__inner {
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 20px;
    }
</style>

<style scoped lang="less">

    .el-header {
        background-color: #545c64;
        color: #fff;
        display: flex;
        padding-left: 50px;
        padding-right: 100px;
        justify-content: space-around;
        align-items: center;
        font-size: 20px;

        > div {
            display: flex;
            align-items: center;
        }

        img {
            height: 40px;
        }

        span {
            margin-left: 15px;
        }

        .el-menu {
            flex-shrink: 0;
        }

        .logo {
            color: #ffd04b;
        }

        .logo:hover {

        }
    }
</style>