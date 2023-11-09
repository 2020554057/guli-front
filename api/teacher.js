import request from '@/utils/request'

export default {
    // 根据手机号码发送短信
    getTeacherList(page, limit) {
        return request({
            url: `/eduservice/teacherFront/getTeacherFrontList/${page}/${limit}`,
            method: 'get'
        })
    },

    //讲师详情的方法
    getTeacherInfo(id) {
        return request({
            url: `/eduservice/teacherFront/getTeacherFrontInfo/${id}`,
            method: 'get'
        })
    }

}