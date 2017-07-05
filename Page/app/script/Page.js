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
			max_pg_num: 10,
			cur_pg: 5,
			callback: null
		}
	}
	componentWillMount() {
		this.setState({
			max_num: this.props.maxNum || 1,
			max_pg_num: this.props.maxPageNum || 1,
			pg_size: this.props.pageSize || 12,
			pg_num: Math.ceil((this.props.maxNum || 12) / this.props.pageSize || 12),
			callback: this.props.callback
		})
	}
	setPage(pg) {
		if (pg < 1 || pg > this.state.pg_num) {
			alert('大爷，输入正确数字啊！');
		} else {
			this.setState({
				cur_pg: pg,
			})
		}
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
			<div className="g-page">
				<span className="u-turn u-turn-prev"></span>
				<PageLi {...this.state} setPage={this.setPage} />
				<span className="u-turn u-turn-next"></span>
				<div className="m-skip">
					<input className="m-skip-txt" onChange={(e)=>{this.state.skip = e.target.value.trim()}} type="text" />
					<input className="m-skip-btn" onClick={()=>{this.skip();}} type="button" value="跳转"/>
				</div>
			</div>
		);
	}
}

class PageLi extends Component {
	creatLi(pg_num, max_pg_num) {
		let res = [];
		for (let i = 1; i <= max_pg_num; i++) {
			res.push(<li key={i} onClick={()=>{this.props.setPage(i);}} className={i == this.props.cur_pg ? "m-page-cur" :""}>{i}</li>);
		}
		return res;
	}
	render() {
		let max_pg = Math.ceil(this.props.max_num / this.props.pg_size)
		return (
			<ul className="m-page">
				{this.creatLi(this.props.pg_num,this.props.max_pg_num)}
			</ul>
		)
	}
}


export default Page