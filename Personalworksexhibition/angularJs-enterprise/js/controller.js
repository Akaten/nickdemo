/**
 * Created by nick on 2016/10/27.
 */
var mojinController=angular.module('mojinController',['paiService']);

mojinController.controller('loginCtrl',['$scope','$rootScope','$http','$routeParams','paifun',function ($scope,$rootScope,$http,$routeParams,paifun) {
    $scope.user={};
    $scope.userLogin = function () {
        var promise = paifun.login($scope.user);
        promise.then(function (data) {
                location.href="index.html#/depositlist";
        });
    }



}
]);


mojinController.controller('rootCtrl',['$scope','$rootScope','$http','$routeParams','paifun',function ($scope,$rootScope,$http,$routeParams,paifun) {//全局controller

    $rootScope.quitLogin=function () {
        var promise=paifun.quit();
        promise.then(function(data){
            location.href="index.html#/login";
            $rootScope.user="";

        });
    }

    $rootScope.locations=function(){
        window.location.reload();

    }

}
]);


mojinController.controller('depositCtrl',['$scope','$rootScope','$http','$routeParams','paifun',function ($scope,$rootScope,$http,$routeParams,paifun) {
    $scope.deposit={

    };
    $scope.searchDepositfun = function () {//查询充值订单列表
        $scope.deposit.orderType="pigame";
        $scope.deposit.orderState="";
        $scope.deposit.startDate="2015-01-01";
        $scope.deposit.endDate="2019-01-01";
        $scope.deposit.isFinish="";
        $scope.deposit.pageIndex="";
        $scope.deposit.pageSize="";
        console.log($rootScope);
        var promise = paifun.queryDepositlist($scope.deposit);
        promise.then(function (data) {
            $scope.depositlist=data.list;
        });
    }
    $scope.searchDepositfun();


    $scope.searchDepositstatefun = function (depositstate) {//查询不同状态订单列表
        $scope.deposit.isFinish=depositstate;
        var promise = paifun.queryDepositlist($scope.deposit);
        promise.then(function (data) {
            $scope.depositlist=data.list;
        });
    }

    $rootScope.bossid=0;//bossid 初始化
    $scope.queryBalacefun=function () {//查询余额
        var promise=paifun.queryBalance();
        promise.then(function (data) {
            $rootScope.bossid=data.account.id;
            console.log($rootScope.bossid);
            $rootScope.user=data.user;
        });
    }
    $scope.queryBalacefun();


    // 查询boss详细信息
    $scope.queryBosssfun=function () {
        var promise=paifun.queryBossinfo($rootScope.bossid);
        promise.then(function (data) {
            $scope.bossdata=data;

        });
    }
    $scope.queryBosssfun();
}
]);



