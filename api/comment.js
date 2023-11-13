import request from '@/utils/request'

export default {
    //查询评论分页的接口
    getPageList(page, limit, courseId) {
        return request({
            url: `/eduservice/comment/getCommentPage/${page}/${limit}`,
            method: 'get',
            params: courseId
        })
    },

    //添加评论的接口
    addComment(comment) {
        return request({
            url: `/eduservice/comment/auth/addComment`,
            method: 'post',
            data: comment
        })
    }
}