<template>
    <div class="main">
        <div class="header">
            <div class="logo">
                <span class="big">{{ $Config.siteName }}</span>
                <span class="min">
          D+
        </span>
            </div>
            <span class="header-btn" @click="hiddenSidebar">
        <i class="el-icon-menu"></i>
      </span>
            <div class="right">
        <span class="header-btn" @click="screenfullToggle">
            <i class="fa fa-arrows-alt"></i>
        </span>

                <el-dropdown>
          <span class="header-btn">
               <i class="el-icon-setting"></i>
          </span>
                    <el-dropdown-menu slot="dropdown">
                        <div style="padding: 10px;text-align:center;width: 280px">
                            <div class="setting-category">
                                <el-switch
                                        @change="saveSwitchTabBarVal"
                                        v-model="switchTabBar"
                                        active-text="开启TabBar"
                                        inactive-text="关闭TabBar">
                                </el-switch>
                                <el-switch
                                        @change="saveFixedTabBar"
                                        v-if="switchTabBar"
                                        v-model="fixedTabBar"
                                        style="margin-top: 10px"
                                        active-text="固定在顶部"
                                        inactive-text="随页面滚动">
                                </el-switch>
                                <el-alert
                                        v-if="switchTabBar"
                                        style="margin-top: 10px"
                                        title="导航标签超过容器时,可在导航上滚动鼠标来移动标签"
                                        type="info"
                                        show-icon>
                                </el-alert>
                            </div>
                            <!--<div class="setting-category">-->
                            <!--下个设置块-->
                            <!--</div>-->

                        </div>
                    </el-dropdown-menu>
                </el-dropdown>

                <span class="header-btn">
            <el-badge :value="3" class="badge">
                    <i class="el-icon-bell"></i>
            </el-badge>
        </span>
                <el-dropdown>
          <span class="header-btn">
              Admin<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="$router.push('/personal')"><i style="padding-right: 8px"
                                                                                       class="fa fa-cog"></i>个人中心
                        </el-dropdown-item>
                        <el-dropdown-item @click.native="logout"><i style="padding-right: 8px" class="fa fa-key"></i>退出系统
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="app">
            <div class="aside">
                <div v-slimscroll="options">
                    <div class="menu">
                        <el-menu
                                router
                                :default-active="$route.path" class="menu" @open="handleOpen" @close="handleClose"
                                :collapse="isCollapse">
                            <template v-for="(menu_v,menu_k) in menu">
                                <el-submenu v-if="menu_v.children" :index="menu_k">
                                    <template slot="title">
                                        <i :class="menu_v.icon"></i>
                                        <span slot="title">{{ menu_v.name }}</span>
                                    </template>
                                    <el-menu-item v-for="(menuChildren_v,menuChildren_k) in menu_v.children"
                                                  :key="menuChildren_k"
                                                  :index="menuChildren_v.path">
                                        <i class="is-children fa fa-circle-o"></i>
                                        <span slot="title">{{ menuChildren_v.name }}</span>
                                    </el-menu-item>
                                </el-submenu>
                                <el-menu-item v-else :index="menu_v.path">
                                    <i :class="menu_v.icon"></i>
                                    <span slot="title">{{ menu_v.name }}</span>
                                </el-menu-item>
                            </template>
                        </el-menu>
                    </div>
                </div>
                <div class="sidebar-toggle" @click="sidebarToggle">
                    <div class="icon-left">
                        <i class="el-icon-back"></i>
                    </div>
                </div>
            </div>

            <div class="app-body">
                <NavBar id="nav-bar" v-if="switchTabBar"
                        :style="fixedTabBar && switchTabBar?'position: fixed;top: 0;':''"></NavBar>
                <div v-else style="margin-top: 50px;"></div>
                <div id="mainContainer" :style="fixedTabBar && switchTabBar?'margin-top: 88px;':''"
                     class="main-container">
                    <transition name="fade">
                    <el-card class="box-card">
                        <keep-alive>
                            <router-view></router-view>
                        </keep-alive>
                    </el-card>
                    </transition>
                </div>
                <EuiFooter></EuiFooter>
            </div>
        </div>
    </div>
</template>