mojinController.controller('depositdetialCtrl',['$scope','$rootScope','$http','$routeParams','paifun','$location',function ($scope,$rootScope,$http,$routeParams,paifun,$location) {
    $rootScope.bossid=0;//bossid 初始化
    $scope.queryBalacefun=function () {//查询余额

        var promise=paifun.queryBalance();
        promise.then(function (data) {
            $rootScope.bossid=data.account.id;
            console.log($rootScope.bossid);
            $rootScope.user=data.user;
        });
    }
    $scope.queryBalacefun();


    // 查询boss详细信息
    $scope.queryBosssfun=function () {
        var promise=paifun.queryBossinfo($rootScope.bossid);
        console.log($rootScope.bossid);
        promise.then(function (data) {
            $scope.bossdata=data;

        });
    }
    $scope.queryBosssfun();

//查询充值订单详情
    $scope.depositDetialfun=function () {

        $scope.orderid=$routeParams.id;
        var promise=paifun.queryDepositDetial($scope.orderid);
        promise.then(function (data) {
            $scope.depositdetial=data;

            $rootScope.cashPay= data.cashPaymentOrder;
            $scope.steplist=data.stepList;
            for(var i=0;i<data.stepList.length;i++){
                if(data.stepList[i].finish==true){

                }else{
                    $(".step"+i).show();
                    break;
                }
            }


        });
    }
    $scope.depositDetialfun();

    $scope.deposit={};

    $scope.searchDepositstatefun = function (depositstate) {//查询不同状态订单列表
        $scope.deposit.isFinish=depositstate;
        $scope.deposit.pageSize=8;
        var promise = paifun.queryDepositlist($scope.deposit);
        promise.then(function (data) {
            $scope.depositlist=data.list;
        });
    }

    //提示下载
    $scope.downapp=function () {
        layer.alert('网页版暂不支持，请使用官方', {
            skin: 'layui-layer-molv' //样式类名
            ,closeBtn: 0,
            shadeClose: true //开启遮罩关闭
        }, function(){
            location.href="https://app.pi-group.biz/appdownload/argamedownload.html";
        });
    }

//取消订单
    $scope.cancelOrderfun=function () {
        $scope.orderid=$routeParams.id;
        var promise=paifun.cancelDepositorder($scope.orderid);
        promise.then(function (data) {
            $scope.depositDetialfun();
            $rootScope.locations();
            console.log(data);
        });
    }

    //确认收款成功
    $scope.confirm={};
    $scope.confirmOrdersavefun=function(){
        $scope.confirm.orderId=$routeParams.id;//获得订单id
        $scope.confirm.confirmState=3;
        $scope.confirm.extend="";

        var promise=paifun.confirmDepositorder($scope.confirm);
        promise.then(function (data) {
            $scope.depositDetialfun();
            $rootScope.locations();
            console.log(data);
        });
    }

    //拒绝接单
    $scope.confirm={};
    $scope.confirmOrderfailfun=function(){
        $scope.confirm.orderId=$routeParams.id;//获得订单id
        $scope.confirm.confirmState=4;
        $scope.confirm.extend="";
        var promise=paifun.confirmDepositorder($scope.confirm);
        promise.then(function (data) {
            $scope.depositDetialfun();
            $rootScope.locations();
            console.log(data);
        });
    }


    //确认接单
    $scope.confirm={};
    $scope.confirmOrdersuccessfun=function(){
        $scope.confirm.orderId=$routeParams.id;//获得订单id
        $scope.confirm.confirmState=1;
        $scope.confirm.extend="";
        var promise=paifun.confirmDepositorder($scope.confirm);
        promise.then(function (data) {
            $scope.depositDetialfun();
            $rootScope.locations();
            console.log(data);
        });
    }


    //选择老板
    $scope.chooseBossdepositfun=function () {
            $scope.orderid=$routeParams.id;
            $scope.bossid=$rootScope.bossid;
            var promise=paifun.chosseDepositboss($scope.orderid,$scope.bossid);
            promise.then(function (data) {
                $scope.depositDetialfun();
                console.log(data);
            });
    }


    //发送短信
    $scope.sendCodefun=function () {
        $scope.phoneNumber= $rootScope.user.mobile;
        var promise=paifun.sendCode($scope.phoneNumber);
        promise.then(function (data) {
            console.log("短信接收成功");
        });
    }


    //完成支付
    $scope.pay={};
    $scope.payOrderfun=function () {
        $scope.pay.id=$rootScope.cashPay.payId;
        var promise=paifun.payOrder($scope.pay);
        promise.then(function (data) {
            $scope.depositDetialfun();
            $rootScope.locations();
           layer.closeAll();
        });
    }

    //支付窗口
    $scope.showFrom=function () {
       layer.open({
            type: 1,
            skin: 'layui-layer-demo', //样式类名
            closeBtn: 0, //不显示关闭按钮
            anim: 2,
           area: ['480px', '200px'],
            shadeClose: true, //开启遮罩关闭
            content: $('#showid')
        });
        
    }

}
]);
mojinController.controller('drawCtrl',['$scope','$rootScope','$http','$routeParams','paifun',function ($scope,$rootScope,$http,$routeParams,paifun) {
    $scope.draw={};
    $scope.searchDrawfun = function () {
        $scope.draw.orderType="pigame";
        $scope.draw.startDate="";
        $scope.draw.endDate="";
        $scope.draw.isFinish="";
        $scope.draw.orderState="";
        $scope.draw.pageIndex="";
        $scope.draw.pageSize="";
        var promise = paifun.queryDrawlist($scope.draw);
        promise.then(function (data) {
            $scope.drawlist=data.list;

        });
    }
    $scope.searchDrawfun();

    //查询提现订单列表
    $scope.searchDrawstatefun = function (orderstate) {
        $scope.draw.isFinish=orderstate;
        var promise = paifun.queryDrawlist($scope.draw);
        promise.then(function (data) {
            $scope.drawlist=data.list;

        });
    }





    $rootScope.bossid=0;//bossid 初始化
    $scope.queryBalacefun=function () {//查询余额
        var promise=paifun.queryBalance();
        promise.then(function (data) {
            $rootScope.bossid=data.account.id;
            $rootScope.user=data.user;
        });
    }
    $scope.queryBalacefun();


    // 查询boss详细信息
    $scope.queryBosssfun=function () {
        var promise=paifun.queryBossinfo($rootScope.bossid);
        console.log($rootScope.bossid);
        promise.then(function (data) {
            $scope.bossdata=data;

        });
    }
    $scope.queryBosssfun();
}
]);
mojinController.controller('drawdetialCtrl',['$scope','$rootScope','$http','$routeParams','paifun','$location',function ($scope,$rootScope,$http,$routeParams,paifun,$location) {

    $rootScope.bossid=0;//bossid 初始化
    $scope.queryBalacefun=function () {//查询余额
        var promise=paifun.queryBalance();
        promise.then(function (data) {
            $rootScope.bossid=data.account.id;
            $rootScope.user=data.user;
        });
    }
    $scope.queryBalacefun();


    // 查询boss详细信息
    $scope.queryBosssfun=function () {
        var promise=paifun.queryBossinfo($rootScope.bossid);
        console.log($rootScope.bossid);
        promise.then(function (data) {
            $scope.bossdata=data;
        });
    }
    $scope.queryBosssfun();


    $scope.searchDrawfundetial = function () {//查询提现订单详情
        $scope.drawid=$routeParams.id;
        var promise = paifun.queryDrawdetial($scope.drawid);
        promise.then(function (data) {
            $scope.drawdetial=data;
            $scope.steplist=data.stepList;
            $rootScope.cashPaymentOrder= data.cashPaymentOrder;
            for(var i=0;i<5;i++){
                if(data.stepList[i].finish==true){

                }else{
                    $(".step"+i).show();
                    break;
                }
            }
        });
    }
    $scope.searchDrawfundetial();

    $scope.drawstates={};
    $scope.searchDrawstatefun = function (drawstate) {//查询不同状态提现订单列表

        $scope.draw.isFinish=drawstate;
        var promise = paifun.queryDrawlist($scope.drawstates);
        promise.then(function (data) {
            $scope.searchDrawfundetial();
            $scope.drawlist=data.list;

        });
    }




    $scope.downapp=function () {
        layer.alert('网页版暂不支持，请下载官方APP', {
            skin: 'layui-layer-molv' //样式类名
            ,closeBtn: 0
        }, function(){
            location.href="https://app.pi-group.biz/appdownload/argamedownload.html";
        });
    }


    //取消功能
    $scope.cancelOrderdraw=function () {
        $scope.orderid=$routeParams.id;
        var promise=paifun.cancelDraworder($scope.orderid);
        promise.then(function (data) {
            $rootScope.locations();
            // layer.open();
        });
    }

    //确认打款
    $scope.confirm={};
    $scope.confirmOrderdraw=function () {
        $scope.confirm.orderId=$routeParams.id;
        $scope.confirm.confirmState=2;
        $scope.confirm.extend="";
        var promise=paifun.confirmDraworder($scope.confirm);
        promise.then(function (data) {
            $scope.searchDrawfundetial();
            $rootScope.locations();
            console.log("打款成功");
        });
    }

    //确认接单
    $scope.confirm={};
    $scope.confirmsaveOrderdraw=function () {
        $scope.confirm.orderId=$routeParams.id;
        $scope.confirm.confirmState=1;
        $scope.confirm.extend="";
        var promise=paifun.confirmDraworder($scope.confirm);
        promise.then(function (data) {
            $scope.searchDrawfundetial();
            $rootScope.locations();
            console.log("确认接单成功");
        });
    }

    //拒绝接单
    $scope.confirm={};
    $scope.confirmfailOrderdraw=function () {
        $scope.confirm.orderId=$routeParams.id;
        $scope.confirm.confirmState=4;
        $scope.confirm.extend="";
        var promise=paifun.confirmDraworder($scope.confirm);
        promise.then(function (data) {
            $scope.searchDrawfundetial();
            // $rootScope.locations();
            console.log("拒单成功");
        });
    }



    //选老板
    $scope.chooseBossdrawfun=function () {

        $scope.orderid=$routeParams.id;
        $scope.bossId=$rootScope.bossid;
        var promise=paifun.chosseDrawboss( $scope.orderid,$scope.bossId);
        promise.then(function (data) {
            console.log("选择老板成功");
        });
    }



    //发送短信
    $scope.sendCodefun=function () {

        var promise=paifun.sendCode($scope.phoneNumber);
        promise.then(function (data) {
            console.log("短信接收成功");
        });
    }


    //完成支付，不需要验证码
    $scope.pay={};
    $scope.payOrderfun=function () {
        $scope.pay.mobileCode=123456;
        $scope.pay.id= $rootScope.cashPaymentOrder.payId;
        var promise=paifun.payOrder($scope.pay);
        promise.then(function (data) {
            console.log("支付成功");
            layer.closeAll();
        });
    }

    $scope.payOrdercodefun=function () {
        var promise=paifun.payOrder($scope.pay);
        promise.then(function (data) {
            $rootScope.locations();
            console.log("支付成功");
        });
    }


    //支付窗口
    $scope.showFrom=function () {
        layer.open({
            type: 1,
            skin: 'layui-layer-demo', //样式类名
            closeBtn: 0, //不显示关闭按钮
            anim: 2,
            area: ['480px', '200px'],
            shadeClose: true, //开启遮罩关闭
            content: $('#showid')
        });

    }

    //提示下载
    $scope.downapp=function () {
        layer.alert('网页版暂不支持，请使用官方', {
            skin: 'layui-layer-molv' //样式类名
            ,closeBtn: 0,
            shadeClose: true //开启遮罩关闭
        }, function(){
            location.href="https://app.pi-group.biz/appdownload/argamedownload.html";
        });
    }

}
]);

