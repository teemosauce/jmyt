<template>
	<div class="container">
		<div class="login-container">
			<img src="../assets/logo.png" class="login-logo">

			<div class="login-box-wrapper">
				<div class="zh-title">运维服务平台MC<sup>2</sup></div>
				<div class="en-title">Maintenance Collaboration Cloud</div>
				<el-form :model="form" ref="form" :rules="formRule" label-position="left" class="login-box">
					
					<el-form-item label="账号" prop="account">
						<el-input v-model="form.account" size="small" auto-complete="off" placeholder="账号">
						</el-input>
					</el-form-item>

					<el-form-item label="密码" prop="pwd">
						<el-input type="password" size="small" v-model="form.pwd" auto-complete="off" style="color:#FFF;"placeholder="密码">
						</el-input>
					</el-form-item>

					<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
					
					<el-form-item style="width:100%;">
				      <el-button type="primary" size="small" style="width:100%;" @click.native.prevent="login" :loading="logining">登录</el-button>
				    </el-form-item>
				</el-form>
			</div>

			<div class="login-footer">
				Copyright 2016 - 同方工业有限公司
			</div>

			
		</div>
	</div>
</template>

<script>
import  {mapState} from 'vuex';

export default {
	name: 'User',
	data() {
		return {
			logining:false,
			form:{
				account: 'mc2101',
				pwd: '123456',
			},
			formRule:{
				account: [{
						required: true,
						message: '请输入账号',
						trigger: 'blur'
					},
				],
				pwd: [{
					required: true,
					message: '请输入密码',
					trigger: 'blur'
				}],
				
			},
			checked: true
		}
	},
	computed: {
		...mapState([
			'hasLogin',
			'loginFailed',
			'loginErrMsg'
		])
	},
	watch:{
		hasLogin(isLogin, old){
			if(isLogin){
				this.logining = false;
				this.$router.push({
					path: '/'
				})
			}
		},

		loginFailed(){
			this.$message({
				message: this.loginErrMsg || '登录失败，服务器出错！',
				type: 'error'
			})
			this.logining = false;
		}
	},

	methods: {
		login(ev) {
			this.$refs.form.validate(valid => {
				if(valid){
					this.logining = true;
					this.$store.dispatch('login', {
						account:this.form.account,
						pwd: this.form.pwd
					})
				}
			})
		}
	}
}
</script>

<style scoped lang="scss">
	
	.container{
		background: rgb(236, 246, 247);
		width: 100%;
		height: 100%;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 600px;

		.login-container{
			width: 100%;
			
			.login-logo{
				margin-left: 56px;
			}
			
			.login-box-wrapper{
				background-image: url('../assets/bg.png');
				padding: 10px 0;
				color: #FFF;
				margin: 10px 0;

				.zh-title,
				.en-title{
					text-align: center;
					font-weight: bold;
				}

				.zh-title{
					font-size: 30px;
					letter-spacing: 3.6px;
				}

				.en-title{
					font-size: 15px;
					letter-spacing: 0.8px;
				}

				.login-box{
					width: 350px;
					margin: 10px auto;
					padding:30px;
					padding-bottom: 15px;
					background-clip: padding-box;
					background: #FFF;
					//border-radius: 5px;
					//box-shadow: 0 0 25px #cac6c6;
				}

				.remember{
					margin-bottom:35px;
				}
			}

			.login-footer{
				text-align:center;
			}
			
		}
	}

	
</style>