/**
 * Created by nick on 2016/11/7.
 */
var moJinApp=angular.module('moJinApp',['ngRoute','mojinController']);
moJinApp.config(['$routeProvider',function ($routeProvider) {
    $routeProvider
        .when('/login',{//登录
            templateUrl:'modul/login.html',
            controller:'loginCtrl'
        })
        .when('/depositlist',{//充值订单列表
            templateUrl:'modul/depositlist.html',
            controller:'depositCtrl'
        })
        .when('/depositdetial/:id',{//充值订单详情
            templateUrl:'modul/depositdetial.html',
            controller:'depositdetialCtrl'
        })
        .when('/drawlist',{//提现订单列表页面
                templateUrl:'modul/drawlist.html',
                controller:'drawCtrl'
            })
        .when('/drawlistdetial/:id',{//提现订单列表页面
            templateUrl:'modul/drawdetial.html',
            controller:'drawdetialCtrl'
        })
        .when('/updaterate',{//手续费修改
            templateUrl:'modul/updaterate.html',
            controller:'updateCtrl'
        }).otherwise({
            redirectTo: '/login'
        });
}]);