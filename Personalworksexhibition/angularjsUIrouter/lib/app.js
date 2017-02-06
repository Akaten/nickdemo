var myApp = angular.module("myApp", ['ui.router']);

myApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when("", "/PageTab");

    $stateProvider
        .state("PageTab", {
            url: "/PageTab",
            templateUrl: "./module/module.html"
        })
        .state("PageTab.Page1", {
            url:"/Page1",
            templateUrl: "./module/mainA.html"
        })
        .state("PageTab.Page2", {
            url:"/Page2",
            templateUrl: "./module/mainB.html"
        })
        .state("PageTab.Page3", {
            url:"/Page3",
            templateUrl: "./module/mainC.html"
        });
});