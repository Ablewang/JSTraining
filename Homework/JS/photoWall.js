function PhotoWall(){
	var continer = $('.c-photowall');
	var cHelper = CommonHelper ? CommonHelper : {};
	var followBtn = null;
	return {
		// 渲染方法
		render:function(){
			this.init();
		},
		// 获取头部导航数据
		getData:function(){
			return [{
				alt:'',
				src:'Images/photo1.jpg'
			},{
				alt:'',
				src:'Images/photo2.jpg'
			},{
				alt:'',
				src:'Images/photo3.jpg'
			},{
				alt:'',
				src:'Images/photo4.jpg'
			},{
				alt:'',
				src:'Images/photo5.jpg'
			}]
		},
		// 初始外部链接
		init:function(){
			var list = this.getData();
			list && list.map && continer.append(this.create(list));
			
		},
		create:function(list){
			var ul = '<ul>{li}</ul>';
			var liTemplate = '<li><img src="{src}" alt="{alt}"></li>';
			var li = list.map(function(itm,idx){
				return liTemplate.replace('{src}',itm.src)
								 .replace('{alt}',itm.alt);
			});
			return ul.replace('{li}',li.join(''));
		}
	}
}
