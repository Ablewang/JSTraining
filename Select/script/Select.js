import React, {
	Component
} from 'react'
import '../css/select.css'
class Select extends Component {
	constructor() {
		super()
		this.chooseList = this.chooseList.bind(this)
		this.state = {
			data:null,
			chosen:null,
			show_list:false,
			cur_chosen:null,
			select_key:''
		}
	}
	componentWillMount(){
		this.setState({
			data:this.props.data||null,
			chosen:this.props.data||[],
		})
	}
	componentDidUpdate(){
		if (this.refs.chos) {
			this.updateScrollHeight(this.refs.chos.offsetHeight + this.refs.chos.offsetTop)
		}
	}
	updateScrollHeight(listH){
		if (listH > window.innerHeight) {
			this.props.originalParent.scrollTop += listH;
		}
	}

	chooseList(obj){
		this.setState({
			cur_chosen:obj||null
		})
		document.getElementById('select-ipt-txt').value = !obj ? '' : (obj.text || '');
		this.props.callback(obj);
	}

	setShow(show){
		this.setState({
			show_list:show
		})
	}
	changeText(e){
		if (e.target) {
			this.setState({
				select_key:e.target.value
			});
		}
	}
	render() {
		return (
			<div ref="chos" onFocus={()=>{this.setShow(true);}} onBlur={()=>{
							let timmer = setTimeout(
								()=>{
									this.setShow(false);
									clearTimeout(timmer);
								},150);
						}
					}  className="select-c">
				<div className="select-ipt">
					<input type="text" onChange={(e)=>{this.changeText(e);}} id="select-ipt-txt" className="ipt-txt" />
				</div>
				{
					this.state.show_list ? <ChosenList choose={this.chooseList} data={this.state.data} skey={this.state.select_key}/> : ''
				}
			</div>
		);
	}
}

class ChosenList extends Component{
	choose(e){
		let tag = e.target;
		if (tag && this.props.choose) {
			this.props.choose({text:tag.innerHTML,value:tag.getAttribute('data-index')})
		}
	}
	render(){
		let data = this.props.data || [];
		let listItem = [];
		let skey = this.props.skey || '';
		for (var i = 0; i < data.length; i++) {
			if (data[i].text.indexOf(skey) >= 0) {
				listItem.push(data[i]);
			}
		}
		return(
			<div className="select-dt">
				{
					listItem.map((itm,idx)=>{
						return <span key={idx} onClick={(e)=>{this.choose(e);}} data-index={itm.value}>{itm.text}</span>;
					})
				}
			</div>
		)
	}
}

export default Select