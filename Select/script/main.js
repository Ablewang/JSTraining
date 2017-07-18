import React from 'react';
import {
	render
} from 'react-dom';

import Popup from '../script/Popup'
import Select from '../script/Select'
let textArr = [
"宫保鸡丁","可乐鸡翅","排骨萝卜汤","茄子西红柿",
"鸭肫炒青椒","红烧青鱼段","茭白肉丝","蒜蓉娃娃菜",
"梅干菜烧肉","豆豉鸡翅","鲫鱼豆腐汤","豇豆炒肉丝",
"香菇排骨","蒜苔炒肉丝","皮蛋黄瓜汤","盐水对虾",
"牛肚炒大蒜","洋葱炒鸡蛋","莴笋烧肉","酸辣土豆丝",
"鱿鱼炒洋葱","蚝油牛肉","糖醋炸香骨","平菇鱼丸汤",
"毛豆鸡丁","干煸四季豆","爆炒圆白菜","青椒肉丝",
"毛豆烧鸡块","红烧鲳扁鱼","面筋包塞肉","蚝油生菜",
"爆炒腰花","百合鱼片","榨菜肉丝汤","咖喱土豆牛肉",
"木耳鱼丸","鱼香肉丝","黄花菜炒鸡蛋","紫菜蛋汤",
"花菜烧肉","豆腐金针菇汤","脆皮豆腐"];


function callback(obj) {
	console.log('this is callback.you have chosen:'+obj.value + "   " + obj.text)
}
function getObjLst(arr,len){
	let objLst = [];
	len = len > arr.length ? len :arr.length;
	for (var i = 0; i < len; i++) {
		objLst.push({value:i,text:arr[i]});
	}
	return objLst;
}
document.getElementById('btnPopup').onclick = function(){
	render(<Popup shade_close={true} title="" unique={123} content={
		<Select data={getObjLst(textArr,10)} originalParent={document.body} callback={callback} />
	}/>, document.getElementById('popup'))
}
