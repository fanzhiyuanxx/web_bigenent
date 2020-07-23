// 每次调用get post ajax 会先调用ajaxPrefilter
$.ajaxPrefilter(function(options){
    options.url = 'http://ajax.frontend.itheima.net' + options.url
})