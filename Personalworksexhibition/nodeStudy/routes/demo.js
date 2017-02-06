/**
 * Created by nick on 2017/1/7.
 */
var exprss=require('express');
var router=exprss.Router();


router.get('/', function(req, res, next) {
    res.render('demo',function () {
            console.log(123);
    });
});

module.exports = router;