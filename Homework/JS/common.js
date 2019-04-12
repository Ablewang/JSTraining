(function CommonHelper(w){
	var eimtLib = {};
	w.CommonHelper = {
		// 根据名称获取cookie
		getCookie:function(name){
			var arr,reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)"); //正则
			if(arr = document.cookie.match(reg)) return unescape(arr[2]); //若匹配到，则返回内容
			else return null; //否则返回空
		},
		// 设置cookie，默认过期时间1天
		setCookie:function(name,value,expiredays){
			if (!name.length) {return;} //空值过滤
			var exp = new Date();
			exp.setTime(exp.getTime() + (expiredays || 1)*24*60*60*1000); //设置过期日期
			document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); //设置cookie
		},
		// 根据名称删除cookie
		deleteCookie:function(name){
			var exp = new Date();
			exp.setTime(exp.getTime() - 1);
			var cval = this.getCookie(name);
			if(cval != null)
				document.cookie= name + "="+cval+";expires="+exp.toGMTString();
		},
		post:function(url,param,callback){
			$.post(url,param,function(res){
				callback && (typeof callback == 'function') && callback(res);
			});
		},
		get:function(url,param,callback){
			jQuery.support.cors=true; //为兼容IE8，在跨域时需要开启CORS协议
			$.get(url,param,function(res){
				callback && (typeof callback == 'function') && callback(res);
			});
		},
		// 金钱数量固定小数点后两位
		translateMoney:function(price){
			return price == null || price == undefined ? '' : price.toFixed(2);
		},
		// null或undefined值过滤
		fiterValue:function(value,ovalue){
			return value == null || value == undefined ? ovalue : value;
		},
		register:function(type,callback,callbackTarget){
			! eimtLib[type] && (eimtLib[type] = []);
			var exsit = eimtLib[type].filter(function(itm){return itm.name == callback.name;});
			if (exsit.length) {
				exsit[0].callback = callback;
				exsit[0].callbackTarget = callbackTarget || this;
			}else{
				eimtLib[type].push({
					name:callback.name,
					callback:callback,
					callbackTarget:callbackTarget || this
				})
			}
		},
		windowResize:function(){
			var $this = this;
			window.onresize = function(){
				$this.emit('onresize',arguments);
			}
		},
		emit:function(type,params){
			eimtLib && eimtLib[type] && eimtLib[type].forEach(function(itm,idx){
				itm && itm.callback && (typeof itm.callback == 'function') && itm.callback.call(itm.callbackTarget,params);
			})
		}
	}
})(window);