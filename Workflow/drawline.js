let lst = document.getElementById('uList');
let orgContiner = lst.parentNode;
initDrag();

function initDrag() {
	let iList = document.getElementsByClassName('icon');
	for (var i = iList.length - 1; i >= 0; i--) {
		drag(iList[i]);
	}
}

function initLine() {
	let liLst = lst.children;
	for (var i = 0; i < liLst.length; i++) {
		liLst[i]
	}
}

let curObj = null;
let continerOffX = 0,
	continerOffY = 0;
document.onmousemove = function(e) {
	e = e ? e : event;
	if (curObj) {
		let x = e.clientX - continerOffX;
		let y = e.clientY - continerOffY;
		x = x < 0 ? 0 : x > (orgContiner.offsetWidth - curObj.offsetWidth) ? (orgContiner.offsetWidth - curObj.offsetWidth) : x;
		y = y < 0 ? 0 : y > (orgContiner.offsetHeight - curObj.offsetHeight) ? (orgContiner.offsetHeight - curObj.offsetHeight) : y;
		curObj.style.left = x + 'px';
		curObj.style.top = y + 'px';
	}
}
document.onmouseup = function() {
	curObj = null;
	curX = curY = 0;
}

function drag(obj) {
	obj.onmousedown = function(e) {
		let par = obj.parentNode;
		e = e ? e : event;
		curObj = par;
		continerOffX = e.clientX - par.offsetLeft;
		continerOffY = e.clientY - par.offsetTop;
	}
}