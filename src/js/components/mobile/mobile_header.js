import React from 'react';
import {Row, Col} from 'antd';
import {Menu, Icon,Tabs,message,Form,Modal, Button,CheckBox,Input} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class MobileHeader extends React.Component{
     constructor(){
        super()
        this.state={
            current:'top',
			haslogined:false,
			modalVisable:false,
			userNickName:'',
			action:'login',
        }
    }
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
		if(e.key=='register'){
			this.setModalVisable(true)	
		}
		this.setState({
			current:e.key
		})

	}
    login(){
        this.setModalVisable(true)
    }

    callback(key){
		// console.log(e) 注意这里自动传递的参数this/e指的是tab中不同tabpane的key值
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
                userid:json.UserId
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
        let {getFieldDecorator} = this.props.form
        const userShow = this.state.haslogined ?
        <Link to={`/usercenter`}><Icon type="inbox" onClick={this.logout.bind(this)}/></Link>
        :
        <Icon type="setting" onClick={this.login.bind(this)}/>;
        return(
            <div id='mobileHeader'>
                <header>
                    <img src='./src/images/logo.png' alt='logo'/>
                    <span>ReactNews</span>
                    {userShow}
				</header>
                <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisable} onCancel={()=>this.setModalVisable(false)} onOk={()=>this.setModalVisable(false)} okText="关闭" >
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
				</Modal>
            </div>
            	
        )
    }
}
export default MobileHeader = Form.create({})(MobileHeader);