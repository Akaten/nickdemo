var qhWeb = angular.module('qhWeb',['ngRoute','pascalprecht.translate']);
//
qhWeb.config(function ($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: './i18n/locale_',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage(soo.language);
});

qhWeb.config(['$routeProvider',function ($routeProvider) {
    $routeProvider
        .when('/index',{
            templateUrl:'html/index.html',
            controller:''
        })
        .when('/depositlist',{//充值订单列表
            templateUrl:'html/depositlist.html',
            controller:''
             })
        .otherwise({
        redirectTo: '/index'
    });
}]);

qhWeb.controller('langCtrl',function ($scope,$sce,$http,$translate) {
    $scope.soo=soo;
    soo.old_language=soo.language;
    $scope.changeLanguage = function(key) {

        soo.language = key;
        soo.old_language=key;
        //change language
        $translate.use(key);

        setLanguage();

        $scope.setLanguageSelected();
    };
    $scope.changeLanguagenew = function(key) {
        //
        soo.language = key;
        soo.old_language=key;
        //change language
        $translate.use(key);

        setLanguage();
        location.reload(true);
        $scope.setLanguageSelected();
    };
    $scope.setLanguageSelected = function() {
        if(soo.language=='en'){
            $scope.isSelected_en=true;
            $scope.isSelected_he=false;
        }
        else if(soo.language=='he'){
            $scope.isSelected_en=false;
            $scope.isSelected_he=true;
        }
    }
    $scope.setLanguageSelected();
    }
);