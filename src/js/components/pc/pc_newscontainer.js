import React from 'react'
import{Row, Col} from 'antd'
import {Tabs,Carousel} from 'antd'

import PCNewsBlock from './pc_news_block';
import PCNewsImageBlock from './pc_news_image_block';
import PCProduct from './pc_product'
const TabPane = Tabs.TabPane
export default class PCNewsContainer extends React.Component{
    render(){
        const settings = {
            dots:true,
            infinite:true,
            speed: 500,
            slidesToShow:1,
            autoplay:true
        };
        return(
            <div>
                <Row>
					<Col span={2}></Col>
					<Col span={20} class="container">
                        <div class="leftContainer">
                            <div class="carousel">
                                <Carousel {...settings}>
                                <div><img src="./src/images/carousel_1.jpg"/></div>
                                <div><img src="./src/images/carousel_2.jpg"/></div>
                                <div><img src="./src/images/carousel_3.jpg"/></div>
                                <div><img src="./src/images/carousel_4.jpg"/></div>
                                </Carousel>
                            </div>
                            <PCNewsImageBlock type="shehui" count={6} width="400px" cartTitle="社会新闻" imageWidth="112px"></PCNewsImageBlock>
                        </div>
                        <Tabs class="tabs_news">
                            <TabPane tab="头条新闻" key='1'>
                            <PCNewsBlock type="top" count={22} width="100%" bordered="false"></PCNewsBlock>
                            </TabPane>
                            <TabPane tab="国际" key='2'>
                            <PCNewsBlock type="guoji" count={22} width="100%" bordered="false"></PCNewsBlock>
                            </TabPane>
                            <TabPane tab="国内" key='3'>
                            <PCNewsBlock type="guonei" count={22} width="100%" bordered="false"></PCNewsBlock>
                            </TabPane>
                        </Tabs>
                        <Tabs className="tabs_product">
                            <TabPane tab="ReactNews 产品" key="3"><PCProduct/></TabPane>
                        </Tabs>
                        <div>
							<PCNewsImageBlock count={16} type="yule" width="100%" cartTitle="娱乐新闻" imageWidth="132px"/>
                            <PCNewsImageBlock count={16} type="keji" width="100%" cartTitle="科技新闻" imageWidth="132px"/>
						</div>

                    </Col>
					<Col span={2}></Col>
				</Row>
            </div>
        )
    }
}