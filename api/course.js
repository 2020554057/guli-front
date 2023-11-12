import request from '@/utils/request'

export default {
    //查询所有分类（一级，二级）的方法
    getAllSubject(){
        return request({
            url: `/eduservice/edusubject/getAllSubject`,
            method: 'get'
        })
    },

    //按条件查询所有课程分类数据
    getFrontCourseList(page,limit,searchObj){
        return request({
            url: `/eduservice/courseFront/getFrontCourseList/${page}/${limit}`,
            method: 'post',
            data: searchObj
        })
    }
}