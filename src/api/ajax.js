import axios from 'axios'
import {message} from 'antd'

export default function ajax(url,data={},type='GET') {
    return new Promise((resolve,reject)=>{
        let promise
        if (type==='GET') {
            promise = axios.get(url,{ //配置对象
                params:data
            })
        } else {
            promise = axios.post(url,data)
        }
        promise.then(response => {
            resolve(response)
        }).catch(error => {
            //reject(error)
            message.error('unsuccess: '+ error.message)

        })
    })
}