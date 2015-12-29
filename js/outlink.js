var $user = $("#user");
//给跳跃按钮绑定单击事件
var $btnJump = $("#btnJump");

var status=/Left$/.test($user[0].className) ?"animated slideOutUpLeft":"animated slideOutUpRight";
var fnJ=function () {
    if($user[0].flag)return;
    window.setTimeout(function () {
        $user.removeClass(status)[0].flag=false;
        _$this.removeClass(" boxShadow");
    },1000);
    //给user对象增加一个flag用来判断当前是否在跳跃执行，如果正在执行，则不可以重复执行，避免了动画的积累问题。
    $user.addClass(status)[0].flag=true;
    $(this).addClass(" boxShadow");
    var _$this=$(this);

};
    $btnJump.singleTap(fnJ);

//给left按钮绑定向左的长按事件。
var $btnLeft=$("#btnLeft");
$user[0].posi=1.6;


var fnL=function () {

    if($user[0].flag)return;
    window.setTimeout(function () {
        $user.removeClass(status)[0].flag=false;
        _$this.removeClass(" boxShadow");
    },1000);
    //给user对象增加一个flag用来判断当前是否在跳跃执行，如果正在执行，则不可以重复执行，避免了动画的积累问题。
    $user.addClass(status)[0].flag=true;
    $(this).addClass(" boxShadow");
    var _$this=$(this);
};
$btnLeft.longTap(fnL);







