import React from 'react'

import{Row, Col} from 'antd'
import {Menu, Icon,Tabs,message,Form,Modal, Button,CheckBox,Input} from 'antd';
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
const FormItem = Form.Item
const TabPane = Tabs.TabPane

 class PCHeader extends React.Component{
    constructor(){
        super()
        this.state={
            current:'top',
			haslogined:false,
			modalVisable:false,
			userNickName:'',
			userid:0,
			action:'login',
        }
    }
	// 利用localStorage可解决短期内自动登录功能
	componentWillMount(){
		if(localStorage.userid){
			this.setState({
				haslogined:true,
				userid:localStorage.userid,
				userNickName:localStorage.userNickName
			})
		}
	}

	setModalVisable(value){
		this.setState({
			modalVisable:value
		})
	}
	handleClick(e){
	// 注意这里自动传递的参数e指的是Menu中的不同的Menu.Item对象
		if(e.key =='register'){
			this.setModalVisable(true)	
		}
		this.setState({
			current:e.key
		})

	}
	callback(key){
		// console.log(e) 注意这里自动传递的参数e指的是tab中不同tabpane的key值
		if(key==1){
			this.setState({
				action:'login'
			})
		}else{
			this.setState({
				action:'register'
			})
		}
	}

	handleSubmit(e){
		// 页面开始向API提交数据
		e.preventDefault()
		myFetchOptions = {
			method:'GET'
		}
		var formData = this.props.form.getFieldsValue()
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
		+ "&username="+formData.userName+"&password="+formData.password
		+"&r_userName=" + formData.r_userName + "&r_password="
		+ formData.r_password + "&r_confirmPassword="
		+ formData.r_confirmPassword ,myFetchOptions)
		.then(response => response.json())
		.then(json => {
			this.setState({
				userNickName:json.NickUserName,
				userid: json.UserId
			})
			// 将用户信息保存在localStorage中
			localStorage.userid = json.UserId
			localStorage.userNickName = json.NickUserName
		})
		if(this.state.action == 'login'){
            this.setState({
                haslogined:true
            })
        }
		message.success("请求成功")
		this.setModalVisable(false)
	}
	// 当用户退出时需将localStorage设为''
	logout(){
		localStorage.userid = ''
		localStorage.userNickName = ''
		this.setState({
			haslogined:false
		})
	}

    render(){
		let {getFieldDecorator} = this.props.form;
		const userShow = this.state.haslogined
		?
		<Menu.Item key="logout" className="register">
			<Button type="primary" htmlType="button">{this.state.userNickName}</Button>&nbsp;&nbsp;
			<Link to={`/usercenter`} target="_blank">
				<Button type="dashed" htmlType="button">个人中心</Button>
			</Link>
			<Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
		</Menu.Item>
		:
		<Menu.Item key="register" class="register">
			<Icon type="appstore"/>注册/登录
		</Menu.Item>;
        return(
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4}>
						<a href="/" class="logo">
							<img src="./src/images/logo.png" alt="logo"/>
							<span>ReactNews</span>
						</a>
					</Col>
                    <Col span={16}>
                         <Menu selectedKeys={[this.state.current]} mode="horizontal" onClick={this.handleClick.bind(this)}     >
                            <Menu.Item key="top">
								头条
							</Menu.Item>
							<Menu.Item key="shehui">
								社会
							</Menu.Item>
							<Menu.Item key="guonei">
								国内
							</Menu.Item>
							<Menu.Item key="guoji">
								国际
							</Menu.Item>
							<Menu.Item key="yule">
								娱乐
							</Menu.Item>
							<Menu.Item key="tiyu">
								体育
							</Menu.Item>
							<Menu.Item key="keji">
								科技
							</Menu.Item>
							<Menu.Item key="shishang">
								时尚
							</Menu.Item>
                            <Menu.Item key="junshi">
								军事
							</Menu.Item>
                            <Menu.Item key="lishi">
								历史
							</Menu.Item>
							{userShow}
                           
                        </Menu>

                    </Col>
					<Col span={2}></Col>
                </Row>
				<Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisable} onCancel={()=>this.setModalVisable(false)} onOk={()=>this.setModalVisable(false)} okText="关闭" >
					<Row>
						<Col span={3}></Col>
						<Col span={18}>
							<Tabs type="card" onChange={this.callback.bind(this)}>
								<TabPane tab="注册" key="2">
									<Form horizontal onSubmit={this.handleSubmit.bind(this)}>
										<FormItem label="账户">
											<Input placeholder="请输入您的账号" {...getFieldDecorator('r_userName')}/>
										</FormItem>
										<FormItem label="密码">
											<Input type="password" placeholder="请输入您的密码" {...getFieldDecorator('r_password')}/>
										</FormItem>
										<FormItem label="确认密码">
											<Input type="password" placeholder="请再次输入您的密码" {...getFieldDecorator('r_confirmPassword')}/>
										</FormItem>
										<Button type="primary" htmlType="submit">注册</Button>
									</Form>
								</TabPane>
								<TabPane tab="登录" key="1">
									<Form horizontal onSubmit={this.handleSubmit.bind(this)}>
										<FormItem label="账户">
											<Input placeholder="请输入您的账号" {...getFieldDecorator('r_userName')}/>
										</FormItem>
										<FormItem label="密码">
											<Input type="password" placeholder="请输入您的密码" {...getFieldDecorator('r_password')}/>
										</FormItem>
										
										<Button type="primary" htmlType="submit">登录</Button>
									</Form>
								</TabPane>
							</Tabs>
						</Col>
						<Col span={3}></Col>
					</Row>
					
				</Modal>
            </div>
        );
    };
}

export default PCHeader = Form.create({})(PCHeader);