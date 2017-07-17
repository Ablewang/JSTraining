import React, {
	Component
} from 'react'
import '../css/page.css'
class Page extends Component {
	constructor() {
		super()
		this.setPage = this.setPage.bind(this)
		this.state = {
			max_num: 0,
			skip: 1,
			pg_size: 1,
			pg_num: 1,
			max_shw_pg: 10,
			cur_pg: 1,
			min_skip_pg: 8,
			callback: null
		}
	}
	componentWillMount() {
		this.setState({
			max_num: this.props.maxNum || 1,
			max_shw_pg: this.props.maxShowPage || 1,
			pg_size: this.props.pageSize || 12,
			pg_num: Math.ceil((this.props.maxNum || 12) / this.props.pageSize || 12),
			callback: this.props.callback
		})
	}
	componentDidMount(){
		this.resetMaxShow();
		window.onresize=()=>{
			this.resetMaxShow();
		}
	}
	setPage(pg) {
		if (pg < 1 || pg > this.state.pg_num) {
			alert('大爷，输入正确数字啊！');
		} else {
			this.setState({
				cur_pg: pg,
			})
			this.props.callback(pg,pg < this.state.pg_num || !(this.state.max_num % this.state.pg_size) ? this.state.pg_size : (this.state.max_num % this.state.pg_size),this.state.max_shw_pg );
		}
	}
	turn(num){
		let pg = this.state.cur_pg + num;
		if (pg >= 1 && pg <= this.state.pg_num) {
			this.setPage(pg);
		}
	}
	resetMaxShow(){
		let maxShow = this.calcMaxShowNum()
		if (maxShow != this.state.max_shw_pg) {
			this.setState({
				max_shw_pg:maxShow
			})
		}
	}
	calcMaxShowNum(){
		let maxShow = this.state.max_shw_pg;
		let pageWt = this.refs.page.parentElement.offsetWidth;
		let ulWt = document.getElementById('page-ul').offsetWidth;
		let itemWt = 4;
		for (var i in this.refs) {
			if (i != 'page') {
				itemWt +=this.refs[i].offsetWidth + 4;
			}
		}
		ulWt = pageWt - itemWt;
		maxShow = Math.floor(ulWt / 24) - 2;
		return maxShow;
	}
	skip() {
		let skip = this.state.skip;
		let skipNum = skip.replace(/\D/g, '');
		if (skip != skipNum) {
			alert('大爷，输入正确数字啊！');
		} else {
			this.setPage(parseInt(skipNum));
		}
	}
	render() {
		return (
			<div ref="page" className="g-page">
				<span ref="prev" className="u-turn u-turn-prev" onClick={()=>{this.turn(-1);}}></span>
				{this.state.max_shw_pg < 3 ? <PageSpan {...this.state} />: <PageLi {...this.state} setPage={this.setPage} />}
				<span ref="next" className="u-turn u-turn-next" onClick={()=>{this.turn(1);}}></span>
				{
					this.state.pg_num >= this.state.min_skip_pg ?
					(
						<div ref="skip" className="m-skip">
							<input className="m-skip-txt" onChange={(e)=>{this.state.skip = e.target.value.trim()}} type="text" />
							<input className="m-skip-btn" onClick={()=>{this.skip();}} type="button" value="跳转"/>
						</div>
					):''
				}
				
			</div>
		);
	}
}

class PageLi extends Component {
	getLiList(pg_num, max_shw_pg) {
		if (max_shw_pg <= 0 ) {
			return <span></span>;
		}
		let res = [];
		if (pg_num <= max_shw_pg) {
			res = this.creatLi(1,pg_num);
		}else if(pg_num == max_shw_pg + 1){
			if (this.props.cur_pg > this.props.pg_num/2) {
				res.push(<li key={1} onClick={()=>{this.props.setPage(1);}} className={1 == this.props.cur_pg ? "m-page-cur" :""}>1</li>);
				res.push(<li key={2}>...</li>);
				res.push(this.creatLi(3,pg_num));
			}else{
				res.push(this.creatLi(1,pg_num - 2));
				res.push(<li key={pg_num - 1}>...</li>);
				res.push(<li key={pg_num} onClick={()=>{this.props.setPage(pg_num);}} className={pg_num == this.props.cur_pg ? "m-page-cur" :""}>{pg_num}</li>);
			}
		}else{
			let max_pg = max_shw_pg - 3;
			let iStart = this.props.cur_pg - Math.floor(max_pg / 2);
			let iEnd = this.props.cur_pg + Math.ceil(max_pg / 2);
			res.push(<li key={1} onClick={()=>{this.props.setPage(1);}} className={1 == this.props.cur_pg ? "m-page-cur" :""}>1</li>);
			if (iStart <= 2) {
				iEnd += 2 - iStart;
				iStart = 2;
				res.push(this.creatLi(iStart,iEnd));
				res.push(<li key={2}>...</li>);
			}else if(iEnd >= pg_num - 1){
				iStart -= iEnd - pg_num + 1;
				iEnd = pg_num - 1;
				res.push(<li key={pg_num - 1}>...</li>);
				res.push(this.creatLi(iStart,iEnd));
			}else{
				res.push(<li key={2}>...</li>);
				res.push(this.creatLi(iStart,iEnd));
				res.push(<li key={pg_num - 1}>...</li>);
			}
			res.push(<li key={pg_num} onClick={()=>{this.props.setPage(pg_num);}} className={pg_num == this.props.cur_pg ? "m-page-cur" :""}>{pg_num}</li>);
		}
		return res;
	}
	creatLi(begin,end){
		let res = [];
		for (let i = begin; i <= end; i++) {
			res.push(<li key={i} onClick={()=>{this.props.setPage(i);}} className={i == this.props.cur_pg ? "m-page-cur" :""}>{i}</li>);
		}
		return res;
	}
	render() {
		return (
			<ul id="page-ul" className="m-page">
				{this.getLiList(this.props.pg_num,this.props.max_shw_pg)}
			</ul>
		)
	}
}

class PageSpan extends Component{
	render(){
		return (
			<ul id="page-ul" className="m-page">
				<li>{this.props.cur_pg}/{this.props.pg_num}</li>
			</ul>
		)
	}
}
export default Page