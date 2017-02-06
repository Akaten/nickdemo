

// var index=angular.module('comCtrl',[]);


function  comCtrl($scope,$http,$q) {

   $scope.loginfrist= function(uname,upwd) {//登录
        var param = {uname:uname,upwd:upwd};
        var url = "http://wallet.pigamegroup.com/user/userlogin";
        var config = {
            url: url, withCredentials: true,
            data: $.param(param),
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        };
        var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
        $http(config).success(function (data, status, headers, config) {
            if (data.status && data.status == "success") {
                deferred.resolve(data.data);
            } else {
                deferred.reject(data.data);
                console.log('==error code', data.resultCode)
            }
            alert(123);
        });

    }
}
