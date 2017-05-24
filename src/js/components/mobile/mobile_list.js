import React from 'react';
import {Router, Route, Link, browserHistory} from 'react-router';
import {Card,Row,Col} from 'antd';
import Tloader from 'react-touch-loader';//点击加载更多--上拉刷新


export default class MobileList extends React.Component{
	constructor(){
		super()
		this.state={
			news:'',
			count:5,
			hasMore:0,
			initializing:1,
			refreshedAt:Date.now()
		}
	}
	componentWillMount(){
		var myFetchOptions={
			method:'GET'
		}
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
				this.setState({
                    news:json
                })
			}
		)
	}
	componentDidMount(){
		setTimeout(() => {
			this.setState({
				hasMore:1,
				initializing:2
			})
		},2e3)
	}

	loadMore(resolve){
		var myFetchOptions={
			method:'GET'
		}
		var count = this.state.count
		setTimeout(() => {
			this.setState({
				count:count+5
			})
			fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.state.count, myFetchOptions)
			.then(response=>response.json())
			.then(json=>{
					this.setState({
						news:json
					})
				}
			)
		},2e3)
		this.setState({
			hasMore: count>0 && count<50
		})
		resolve()  //不再显示转圈
	}

	render(){
		var {hasMore,initializing,refreshedAt}=this.state

		const {news}= this.state;
		const newsList=news.length 
		?
		news.map((newsItem,index)=>(
			<section key={index} className="m_article list_item special_section clearfix">
				<Link to={`details/${newsItem.uniquekey}`} >
					<div className="m_article_img">
						<img src={newsItem.thumbnail_pic_s} alt={newsItem.title}/>
					</div>
					<div className="m_article_info">
						<div className="m_article_title">{newsItem.title}</div>
						<div className="m_article_desc clearfix">
							<div className="m_article_desc_l">
								<span className="m_article_channel">{newsItem.realtype}</span>
								<span className="m_article_time">{newsItem.date}</span>
							</div>
						</div>
					</div>
				</Link>
			</section>
		))
		:
		"没有加载到任何新闻"
		
		return(
			<div>
                <Row>
                    <Col span={24}>
						<Tloader className="main" onLoadMore={this.loadMore.bind(this)} hasMore={hasMore} initializing={initializing} >
							{newsList}
						</Tloader>
					</Col>
                </Row>
            </div>
		)
	}
}

