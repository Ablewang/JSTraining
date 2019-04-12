function Notic(){
	var cHelper = CommonHelper ? CommonHelper : {};
	var continer = $('.c-notic');
	return {
		getContent:function(){
			return {
				msg:'网易云课堂微专业，帮助你掌握专业技能，令你求职或加薪多一份独特优势！',
				url:'http://study.163.com/'
			};
		},
		render:function(){
			this.bindClick(); //绑定事件
			var content = this.getContent(); //获取通知内容
			continer.find('.notic').text(content.msg); //赋值内容
			continer.find('.show-detail').attr('href',content.url); //赋值内容
			//若未设置不再提醒，则
			cHelper.getCookie && cHelper.getCookie('notNotic') != '1' ? continer.show() : '';
		},
		// 事件绑定
		bindClick:function(){
			// 不再提醒
			continer.find('.not-notic').click(function(){
				if (cHelper.setCookie) { //设置不在提醒cookie
					cHelper.setCookie('notNotic','1',365);
					continer.hide();
				}
			});
		}
	}
}