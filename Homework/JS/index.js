(function(){
	CommonHelper.windowResize();
	new Notic().render(); //顶部通知公告渲染
	new Header().render(); //头部渲染
	new Carousel().render(); //轮播渲染
	new Outerlink().render(); //产品外部链接
	new PhotoWall().render(); //照片墙
	new Product().render(); //产品相关
	new HotOrder().render(); //热门排行榜
})();