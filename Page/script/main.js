import React from 'react';
import {
	render
} from 'react-dom';

import Page from '../script/Page'



render(<Page maxNum={getRandomNum(20,100)} maxShowPage={getRandomNum(5,10)} pageSize={getRandomNum(5,10)} callback={callback} />, document.getElementById('root'))

function callback(cur_pg, itm_num,max_shw_pg) {
	console.log("大爷，当前页面：" + cur_pg + ",本页数据个数：" + itm_num+",总分页按钮："+max_shw_pg)
}
function getRandomNum(base,range){
	return base + Math.floor(Math.random() * range);
}