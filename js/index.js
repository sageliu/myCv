var user = document.getElementById('user');
var btnLeft = document.getElementById("btnLeft");
var btnRight = document.getElementById("btnRight");
var btnJump = document.getElementById("btnJump");
var footer = document.getElementById("footer");

var obj = {index: 0.1, rem: 6.4, step: 0.35};
//因为引用数据类型和基本数据类型的区别，所以将尤其index放在对象里。

/*

 实现移动与跳跃的思路：
 1.1如果点击的是btnLeft，（则每点击一下，这样实现起来比较简单）会向右移动0.2rem/s，反之向左移动0.2rem/s，这个可以用累加的方式实现，只要按住的时候，就一直累加，移动的位移等于一直在+=step，这个可以用getTime来实现，只要getTime>1000,就触发一次位移改变，实现无间断的动画效果，
 1.2松开按钮的时候，不移动，mouseup事件时候。

 2.1点击的是btnJump，每点击一下，user跳起0.35rem，也就是bottom=0.35rem，并落回到地面，也就算bottom=0，此动作花费的时间为1.5秒，
 2.2此期间的btnJump按钮不可以点击，也就是失去了点击事件，这个可以利用定时器，实现1.6秒之后绑定上这个可以点击的事件。

 实现顶东西的效果的思路
 3.1将所有的砖块放置到一个数组中，触发了btnJump的事件的时候，如果人物的(left+width)/2大于砖块的left，并且小于砖块的left+width，则视为顶到了，
 3.2此时需要判断人物的状态，如果是大号的，就可以顶brick1，并且brick1的样式发生改变，图片就变成顶碎了，然后0.5秒之后变成没有了，如果是小号的人物，则顶brick1的时候，人物的上边距应该最大等于brick2的下边距+0.02rem，brick1的bottom+0.02rem，0.2秒之后，都落回去到原始的位置。人物继续执行btnJump的事件【这里权衡一下实现】
 3.3如果是brick2，则都不能顶，人物的上边距应该最大等于brick2的下边距
 3.4如果是brick3，则从里面出现一个金币或者蘑菇，出现的方式是1.5秒从brick3的位置向上慢慢出来，金币会消失，蘑菇会向右移动0.1rem/s，直到蘑菇的right>=遇到的第一个hose（其实这里是指定的）的left，会向左移动，如果移动到的left=0时，则remove这个蘑菇，如果中间人物的bottom=蘑菇的bottom，mRight>uLeft>mLeft||mRight>uRight>mLeft,那么蘑菇remove，人变大。
 */
var bg = document.getElementsByClassName("main")[0];
bg.style.left = 0;
footer.style.left = 0;
//这个数字要根据实际的css第几个进行修改，比较麻烦。
var oMove = document.styleSheets[1].cssRules[71];
function move(e) {
    e.preventDefault();
    var _this = this;
    if (e.target === btnLeft) {
        e.target.style.boxShadow = " 5px 5px 8px 0 #16D5B5";
        this.timer21 = window.setInterval(function () {
            obj.index += 0.1;
            if (/ userRight/.test(user.className)) {
                user.className = "user userLeft";
            }
            bg.style.left = obj.index * obj.step + "rem";
            bg.style.webkit = "(transitionDuration: 1s)";
            footer.style.left = obj.index * obj.step + "rem";
        }, 1000);
    }
    else if (e.target === btnRight) {
        if (/ userLeft/.test(user.className)) {
            user.className = "user userRight";
        }
        e.target.style.boxShadow = " 5px 5px 8px 0 #16D5B5";
        if (/moveRight$/.test(bg.className))return;
        bg.className += " moveRight";
        if (/moveRight$/.test(footer.className))return;
        footer.className += " moveRight";

        //this.timer22 = window.setInterval(function () {
        oMove[0].style.left = -1 * obj.index * obj.step + "rem";
        obj.index += 0.1;
        this.posi = oMove[1].style.left = -1 * obj.index * obj.step + "rem";
        obj.index += 0.1;
        //}, 1000);

//设置跳跃的时候更换为jump的样式。
    } else if (e.target === btnJump) {
        _this.curUser = user.className;

        e.target.style.boxShadow = " 5px 5px 8px 0 #16D5B5";
        if (/ jump/.test(_this.curUser))_this.curUser = user.className.replace(/ jump \w+/, "");
        if (/ userLeft$/.test(_this.curUser)) user.className += " jump jumpLeft";
        if (/ userRight$/.test(_this.curUser)) user.className += " jump jumpRight";


        //user.className += " jumpRight jump";
        setTimeout(function () {
            console.log(_this.curUser);
            user.className = _this.curUser;
        }, 1000);
        if (/ jump/.test(user.className))return;
    }
    //清除浏览器长按的样式。

}
function end(e) {
    if (e.target === btnLeft || e.target === btnRight || e.target === btnJump)
        e.target.style.boxShadow = "";
    bg.className = "main";
    footer.className = "footer";
    window.clearInterval(this.timer21);
    this.timer21 = null;
    //window.clearInterval(this.timer22);
    //this.timer22 = null;
    bg.style.left = this.posi;
    footer.style.left = this.posi;
    console.log(bg.style.left);


}

document.addEventListener('touchstart', move, false);

document.addEventListener('touchend', end, false);




