/*Js*/
if(typeof soo == "undefined"){
    var soo = {};
}
soo.language = $.trim($.cookie("soo_lang"))?$.cookie("soo_lang"):'en';


function languageCtl($scope,$http,$translate){

    
}

/**
 * set language
 */
function setLanguage(){
    $.cookie("soo_lang",soo.language,{ path: "/"});
}
if(!''.trim){
    String.prototype.trim=function(){
        return this.replace(/^\s|\s$/g,'');
    }
}
$(function(){
    $(".wrapper").addClass(soo.language);
});