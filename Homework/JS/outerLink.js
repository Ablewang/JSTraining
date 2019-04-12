function Outerlink(){
	var continer = $('.c-outerlink');
	var cHelper = CommonHelper ? CommonHelper : {};
	var followBtn = null;
	return {
		// 渲染方法
		render:function(){
			this.initOuterLink();
		},
		// 获取头部导航数据
		getOuterLinkData:function(){
			return [{
				title:'网易公开课',
				content:'推出国内外名校公开课，涉及广泛的学科，名校老师认真讲解深度剖析，网易视频公开课频道搭建起强有力的网络视频教学平台。',
				href:'http://open.163.com/',
				src:'Images/open.png'
			},{
				title:'云课堂',
				content:'网易旗下大型在线学习平台，该平台面向学习者提供海量免费、优质课程,创新的个性化学习体验，自由开放的交流互动环境。',
				href:'http://study.163.com/',
				src:'Images/study.png'
			},{
				title:'中国大学MOOC',
				content:'是爱课程网携手云课堂打造的在线学习平台，每一个有提升愿望的人,都可以在这里学习中国最好的大学课程，学完还能获得认证证书。',
				href:'http://www.icourse163.org/',
				src:'Images/icourse163.png'
			}]
		},
		// 初始外部链接
		initOuterLink:function(){
			var list = this.getOuterLinkData();
			list && list.map && continer.append(this.createOuterLink(list));
			
		},
		createOuterLink:function(list){
			var ulOuterLink = '<ul>{li}</ul>';
			var liTemplate = '<li><img src="{src}" alt=""><div class="desc"><span class="title">{title}</span><span class="content">{content}</span><a target="_blank" class="detail" href="{href}">了解更多 ></a></div></li>';
			var li = list.map(function(itm,idx){
				return liTemplate.replace('{src}',itm.src)
								 .replace('{title}',itm.title)
								 .replace('{content}',itm.content)
								 .replace('{href}',itm.href);
			});
			return ulOuterLink.replace('{li}',li.join(''));
		}
	}
}
