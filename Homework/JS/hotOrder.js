function HotOrder(){
	var cHelper = CommonHelper ? CommonHelper : {};
	var getDataUrl = 'https://study.163.com/webDev/hotcouresByCategory.htm';
	// 机构介绍
	var introductionContiner = $('.c-product .right .introduction');
	// 排行容器
	var orderContiner = $('.c-product .right .hot-list .list');
	var liTemplaget = '<li><img src="{src}" class="img"><span class="desc"><span>{desc}</span><span class="count">{count}</span></span></li>';
	var rollingTimmer = null;
	return {
		render:function(){
			this.getData(this.createList);
			this.bindEvent();
		},
		// 获取数据
		getData:function(callback){
			var $this = this;
			cHelper.get && cHelper.get(getDataUrl,{},function(res){
				var result = JSON.parse(res);
				result && result.length && callback.call($this,result);
			})
		},
		// 创建列表
		createList:function(list){
			var $this = this;
			var li = list.map(function(itm,idx){
				return $this.createListItem(itm);
			})
			orderContiner.empty().append(li.join(''));

			// 若列表超出10个，则进行循环播放
			if (list.length > 10) {
				this.startRolling();
				// 元素鼠标悬浮，暂停循环
				orderContiner.children().hover(function(){
					clearInterval(rollingTimmer);
				},function(){
					$this.startRolling();
				})
			}
		},
		// 创建列表元素
		createListItem:function(obj){
			return liTemplaget.replace('{src}',obj.smallPhotoUrl)
							  .replace('{desc}',obj.name)
							  .replace('{count}',obj.learnerCount );
		},
		// 循环操作，将头部元素移动到尾部，实现循环
		rolling:function(){
			orderContiner.children().eq(0).fadeOut(function(){
				$(this).appendTo(orderContiner).show();
			});
		},
		// 开始循环
		startRolling:function(){
			rollingTimmer = setInterval(this.rolling,5000);
		},
		bindEvent:function(){
			introductionContiner.find('.img').click(function(){
				var src = 'http://mov.bn.netease.com/open-movie/nos/mp4/2014/12/30/SADQ86F5S_shd.mp4';
				var vedio = '<video width="100%" height="100%" controls="controls" autoplay="autoplay"><source src="{src}" type="video/mp4" /></video>';
				var pop = new Popup({
							 		title:'请观看下面的内容',
									content:vedio.replace('{src}',src),
									width:950, 
							 		height:580 
							 	}).render();
				$('body').append(pop);
			})
		}
	}
}