import React,{Component} from 'react'
import PopupCommonFun from './PopupCommonFun'
import '../css/popup.css'
class Popup extends Component{
	constructor(){
		super()
		this.state={
			unique:0,
			title:'',
			content:'',
			shade_close:false
		}
	}
	componentWillMount(){
		this.state.unique = this.props.unique || new Date().getTime()
		this.setState({
			shade_close:this.props.shade_close || false
		})
		this.setState({
			title:this.props.title || ''
		})
		this.setState({
			content:this.props.content || ''
		})
	}
	handelClose(){
		PopupCommonFun.closePopup(this.state.unique);
	}
	render(){
		return (
			<div data-unique={this.state.unique} className="popup-c">
				<div className="popup-shade" onClick={()=>{this.state.shade_close ? this.handelClose() : null ;}}></div>
				<div className="popup-content">
				<div className="popup-close" onClick={()=>{this.handelClose();}}></div>
				<div className="popup-title">{this.state.title}</div>
				{this.state.content}
				</div>
			</div>
		)
	}
}

export default Popup