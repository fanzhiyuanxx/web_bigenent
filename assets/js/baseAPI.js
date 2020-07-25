// 每次调用get post ajax 会先调用ajaxPrefilter
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url;

    if(options.url.indexOf('/my/')!== -1) {
        options.headers = {
            Authorization:localStorage.getItem('token') || ''
        }
    }
    // 全局统一挂载complete函数
    options.complete = function (res) {
        // 不论成功还是失败 都会调用complete回调函数

        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1. 强制清空 token
            localStorage.removeItem('token')
            // 2. 强制跳转到登录页面
            location.href = '/login.html'
        }
    }
    // 统一为有权限的接口，设置 headers 请求头
    // if (options.url.indexOf('/my/') !== -1) {
    //     options.headers = {
    //         Authorization: localStorage.getItem('token') || ''
    //     }
    // }
    
})