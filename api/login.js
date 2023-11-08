import request from '@/utils/request'

export default {
  // 登陆的方法 获取token
  submitLoginUser(userInfo) {
    return request({
      url: '/educenter/member/login',
      method: 'post',
      data: userInfo
    })
  },
  // 根据 token 值获取用户信息
  getLoginUserInfo() {
    return request({
      url: '/educenter/member/getMemberInfo',
      method: 'get'
    })
  }
}