mojinController.controller('updateCtrl',['$scope','$rootScope','$http','$routeParams','paifun',function ($scope,$rootScope,$http,$routeParams,paifun) {

    $rootScope.bossid=0;//bossid 初始化
    $scope.queryBalacefun=function () {//查询余额
        var promise=paifun.queryBalance();
        promise.then(function (data) {
            $rootScope.bossid=data.account.id;
            console.log($rootScope.bossid);
            $rootScope.user=data.user;
        });
    }
    $scope.queryBalacefun();

    $scope.bossinfo={};//定义老板对象
    // 查询boss详细信息
    $scope.queryBosssfun=function () {
        var promise=paifun.queryBossinfo($rootScope.bossid);
        console.log($rootScope.bossid);
        promise.then(function (data) {
            $scope.bossdata=data;
            $scope.wechat=JSON.parse(data.contactWay).wechat;
            var json = JSON.parse(data.contactWay);
            for(key in json){
                console.log(key+"\t"+json[key]);
                $scope.bossinfo.type=key;
                $scope.bossinfo.facebook=json[key];

            }
            $scope.bossinfo.depositRate=data.depositRate;
            $scope.bossinfo.drawRate=data.drawRate;

            $scope.bossinfo.phoneNumber=data.phoneNumber;
            $scope.bossinfo.phoneCode=data.phoneCode;
            $scope.bossinfo.currency=data.supportCurrency;
            $scope.bossinfo.supportAccount=data.supportAccount;

            var account=(data.supportAccount);
            var accountarray=(account.split(","));
            for (keys in accountarray){
                $scope.keys=keys;
                $scope.accountlist=accountarray[keys];
                console.log(accountarray[keys]);
                $("#cardnum").append("<em >"+accountarray[keys]+"</em>");

            }

            var bisupportCurrency=data.supportCurrency;
            var currenarray=bisupportCurrency.split(",");
            for(bikeys in currenarray){
                $scope.keys=bikeys;
                $scope.accountlist=currenarray[bikeys];
                console.log(accountarray[bikeys]);
                $("#cardbi").append("<em >"+currenarray[bikeys]+"</em>");
            }


        });
    }
    $scope.queryBosssfun();


    $scope.updateBossinfofun=function () {//修改boss信息
        console.log($scope.depositstate);
        console.log($scope.drawstate);
        if($scope.depositstate==true){
            $scope.bossinfo.supportDeposit=1;
        }else{
            $scope.bossinfo.supportDeposit=0;
        }
        if($scope.depositstate==true){
            $scope.bossinfo.supportDraw=1;
        }
        else{
            $scope.bossinfo.supportDraw=0;
        }


        var promise=paifun.updateBossinfo($scope.bossinfo);


        promise.then(function (data) {
            // console.log(data.status);
            if(data.status==1){
                layer.alert('修改成功', {
                    skin: 'layui-layer-molv' //样式类名
                    ,closeBtn: 0,
                    shadeClose: true //开启遮罩关闭
                }, function(){
                    location.href="index.html#/depositlist";
                    layer.closeAll();
                });

            }
        });
    }


}
]);










