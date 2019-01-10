import axios from 'axios'
import {message} from 'antd'

axios.interceptors.response.use(
  response => {
    return response;
  },
  error=>{
    if(error.response) {
      console.log("2222",error.response)
      let responseCode = error.response.status;
      let msg = error.response.data;
      switch (responseCode) {
        case 404:
          return (
            message.error("未知请求!",5)
          )
        case 500:
          return (
            message.error(msg.msg,5)
          )
        default:
          return
      }
    }
    //return Promise.reject(error.response.data)
    // console.log(error.response)
  }

)






function HTTPAxios(url,methods,params){
  const defaultOpts ={
    url:url,
    method:methods, // 请求状态
    //timeout:20*1000, // 20秒超时
    // headers:{
    //   "Accept": "application/json; charset=utf-8",
    //   "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8;application/json",
    //   "Cookie":'JSESSIONID=9006232EA621D631B843ECAC635445CE'
    // }
    withCredentials: true
  }
  // 如果是get请求
  if(methods==="GET") {
    defaultOpts.params=params
  }else{
    defaultOpts.data=params
  }

  let promise =new Promise(function(resolve,reject) {
    axios(defaultOpts)
    .then((res)=>{
      resolve(res); // 成功
    })
    .catch((response)=>{
      reject(response); // 失败
    })
  })
return promise

}
export default HTTPAxios
