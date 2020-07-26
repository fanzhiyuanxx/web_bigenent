$(function () {
    // 调用getUserInfo 获取用户基本信息
    getUserInfo();
    var layer = layui.layer;

    // 点击退出按钮 实现退出功能
    $("#btnLogout").on('click', function () {
        // 弹出提示框 提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            // 清空本地的token
            localStorage.removeItem('token');
            // 跳转到登录页面
            location.href = '/login.html'
            // 关闭confirm提示框
            layer.close(index)
        })
    })


})
// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url:"/my/userinfo",
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败!')
            }
            // 调用renderAvatar渲染用户头像
            renderAvatar(res.data);
        }

        // 不论成功还是失败 都会调用complete回调函数
        // complete: function (res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 清空本地的token
        //         localStorage.removeItem('token');
        //         // 跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })

}
// 渲染用户头像
function renderAvatar(user) {
    // 1.获取用户名称
    var name = user.nickname || user.username
    // 2.设置欢迎的文本
    $("#welcome").html('欢迎&nbsp;&nbsp;' + name)
    // 3.渲染用户的头像
    if(user.user_pic !== null) {
        // 渲染图片头像
        $(".layui-nav-img").attr('src',user.user_pic).show()
        $(".text-avatar").hide()
    } else {
        // 渲染文本头像
        $(".layui-nav-img").hide() 
        var first = name[0].toUpperCase();
        $(".text-avatar").html(first).show()
    }
}