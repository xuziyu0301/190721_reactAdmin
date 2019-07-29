import ajax from './ajax'
import axios from 'axios'
// export function reqLogin (username,password) {
//     return axios ('/login',{username,password},'POST')
// }

export const reqLogin = (username,password) => axios ('/login',{username,password},'POST')
export const reqAddUser = (user) => axios ('/manage/user/add',user,'POST')