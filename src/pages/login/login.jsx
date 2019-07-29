import React,{Component} from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import './login.less'
import logo from './images/logo.jpg'
import {reqLogin} from '../../api'
/*
 登陆的一级路由组件
*/

class Login extends Component {
    
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.form.validateFields(async (err,values)=>{
            if (!err) {
                const {username,password} = values
                try {
                    const response = await reqLogin(username,password)
                    console.log('ajax success',response.data)
                } catch (error){
                    console.log('fail',error)
                }
            
            }
        })
        // const form = this.props.form
        

    }

    //check the password
    validatePwd = (rule,value,callback) => {
        if (!value){
            callback('you must type in PWD')
        } else if(value.length < 4) {
            callback('PWD is too short')
        } else if(!/^[0-9a-zA-Z_]+$/.test(value)) {
            callback('type in wrong characaters')
        } else {
            callback()
        }
    }

    render () {
        const form = this.props.form
        const { getFieldDecorator } = form;
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React manage System</h1>
                </header>
                <section className="login-section">
                    <h2>user sign in</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                        {
                            getFieldDecorator('username',{
                                rules: [
                                    {required : true,whitespace:true,messege:'please type in username'},
                                    {min : 4,messege:'username must be at least 4 characaters'},
                                    {max : 12,messege:'username must be most 12 characaters'},
                                    {pattern : /^[0-9a-zA-Z_]+$/,messege:'username must be most letetas or numbers or _'},
                                ],
                                initialValue :'admin'
                            })(
                                <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />
                            )
                        }
                        </Form.Item>
                        <Form.Item>
                        {
                            getFieldDecorator('password',{
                                rules: [{
                                    validator: this.validatePwd
                                }]
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />
                            )
                        }
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }  
}
const WrapLogin =  Form.create()(Login)
export default WrapLogin
