import React from 'react'
import{Row, Col,BackTop} from 'antd'
import MobileHeader from './mobile_header'
import MobileFooter from './mobile_footer'
import CommonComments from '../common_comments'
export default class MobileNewsDetails extends React.Component{
    constructor(){
        super()
        this.state={
            newsItem:''
        }
    }
    componentDidMount(){
       
        const myFetchOptions = {
            method:'GET'
        }
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.params.uniquekey,myFetchOptions)
        .then(response => response.json())
        .then(json => {
            this.setState({
                newsItem:json
            })
            document.title = this.state.newsItem.title
        })
    }
    createMarkup(){
        return {__html:this.state.newsItem.pagecontent}
    }
    render(){
        return(
            <div id="mobileDetailsContainer">
                <MobileHeader/>
                <div className="ucmobileList">
                    <Row>
                        <Col span={24} className="container">
                            <div class="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                             <CommonComments uniquekey={this.props.params.uniquekey} />
                        </Col>
                    </Row>
                </div>
                <MobileFooter/>
                <BackTop/>
            </div>
        )
    }
}