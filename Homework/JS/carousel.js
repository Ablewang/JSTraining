function Carousel(){
	var cHelper = CommonHelper ? CommonHelper : {};
	var continer = $('.c-carousel');
	var liTemplate = '<li class="{class}"><a target="_blank" href="{href}"><img src="{src}"></a></li>';
	var bannerTimer = null; //循环
	var bannerIndex = 0; //当前轮播位置
	var $bannerItem = null;
	var $bannerSwitch = null;
	return {
		render:function(){
			this.initCarousel();
		},
		// 获取轮播列表
		getCarouselList:function(){
			return [
				{
					msg:'',
					src:'Images/banner1.jpg',
					href:'http://open.163.com/'
				},
				{
					msg:'',
					src:'Images/banner2.jpg',
					href:'http://study.163.com/'
				},
				{
					msg:'',
					src:'Images/banner3.jpg',
					href:'http://www.icourse163.org/'
				}
			];
		},
		// 初始化轮播
		initCarousel:function(){
			var list = this.getCarouselList(); //获取列表
			list && list.map && continer.append(this.createCarousel(list)).append(this.createSwitch(list.length));
			this.bindEvent();
		},
		// 创建图片轮播器
		createCarousel:function(list){
			var ulCarousel = '<ul class="c-img">{li}</ul>';
			var li = list.map(function(itm,idx){
				return liTemplate.replace('{class}',idx == 0 ? 'show' : '')
								 .replace('{href}',itm.href)
								 .replace('{src}',itm.src);
			});
			return ulCarousel.replace('{li}',li.join(''));
		},
		// 创建轮播手动切换开关
		createSwitch:function(length){
			var ulSwitch = '<ul class="c-switch">{li}</ui>';
			var li = [];
			for (var i = 0; i < length; i++) {
				li.push('<li'+(i == 0 ? ' class="on" ' : '')+'></li>');
			}
			return ulSwitch.replace('{li}',li.join(''));
		},
		// 事件绑定
		bindEvent:function(){
			var carousel = this;
			$bannerItem = continer.find('.c-img li');
			$bannerSwitch = continer.find('.c-switch li');
			//图片悬浮动作，停止循环
			$bannerItem.hover(function(){
				clearInterval(bannerTimer); //清除循环
			},function(){
				carousel.startSlider();  //重新开始循环
			})
			// 手动切换开关点击事件
			$bannerSwitch.click(function(){
				clearInterval(bannerTimer); //清除循环
				bannerIndex = $(this).index(); //获取序号
				carousel.toggleSlider(); //执行切换
				carousel.startSlider();  //重新开始循环
			});
		   	this.startSlider();
		},
		// 切换执行动作
		toggleSlider:function(){
			$bannerItem.eq(bannerIndex).fadeIn().siblings().fadeOut();
			$bannerSwitch.eq(bannerIndex).addClass("on").siblings().removeClass("on");
		},
		// 循环切换
		startSlider:function(){
			return;
			var carousel = this;
			bannerTimer = setInterval(function() {
				bannerIndex++;
				bannerIndex === $bannerItem.length && (bannerIndex = 0); //序号清零
				carousel.toggleSlider();
			}, 5000);
		}

	}
}