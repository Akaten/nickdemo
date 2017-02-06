/**
 * Created by nick on 2017/1/7.
 */
var exprss=require('express');
var router=exprss.Router();

router.get('/', function(req, res, next) {
    res.render('register');
});

module.exports = router;


