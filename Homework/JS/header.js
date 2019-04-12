function Header(){
	var continer = $('.c-header');
	var cHelper = CommonHelper ? CommonHelper : {};
	var followBtn = null;
	return {
		// 渲染方法
		render:function(){
			this.initNav();
			//缓存关闭按钮
			followBtn = continer.find('.btn-follow');
			// 判断当前是否登录，若登录则切换已关注样式
			if (this.loginHelper.hasLogin() && this.hasFollowed()) {
				followBtn.removeClass('unfollow').addClass('followed');
			}
			this.bindClick();
		},
		// 绑定事件
		bindClick:function(){
			var header = this;
			// 关注按钮点击事件
			followBtn.click(function(){
				// 若已登录，直接设置关注cookie
				if (header.loginHelper.hasLogin()) {
					header.setFollow(1);
				}else{ //否则调用登录接口进行登录
					header.loginHelper.login(header.setFollow);
				}
			})
			// 取消关注按钮点击事件
			continer.find('.cancel').click(function(event){
				header.setFollow(0);
				// 阻止冒泡
				event.stopPropagation && event.stopPropagation();
				event.cancelable = true;
			});
		},
		// 判断是否已经关注
		hasFollowed:function(){
			return cHelper.getCookie && cHelper.getCookie('followSuc') == 1;
		},
		// 设置关注
		setFollow:function(isFollow){
			cHelper.setCookie('followSuc',0); //先重置为未关注
			isFollow ? followBtn.removeClass('unfollow').addClass('followed'):
					   followBtn.removeClass('followed').addClass('unfollow');
			if (isFollow == 1) {
				//调用接口判断是否关注成功，若关注成功再设置cookie
				cHelper.get('https://study.163.com/webDev/attention.htm','',function(res){
					if (res == 1) {
						cHelper.setCookie('followSuc',1);
					}
				})
			}
		},
		// 获取头部导航数据
		getNavData:function(){
			return [{
				text:'网易公开课',
				href:'http://open.163.com/'
			},{
				text:'网易云课堂',
				href:'http://study.163.com/'
			},{
				text:'中国大学MOOC',
				href:'http://www.icourse163.org/'
			}]
		},
		// 初始化头部导航
		initNav:function(){
			var list = this.getNavData();
			list && list.map && continer.find('.nav ul').append(this.createNav(list));
			
		},
		createNav:function(list){
			var liTemplate = '<li><a target="_blank" href="{href}">{text}</a></li>';
			var li = list.map(function(itm,idx){
				return liTemplate.replace('{href}',itm.href)
								 .replace('{text}',itm.text);
			});
			return li.join('');
		},
		loginHelper:new Login()
	}
}
