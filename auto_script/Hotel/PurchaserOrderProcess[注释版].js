/** data */
var loginVal = { //以Map方式封装页面所需填的数据，最好是每个页面定义一个，如果无数据需要填写可以不用定义
	"username": "zjmyc",
	"password": "A111111"
};
var createOrderVal = {
	"guestName": "zjm"
}
var payVal = {
	"payPasswd": "111111"
}

/** page */
var container = [ //封装业务流程中的所有方法页面，在下面定义，每个页面定义一个
	loginPage,
	toHotelLabel,
	homePage,
	searchPage,
	createOrderPage,
	payPage]

function loginPage() { //登陆
	var $ifrm = $("#_ifrm").contents(); //获取iframe中的html内容
	$target = $ifrm.find("#sbmSignin"); //找到本页需点击触发的按钮
	if (typeof($target) != "undefined") { //如果找到了
		setAllVal($ifrm,loginVal); //填写表单（登陆账号和密码）
		$target.click(); //触发“登陆”按钮
		return true;
	} else {
		return false;
	}
}

function toHotelLabel() { //进入酒店主页
	var $ifrm = $("#_ifrm").contents();
	var $target = $ifrm.find(".main-nav ul li a")[3];
	if ($target.href.contains("/tops-front-purchaser-hotel//hotel/booking/search")) {
		$target.click();
		return true;
	} else {
		return false;
	}
}

function homePage() { //酒店主页
	var $ifrm = $("#_ifrm").contents();
	var $target = $ifrm.find("#btn_search_first");
	if (typeof($target) != "undefined") {
		$target.click();
		return true;
	} else {
		return false;
	}
}

function searchPage() { //酒店搜索页
	var $ifrm = $("#_ifrm").contents();
	var $target = $ifrm.find(".roomTypeDetailContainer a.mediumOrange_btn")[1]; //此页结果会有很多，此处随意选择预订第二个
	if (typeof($target) != "undefined") {
		$target.click();
		return true;
	} else {
		return false;
	}
}

function createOrderPage() { //建单页
	var $ifrm = $("#_ifrm").contents();
	var $target = $ifrm.find("#l_btn")[0]; //需要说明的是，对于“a”标签（可以看页面，有的按钮是input，有的是a）即使用id获取的也需要在后面加上[0]（即第一个，其实也只有一个），否则无法触发click事件
	if (typeof($target) != "undefined") {
		setAllVal($ifrm,createOrderVal);
		$target.click();
		return true;
	} else {
		return false;
	}
}

function payPage() { //支付页
	var $ifrm = $("#_ifrm").contents();
	var $target = $ifrm.find(".adaptiveButton.ac-payAffirm")[0]; //此处也是a标签
	if (typeof($target) != "undefined") {
		setAllVal($ifrm,payVal);
		$target.click();
		return true;
	} else {
		return false;
	}
}

start(container);
/**Page方法示例*/
/*function demoPage() {
    var $ifrm = $("#_ifrm").contents();
    $target = $ifrm.find("xxx");
    //$target = $ifrm.find("xxx")[0]; //当为a标签时使用
    if (typeof($target) != "undefined") {
        //setAllVal($ifrm,xxxVal); //当有表单需要填时
        $target.click();
        return true;
    } else {
        return false;
    }
}*/
