<template>
	<el-row class="container" v-loading="loading"  element-loading-text="正在注销账号...">
		
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo" :class="collapsed&&'logo-collapse-width'||'logo-width'">
				<div class="img"></div>
			</el-col>
			<el-col :span="10">
				<div class="tools" @click.prevent="collapse">
					<i class="fa fa-align-justify"></i>
				</div>
			</el-col>
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img :src="this.userAvatar" /> {{userInfo && userInfo.name}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>我的消息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>

		<el-col :span="24" class="main">
			<aside :class="collapsed && 'menu-collapsed' || 'menu-expanded'">
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="handleSelect" unique-opened router v-show="!collapsed">
					<template v-for="(item, index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index + ''" v-if="!item.leaf">
							<template slot="title">
								<i :class="item.iconFont"><span style="padding-left: 10px;">{{item.name}}</span></i>
							</template>
							<el-menu-item v-for="(child, i) in item.children" :key="index +'-'+ i":index="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
						</el-submenu>

						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconFont"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu>

				<!--导航菜单-折叠后-->
				<ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
					<li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
						<template v-if="!item.leaf">
							<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconFont"></i></div>
							<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"> 
								<li v-for="(child, i) in item.children" :key="index + '-' + i" v-if="!child.hidden" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
							</ul>
						</template>
						<template v-else>
							<li class="el-submenu">
								<div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconFont"></i></div>
							</li>
						</template>
					</li>
				</ul>
			</aside>

			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<strong class="title">{{$route.name}}</strong>
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script> 
	// import api from '../api'
	
	import { getUser, logout} from '../api/user'

	import { mapMutations, mapState } from 'vuex'

	export default {
		name : 'Home',
		data(){
			return {
				loading: false,
				collapsed:false,
				sysName: '军民一体',
				userName: '',
				userAvatar: '',
			}
		},

		computed: mapState(['userInfo']),

		methods:{
			...mapMutations([
				'CLEAR_USERINFO'
			]),

			collapse(){
				this.collapsed=!this.collapsed;
			},

			async logout(){
				this.loading = true;
				await logout();
				this.CLEAR_USERINFO();
				this.loading = false;
				this.$router.push({
					path: '/login'
				})
			},

			handleOpen(){

			},

			handleClose(){

			},

			handleSelect(){

			}	

		}
		
	}
</script>

<style scoped lang="scss">

	.container{
		position: absolute;
		top:0;
		bottom:0;
		width:100%;

		.header{
			height: 60px;
			line-height: 60px;
			background: rgba(3,57,131,1);
			color: #fff;
			
			.userinfo{
				text-align:right;
				padding-right: 35px;
				float: right;
				.userinfo-inner{
					cursor: pointer;
					color: #fff;
					img:{
						width:40px;
						height:40px;
						border-radius: 20px;
						margin: 10px;
						margin-right:0;
						float:right;
					}
				}
			}

			.logo{
				height:60px;
				font-size: 22px;
				padding-left:20px;
				padding-right:20px;
				border-color: rgba(238,241,146,0.3);
				border-right-width: 1px;
				border-right-style: solid;
			}

			.logo-width{
				width:230px;

				.img {
					height:30px;
					margin-top:15px;
					background:url('../assets/logo-large.svg');
					background-repeat: no-repeat;
				}
				
			}
			.logo-collapse-width{
				width:60px;
				.img {
					height:30px;
					width:30px;
					margin-top:15px;
					background:url('../assets/logo-small.svg');
					background-repeat: no-repeat;
				}
				
			}

			.tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
			}
		}

		.main {
			display: flex;
			position: absolute;
			top: 60px;
			bottom: 0;
			overflow: hidden;
			aside {
				flex: 0, 0, 230px;
				width: 230px;

				.el-menu{
					height: 100%;
				}

				.collapsed {
					width:60px;
					.item{
						position:absolute;
					}

					.submenu{
						position:absolute;
						top: 0;
						left: 60px;
						z-index: 99999;
						height:auto;
						display:none;
					}
				}
			}

			.menu-collapsed{
				flex: 0, 0, 60px;
				width:60px;
			}

			.menu-expanded{
				flex: 0, 0, 230px;
				width:230px;
			}

			.content-container{
				flex: 1;
				overflow-y: scroll;
				.breadcrumb-container{
					.title{
						width: 200px;
						float: left;
						color: #475669; 
					}

					.breadcrumb-inner {
						float: right;
					}
				}

				.content-wrapper{
					background: #FFF;
					box-sizing: border-box;
				}
			}
		}
	}
</style>