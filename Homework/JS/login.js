function Login(){
	var continer = $('.c-login');
	var cHelper = CommonHelper ? CommonHelper : {};
	return {
		//登录入口
		login:function(callback){
			this.showLoginForm();
			this.bindClick(callback);
		},
		// 展示登录窗口
		showLoginForm:function(){
			continer = this.createLoginForm();
		},
		createLoginForm:function(){
			var template =	'<div class="f-login">'+
							'	<div class="middle">'+
							'		<input id="username" value="studyOnline" type="text" placeholder="账号">'+
							'		<input id="password" value="study.163.com" type="text" placeholder="密码">'+
							'	</div>'+
							'	<div class="bottom">'+
							'		<button class="btn-login">登录</button>'+
							'		<span class="error"></span>'+
							'	</div>'+
							'</div>';
			return new Popup({	title:'登录网易云课堂',
						 		content:template,
						 		width:388, 
						 		height:288,
						 		isShow:true}).render();
		},
		// 绑定点击事件
		bindClick:function(callback){
			var login = this;
			// 登录按钮
			continer.find('.btn-login').click(function(){
				// userName:hex_md5('studyOnline'),
				// password:hex_md5('study.163.com')
				// 获取登录账号密码，并MD5加密
				var submit = {
					userName:login.md5(continer.find('#username').val()),
					password:login.md5(continer.find('#password').val())
				}
				// 调用接口登录
				cHelper.get('https://study.163.com/webDev/login.htm',submit,
					function(res){
						login.loginSuccess(callback,res);
					})
			});
			// 关闭按钮
			continer.find('.close i').click(function(){
				login.close();
			})
		},
		// 登录接口调用成功事件
		loginSuccess:function(callback,res){
			if (res == 1) { //若调用成功，则隐藏登录窗体，标记登录成功cookie，指定回调
				continer.hide();
				cHelper.setCookie('loginSuc',1);
				callback && (typeof callback == 'function') && callback(1);
			}else{ //否则提示错误
				continer.find('.bottom .error').text('账号或密码错误');
			}
		},
		// 窗口关闭
		close:function(){
			continer.hide();
			continer.find('.bottom .error').text('');
		},
		md5:function(str){
			return !str || !str.length ? '' : hex_md5(str);
		},
		// 判断是否已经登录
		hasLogin:function(){
			return cHelper.getCookie && cHelper.getCookie('loginSuc') == 1;
		},
	}
}