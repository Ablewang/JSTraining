import React from 'react';
import {
	render
} from 'react-dom';

import Page from '../script/Page'

render(<Page maxNum={123} maxPageNum={8} callback={callback} pageSize={5}/>, document.getElementById('root'))

function callback(cur_pg, itm_num) {
	alert("大爷，当前页面：" + cur_pg + "本页数据个数：" + itm_num)
}