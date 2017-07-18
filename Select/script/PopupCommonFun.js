let PopupCommonFun = {
	getElmByCls:(cls)=>{
		if (document.getElementsByClassName) {
			return document.getElementsByClassName(cls);
		}
		let res = [];
		let divs = document.getElementsByTagName('div');
		for (var i = divs.length - 1; i >= 0; i--) {
			if (divs[i].className.indexOf(cls) >= 0) {
				res.push(divs[i]);
			}
		}
		return res;
	},
	closePopup:(unique)=>{
		let pops = PopupCommonFun.getElmByCls('popup-c');
		for (var i = pops.length - 1; i >= 0; i--) {
			let att_unique = pops[i].getAttribute('data-unique');
			if (att_unique && att_unique == unique) {
				pops[i].parentNode.removeChild(pops[i]);
				break;
			}
		}
	},
	closeAll:()=>{
		let pops = PopupCommonFun.getElmByCls('popup-c');
		for (var i = pops.length - 1; i >= 0; i--) {
			pops[i].parentNode.removeChild(pops[i]);
		}
	}
}

export default PopupCommonFun
