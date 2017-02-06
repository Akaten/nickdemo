/**
 * Created by nick on 2016/11/7.
 */
var paiService=angular.module("paiService",[]);
paiService.service("paifun",['$rootScope','$q','$http',function ($rootScope,$q,$http) {
    var service = {
        login:function(user){//登录
            var param =user;
            var url="http://wallet.pigamegroup.com/user/userlogin";
            var config={
                url:url,withCredentials:true,
                data:$.param(param),
                method:"POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            };
            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http(config).success(function(data,status,headers,config){

                if (data.status && data.status == "success") {
                    deferred.resolve(data.data);
                } else {
                    deferred.reject(data.data);
                    layer.alert('用户名或密码错误', {
                        skin: 'layui-layer-molv' //样式类名
                        ,closeBtn: 0,
                        shadeClose: true //开启遮罩关闭
                    });
                    console.log('==error code', data.resultCode)
                }
            });
            return  deferred.promise;
        },
        quit:function(){//退出功能
            var url=paiUrl.base_getUrl + "user/logout";
            var config={
                url:url,withCredentials:true,
                // data:$.param(param),
                method:"GET",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            };
            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http(config).success(function(data,status,headers,config){
                if (data.status && data.status == "success") {
                    deferred.resolve(data.data);
                } else {
                    deferred.reject(data);
                    console.log('==error code', data.resultCode)
                }
            });
            return  deferred.promise;
        },
        queryBalance:function(){//查询余额
            var url="http://wallet.pigamegroup.com/user/balance";
            var config={
                url:url,withCredentials:true,
                // data:$.param(param),
                method:"GET",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            };
            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http(config).success(function(data,status,headers,config){
                if (data.status && data.status == "success") {
                    deferred.resolve(data.data);
                } else {
                    deferred.reject(data);
                    console.log('==error code', data.resultCode)
                }

            });
            return  deferred.promise;
        },
        queryDepositlist:function(deposit){//查询充值订单列表
            var url=paiUrl.base_getUrl + "deposit/queryMyOrderList";
            var param =deposit;
                var config={
                    url:url,withCredentials:true,
                    data:$.param(param),
                    method:"POST",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                };
            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http(config).success(function(data,status,headers,config){
                if (data.status && data.status == "success") {
                    deferred.resolve(data.data);
                } else {
                    deferred.reject(data);
                    console.log('==error code', data.resultCode)
                }

            });
            return  deferred.promise;
        },

        queryDepositDetial:function(orderid){//查询充值订单详情
            var url=paiUrl.base_getUrl + "deposit/queryOrderDetail";
            var param ={orderId:orderid};
            var config={
                url:url,withCredentials:true,
                data:$.param(param),
                method:"POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            };
            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http(config).success(function(data,status,headers,config){
                if (data.status && data.status == "success") {
                    deferred.resolve(data.data);
                } else {
                    deferred.reject(data);
                    console.log('==error code', data.resultCode)
                }

            });
            return  deferred.promise;
        }
        ,
        queryDrawlist:function(draw){//查询提现订单列表
            var url=paiUrl.base_getUrl + "draw/queryMyOrderList";
            var param =draw;
            var config={
                url:url,withCredentials:true,
                data:$.param(param),
                method:"POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            };
            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http(config).success(function(data,status,headers,config){
                if (data.status && data.status == "success") {
                    deferred.resolve(data.data);
                } else {
                    deferred.reject(data);
                    console.log('==error code', data.resultCode)
                }

            });
            return  deferred.promise;
        },
        queryDrawdetial:function(drawid){//查询提现订单详情
            var url=paiUrl.base_getUrl + "draw/queryOrderDetail";
            var param ={orderId:drawid};
            var config={
                url:url,withCredentials:true,
                data:$.param(param),
                method:"POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            };
            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http(config).success(function(data,status,headers,config){
                if (data.status && data.status == "success") {
                    deferred.resolve(data.data);
                } else {
                    deferred.reject(data);
                    console.log('==error code', data.resultCode)
                }

            });
            return  deferred.promise;
        },
        updateBossinfo:function(bossinfo){//更新boss信息
            var url=paiUrl.base_getUrl + "pigame/modifyBossinfo";
            var param =bossinfo;
            var config={
                url:url,withCredentials:true,
                data:$.param(param),
                method:"POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            };
            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http(config).success(function(data,status,headers,config){
                if (data.status && data.status == "success") {
                    deferred.resolve(data.data);
                } else {
                    deferred.reject(data);
                    console.log('==error code', data.resultCode)
                }

            });
            return  deferred.promise;
        },
        queryBossinfo:function(bossid){//查询boss详情
            var url=paiUrl.base_getUrl + "pigame/queryBossDetail";
            var param ={id:bossid};
            var config={
                url:url,withCredentials:true,
                data:$.param(param),
                method:"POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            };
            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http(config).success(function(data,status,headers,config){
                if (data.status && data.status == "success") {
                    deferred.resolve(data.data);
                } else {
                    deferred.reject(data);
                    console.log('==error code', data.resultCode)
                }

            });
            return  deferred.promise;
        },
        cancelDepositorder:function(orderid){//取消充值订单详情
            var url=paiUrl.base_getUrl + "deposit/cancelOrder";
            var param ={id:orderid};
            var config={
                url:url,withCredentials:true,
                data:$.param(param),
                method:"POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            };
            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http(config).success(function(data,status,headers,config){
                if (data.status && data.status == "success") {
                    deferred.resolve(data.data);
                } else {
                    deferred.reject(data);
                    console.log('==error code', data.resultCode)
                }

            });
            return  deferred.promise;
        },
        cancelDraworder:function(orderid){//取消提现订单详情
            var url=paiUrl.base_getUrl + "draw/cancelOrder";
            var param ={id:orderid};
            var config={
                url:url,withCredentials:true,
                data:$.param(param),
                method:"POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            };
            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http(config).success(function(data,status,headers,config){
                if (data.status && data.status == "success") {
                    deferred.resolve(data.data);
                } else {
                    deferred.reject(data);
                    console.log('==error code', data.resultCode)
                }

            });
            return  deferred.promise;
        },
        confirmDepositorder:function(confirm){//确认充值订单
            var url=paiUrl.base_getUrl + "deposit/confirmByStep";
            var param =confirm;
            var config={
                url:url,withCredentials:true,
                data:$.param(param),
                method:"POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            };
            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http(config).success(function(data,status,headers,config){
                if (data.status && data.status == "success") {
                    deferred.resolve(data.data);
                } else {
                    deferred.reject(data);
                    console.log('==error code', data.resultCode)
                }

            });
            return  deferred.promise;
        },
        confirmDraworder:function(confirm){//确认充值订单
            var url=paiUrl.base_getUrl + "draw/confirmByStep";
            var param =confirm;
            var config={
                url:url,withCredentials:true,
                data:$.param(param),
                method:"POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            };
            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http(config).success(function(data,status,headers,config){
                if (data.status && data.status == "success") {
                    deferred.resolve(data.data);
                } else {
                    deferred.reject(data);
                    console.log('==error code', data.resultCode)
                }

            });
            return  deferred.promise;
        },
        payOrder:function(pay){//支付订单
            var url="http://wallet.pigamegroup.com/pay/payOrder";
            var param =pay;
            var config={
                url:url,withCredentials:true,
                data:$.param(param),
                method:"POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            };
            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http(config).success(function(data,status,headers,config){
                if (data.status && data.status == "success") {
                    deferred.resolve(data.data);
                } else {
                    deferred.reject(data);
                    layer.alert('您账号余额不足,请立即充值', {
                        skin: 'layui-layer-molv' //样式类名
                        ,closeBtn: 0
                    }, function(){
                        layer.closeAll();
                    });
                    console.log('==error code', data.resultCode)
                }

            });
            return  deferred.promise;
        },
        chosseDepositboss:function(orderid,bossid){//充值订单选定老板
            var url=paiUrl.base_getUrl + "deposit/chooseBoss";
            var param ={id:orderid,bossId:bossid};
            var config={
                url:url,withCredentials:true,
                data:$.param(param),
                method:"POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            };
            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http(config).success(function(data,status,headers,config){
                if (data.status && data.status == "success") {
                    deferred.resolve(data.data);
                } else {
                    deferred.reject(data);
                    console.log('==error code', data.resultCode)
                }

            });
            return  deferred.promise;
        },
        sendCode:function(mobile){//发送手机验证码
            var url=paiUrl.base_getUrl + "sms/sendByMobile";
            var param ={mobile:"18344024772",phoneCode:"86"};
            var config={
                url:url,withCredentials:true,
                data:$.param(param),
                method:"POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            };
            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http(config).success(function(data,status,headers,config){
                if (data.status && data.status == "success") {
                    deferred.resolve(data.data);
                } else {
                    deferred.reject(data);
                    console.log('==error code', data.resultCode)
                }

            });
            return  deferred.promise;
        },
        chosseDrawboss:function(orderid,bossid){//充值订单选定老板
            var url=paiUrl.base_getUrl + "draw/chooseBoss";
            var param ={id:orderid,bossId:bossid};
            var config={
                url:url,withCredentials:true,
                data:$.param(param),
                method:"POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            };
            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http(config).success(function(data,status,headers,config){
                if (data.status && data.status == "success") {
                    deferred.resolve(data.data);
                } else {
                    deferred.reject(data);
                    console.log('==error code', data.resultCode)
                }

            });
            return  deferred.promise;
        }


    }
    return service;
}])