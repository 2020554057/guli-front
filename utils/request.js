import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import cookie from 'js-cookie'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:9001', // api的base_url
  timeout: 20000 // 请求超时时间
})

//第三步 创建拦截器  http request 拦截器
service.interceptors.request.use(
  config => {
    //debugger
    //判断cookie里面是否有名称是guli_token数据
    if (cookie.get('guli_token')) {
      //把获取cookie值放到header里面
      config.headers['token'] = cookie.get('guli_token');
    }
    return config
  },
  err => {
    return Promise.reject(err);
  })

// http response 拦截器
service.interceptors.response.use(
  response => {
    //debugger
    if (response.data.code == 28004) {
      //未登录提示
      console.log("response.data.resultCode是28004")
      MessageBox.confirm('请先登录！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      }).then(() => {
        // 确认按钮的回调函数
        // 在这里可以执行确认按钮被点击后的逻辑
        // 返回 错误代码-1 清除ticket信息并跳转到登录页面
        //debugger
        window.location.href = "/login"
        return
      }).catch(() => {
        // 取消按钮的回调函数
        // 在这里可以执行取消按钮被点击后的逻辑
        return
      });
    } else {
      if (response.data.code !== 20000) {
        //25000：订单支付中，不做任何提示
        if (response.data.code != 25000) {
          Message({
            message: response.data.message || 'error',
            type: 'error',
            duration: 5 * 1000
          })
        }
      } else {
        return response;
      }
    }
  },
  error => {
    return Promise.reject(error.response)   // 返回接口返回的错误信息
  });

export default service