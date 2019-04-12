function Product(){
	var cHelper = CommonHelper ? CommonHelper : {};
	var getDataUrl = 'https://study.163.com/webDev/couresByCategory.htm';
	//左侧列表容器
	var listContiner = $('.c-product .left');
	var currentType = 'product'; //记录当前处理的数据类型，默认为product
	// 类型字典：为后续操作提供对应类型的绑定对象快捷查询字典
	var typeDic = null;
	var listWidth = listContiner.width(); //记录列表容器宽度，用做窗体resize时判断容器宽度是否变化
	return {
		render:function(){
			this.initTab();   //初始化tab
			this.bindEvent(); //绑定事件 
			this.registerWindowResize();
		},
		// 初始化tab
		initTab:function(){
			var product = this;
			// 获取tab标签数据
			var list = this.getTabData();
			if (list && list.map) {
				var divList = [];
				// 遍历生成tab元素以及数据列表容器div
				var tabLi = list.map(function(itm,idx){
					var cls = '';
					// 若为首个元素，则默认激活，且赋值当前查询目标类型
					if (idx == 0) {
						cls = 'activity';
						currentType = itm.type;
					}
					// 生成对应的数据列表div
					divList.push(product.createListDiv(itm));
					// 返回tab标签html
					return '<li target="{target}"{class}>{text}</li>'.replace('{target}',itm.type)
																	 .replace('{class}',cls)
																	 .replace('{text}',itm.text);
				});
				listContiner.empty()
							.append('<ul class="tab">'+ tabLi.join('') +'</ul>')
							.append(divList);
				// 根据Tab数据生成tab类型字典，为后续操作提供绑定的缓存dom对象
				product.creatTypeDic(list);
			}
		},
		// 获取tab标签数据
		getTabData:function(){
			return [{
				text:'产品设计',
				type:'product',
				code:10
			},{
				text:'编程语言',
				type:'programlang',
				code:20
			}]
		},
		// 获取列表数据 
		getListData:function(){
			var product = this;
			var type = typeDic[currentType];
			cHelper.get(getDataUrl,{
				pageNo:type.pagination.pageNum(), 
				psize:type.pagination.pageSize(), 
				type:type.type
			},function(res){
				var result = JSON.parse(res);
				if (result && result.list) {
					//初始化列表数据
				 	type.continer.empty().append(product.creatList(result.list));
				 	//标记已经渲染成功
				 	type.isRendered = true; 
				 	//渲染分页控件
				 	type.pagination.render(result.totalPage,result.totalCount,product.getListData)
				 				   .setCallbackTarget(product)
				 				   .setDocumentScrollTop();
				}
			})
		},
		// 生成对应的数据列表div
		createListDiv:function(typeObj){
			return '<div id="{type}" target="{type}"><div class="list"></div><ul class="page"></ul></div>'.replace(/{type}/g,typeObj.type);
		},
		// 根据Tab数据生成tab类型字典，为后续操作提供绑定的缓存dom对象
		creatTypeDic:function(list){
			if (!typeDic) {
				typeDic = {};
			}
			list.map(function(itm,idx){
				typeDic[itm.type] = {
								type:itm.code,    //类型代码，提供查询代码
								isRendered:false, //标记是否已经渲染，当切换tab时，避免重复渲染
								pagination:new Pagination(itm.type,listContiner.width()), //绑定分页控件
								continer:listContiner.find('#'+itm.type+' .list')  //绑定数据列表容器
							};
			});
		},
		// 创建列表
		creatList:function(list){
			var product = this;
			if (!list.length) {
				return;
			}
			//遍历生成列表元素
			var li = list.map(function(obj,idx){
				return product.createListItem(obj);
			})
			//返回元素html
			return li.join('');
		},
		// 创建列表元素
		createListItem:function(obj){
			if (!obj) {return '';}
			// 列表元素模板
			var template = 	'<div class="p-item">'+
						   	'	<img src="{src}" alt="">'+
							'	<span class="title" title="{title}">{title}</span>'+
							'	<span class="provider">{provider}</span>'+
							'	<span class="learner-count"><span class="count">{count}</span></span>'+
							'	<span class="price">{price}</span>'+
							'</div>';
			// 替换实体数据
			return template.replace('{src}',obj.middlePhotoUrl)
						   .replace(/{title}/g,obj.name)
						   .replace('{provider}',obj.provider)
						   .replace('{count}',obj.learnerCount)
						   .replace('{price}',cHelper.translateMoney(obj.price));
		},
		// 绑定事件
		bindEvent:function(){
			var product = this;
			//tab标签点击事件
			listContiner.find('.tab li').click(function(){
				$(this).addClass('activity').siblings().removeClass('activity');
				var target = $(this).attr('target');
				var div = listContiner.find('#'+target+'');
				if (div.is(':hidden')) {
					var type = typeDic[target];
					div.fadeIn().siblings('div').fadeOut();
					currentType = target;
					if (!type.isRendered) {
						product.getListData();
					}
				}
			})
			//初始时，首个元素点击
			listContiner.find('.tab li').eq(0).click();
		},
		registerWindowResize:function(){
			cHelper.register('onresize',this.reRenderPagination,this);
		},
		reRenderPagination:function(){
			if (listWidth == listContiner[0].offsetWidth) {
				return;
			}
			listWidth = listContiner[0].offsetWidth;
			for (var i in typeDic) {
				typeDic[i].pagination.reRender(listWidth);
			}
		}
	}
}
// 分页控件
var Pagination = function (type,width){
	var singleItmWidth = 226; //单个元素宽度
	var maxRow = 5;			  //最大行数
	var cHelper = CommonHelper ? CommonHelper : {};
	var continer = $('#' + type + ' .page');
	var currentPage = 1; 
	//页码大小 = 页面宽度 / 单个元素宽度 * 总行数
	var pageSize = parseInt(width/  singleItmWidth) * maxRow;
	var hasRendered = false; //记录是否已经渲染过
	var totalCount = 0; //总数量
	var switchCallback = function(){}; //页码切换回调
	var callbackTarget = this; //指定回调函数的指向对象，默认为this
	var offsetTop = 0; //记录分页控件距离文档顶端的距离
	return {
		pageNum:function(){
			return currentPage;
		},
		pageSize:function(){
			return pageSize;
		},
		render:function(tPage,tCount,sCallback){
			if (hasRendered && this.totalPage() == tPage) {
				return this;
			}
			switchCallback = sCallback || switchCallback;
			totalCount = CommonHelper.fiterValue(tCount,totalCount);
			this.createPagination(this.totalPage());
			hasRendered = true;
			return this;
		},
		createPagination:function(totalPage){
			// select
			var pageLi = '<li plus="-1" class="prev"></li>{li}<li plus="1" class="next"></li>';
			var li = [];
			currentPage > totalPage && (currentPage = totalPage);
			for (var i = 1; i <= totalPage; i++) {
				li.push('<li{class}>{i}</li>'.replace(/{i}/g,i)
											 .replace('{class}',i == currentPage ? ' class="select"' : ""));
			}
			continer.empty().append(pageLi.replace('{li}',li.join('')));
			this.bindEvent();
		},
		bindEvent:function(){
			var prod = this;
			continer.find('li').click(function(){
				// 获取当前元素的页码增量属性
				var plus = parseInt($(this).attr('plus') || 0);
				// 若增量为-1且当前为第一页,或增量为1且当前为最后一页,则不做处理
				if ((plus == -1 && currentPage == 1) || (plus == 1 && currentPage == prod.totalPage())) {
					return;
				}
				// 当前页数增量累加
				currentPage += plus;
				// 若增量为0,即非向前/向后操作
				if (plus == 0) {
					// 获取文本即为所点击的页码
					var page = parseInt(this.innerText);
					// 若点击页码与控件当前页码相同,则不做处理
					if (currentPage == page) {
						return;
					}
					// 操作页码赋值给当前页码
					currentPage = page;
				}
				// 记录分页控件距离文档顶端的距离
				offsetTop = this.offsetTop;
				// 重新选择页码
				$(this.parentNode.children[currentPage]).addClass('select').siblings().removeClass('select');
				// 触发页码切换回调事件
				switchCallback && (typeof switchCallback == 'function') && switchCallback.call(callbackTarget);
			});
		},
		// 设置回调函数内部指向
		setCallbackTarget:function(target){
			callbackTarget = target || this;
			return this;
		},
		// 设置文档卷起高度
		setDocumentScrollTop:function(){
			//文档卷起的距离，变化量为分页控件当前距离文档顶端距离 - 上一次距离，如此保证分页控件在屏幕显示位置不变
			document.documentElement.scrollTop += offsetTop == 0? 0 : (continer.offset().top - offsetTop);
		},
		reRender:function(width){
			pageSize = parseInt(width / singleItmWidth) * maxRow;
			this.createPagination(this.totalPage());
		},
		// 获取分页总页数
		totalPage:function(){
			return parseInt(totalCount / pageSize) + (totalCount % pageSize == 0 ? 0 : 1);
		}
	}
}
