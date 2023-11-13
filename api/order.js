import request from '@/utils/request'

export default {

  // 生成订单
  createOrders(courseId) {
    return request({
      url: `/eduorder/order/createOrders/${courseId}`,
      method: 'post'
    })
  },

  //根据订单id获取订单信息
  getOrdersInfo(orderId) {
    return request({
      url: `/eduorder/order/getOrdersInfo/${orderId}`,
      method: 'post'
    })
  },

  //生成二维码的方法
  createNative(orderNo) {
    return request({
      url: '/eduorder/paylog/createNative/' + orderNo,
      method: 'get'
    })
  },

  //查询订单状态的方法
  //生成二维码的方法
  queryPayStatus(orderNo) {
    return request({
      url: '/eduorder/paylog/queryPayStatus/' + orderNo,
      method: 'get'
    })
  }
}