<script>
    import Screenfull from 'screenfull'
    import EuiFooter from './Footer.vue';
    import NavBar from './NavBar.vue'
    import Menu from '@/menu/index';

    export default {
        data() {
            return {
                fixedTabBar: false,
                switchTabBar: false,
                siteName: this.$Config.siteName,
                isCollapse: false,
                menu: Menu,
                options: {
                    height: 'calc(100vh - 90px)',
                    size: '4px',
                    color: 'rgb(48, 65, 86)',
                },
            };
        },
        methods: {
            NavBarWidth() {
                let navBar = document.getElementById('nav-bar');
                if (!navBar) return;
                if (!(this.fixedTabBar && this.switchTabBar)) {
                    navBar.style.width = '100%';
                    return;
                }
                let sidebarClose = document.body.classList.contains('sidebar-close')
                if (sidebarClose) {
                    navBar.style.width = '100%';
                    return;
                }
                if (this.isCollapse) navBar.style.width = 'calc(100% - 64px)';
                else navBar.style.width = 'calc(100% - 200px)';
            },
            screenfullToggle() {
                if (!Screenfull.enabled) {
                    this.$message({
                        message: '你的浏览器不支持全屏！',
                        type: 'warning'
                    })
                    return false
                }
                Screenfull.toggle();
            },
            saveFixedTabBar(v) {
                v ? localStorage.setItem('fixedTabBar', v) : localStorage.removeItem('fixedTabBar');
                this.NavBarWidth();
            },
            saveSwitchTabBarVal(v) {
                let containerDom = document.getElementById('mainContainer');
                v ? containerDom.style.minHeight = 'calc(100vh - 139px)' : containerDom.style.minHeight = 'calc(100vh - 101px)';
                v ? localStorage.setItem('switchTabBar', v) : localStorage.removeItem('switchTabBar');
                this.NavBarWidth();
            },
            sidebarToggle(e) {
                e.preventDefault();
                if (this.isCollapse) {
                    document.body.classList.remove('sidebar-hidden')
                    this.siteName = this.$Config.siteName
                    this.isCollapse = false;
                } else {
                    document.body.classList.add('sidebar-hidden')
                    this.isCollapse = true;
                }
                this.NavBarWidth();

            },
            hiddenSidebar(e) {
                e.preventDefault();
                document.body.classList.toggle('sidebar-close');
                this.NavBarWidth();
            },
            logout() {
                sessionStorage.removeItem(this.$Config.tokenKey);
                this.$router.push({path: '/login'});
            },
            handleOpen(key, keyPath) {
                //console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                //关闭菜单
            }
        },
        mounted: function () {

            this.switchTabBar = localStorage.getItem('switchTabBar') ? true : false;
            this.fixedTabBar = localStorage.getItem('fixedTabBar') ? true : false;
            if (this.switchTabBar) document.getElementById('mainContainer').style.minHeight = 'calc(100vh - 139px)';

            if (!this.isCollapse) {

                document.body.classList.remove('sidebar-hidden')
                this.siteName = this.$Config.siteName
            } else {
                document.body.classList.add('sidebar-hidden')
            }

            setTimeout(() => {
                this.NavBarWidth();
            }, 1000)
        },
        components: {
            EuiFooter, NavBar
        },
    }
</script>
<style lang="scss">
    .sidebar-hidden {
        .header {
            .logo {
                background: #304156;
                .big {
                    display: none;
                }
                .min {
                    display: block;
                }
                width: 64px;
            }

        }
        .aside {
            .sidebar-toggle {
                .icon-left {
                    transform: rotate(180deg);
                }
            }
        }
        .main {
            .app-body {
                margin-left: 64px;
            }
        }
    }

    .sidebar-close {
        .header {
            .logo {
                width: 0;
                overflow: hidden;
            }
        }
        .aside {
            margin-left: -200px;
        }
        .main {
            .app-body {
                margin-left: 0;
            }
        }
    }

    .sidebar-hidden.sidebar-close {
        .aside {
            margin-left: -64px;
        }
    }

    .main {
        display: flex;
        .el-menu:not(.el-menu--collapse) {
            width: 200px;
        }
        .app {
            width: 100%;
            background-color: #f7f9fa;
            height: 100%;
        }
        .aside {
            position: fixed;
            margin-top: 50px;
            z-index: 10;
            background-color: #222d32;
            transition: all 0.3s ease-in-out;
            height: calc(100% - 100px);
            .menu {
                height: 100%;
                background-color:#304156;
                text-color:#bfcbd9;
            }
            .sidebar-toggle {
                position: relative;
                width: 100%;
                height: 50px;
                color: #fff;
                cursor: pointer;
                .icon-left {
                    position: absolute;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    right: 0;
                    width: 100%;
                    height: 100%;
                    font-size: 14px;
                    transition: all 0.3s ease-in-out;
                }
            }
        }
        .app-body {
            margin-left: 200px;
            -webkit-transition: margin-left 0.3s ease-in-out;
            transition: margin-left 0.3s ease-in-out;
        }
        .main-container {
            //margin-top: 50px;
            padding: 6px;
            min-height: calc(100% - 101px);
        }
    }

    .header {
        width: 100%;
        position: fixed;
        display: flex;
        height: 50px;
        background-color: #fff;
        border-bottom: solid 1px #e6e6e6;
        z-index: 10;
        .logo {
            .min {
                display: none;
            }
            width: 200px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            color: #fff;
            background-color: #304156;
            -webkit-transition: width 0.35s;
            transition: all 0.3s ease-in-out;
        }
        .right {
            position: absolute;
            right: 0;
        }
        .header-btn {
            .el-badge__content {
                top: 14px;
                right: 7px;
                text-align: center;
                font-size: 9px;
                padding: 0 3px;
                background-color: #059893;
                color: #fff;
                border: none;
                white-space: nowrap;
                vertical-align: baseline;
                border-radius: .25em;
            }
            overflow: hidden;
            height: 50px;
            display: inline-block;
            text-align: center;
            line-height: 50px;
            cursor: pointer;
            padding: 0 14px;
            color: #333;
            &:hover {
                background-color: #e6e6e6
            }
        }

    }

    .menu {
        border-right: none;
        background-color:#304156;
        text-color:#bfcbd9;
    }

    .el-menu--vertical {
        min-width: 190px;
    }

    .setting-category {
        padding: 10px 0;
        border-bottom: 1px solid #eee;
    }
</style>
