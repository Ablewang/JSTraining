/* conf:{
* 		title:'弹窗标题',
* 		content:'主体内容',
* 		width:388, //宽度，默认388
* 		height:288, //高度，默认288
* 		isShow:true //是否直接显示到页面
* }
*/
function Popup(conf){
	var config = conf;
	var $pop = null;
	return {
		show:function(){
			$('body').append($pop);
		},
		render:function(){
			$pop = $(this.initPopup(config));
			this.setFormSize(config);
			this.bindEvent();
			config.isShow && this.show();
			return $pop;
		},
		initPopup:function(config){
			var template =  '<div class="c-popup">'+
							'	<div class="popup-form">'+
							'		<div class="top">'+
							'			<i class="close"></i>'+
							'			<span>{title}</span>'+
							'		</div>'+
							'		<div class="content">{content}</div>'+
							'	</div>'+
							'</div>';
			return template.replace('{title}',config.title)
						   .replace('{content}',config.content);
		},
		setFormSize:function(config){
			var f = $pop.find('.popup-form');
			if (config.width) {
				f.width(config.width);
				f.css('margin-left',"-" + (config.width/2) + "px");
			}
			if (config.height) {
				f.height(config.height);
				f.css('margin-top',"-" + (config.height/2) + "px");
			}
		},
		bindEvent:function(){
			$pop.find('.close').click(function(){
				$pop.remove();
			})
		}
	}
}