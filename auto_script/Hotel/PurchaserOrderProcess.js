/** data */
var loginVal = {
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
container = [
    loginPage, toHotelLabel, homePage, searchPage, createOrderPage, payPage
]

function loginPage() {
    var $ifrm = $("#_ifrm").contents();
    $target = $ifrm.find("#sbmSignin");
    if (typeof($target) != "undefined") {
        setAllVal($ifrm, loginVal);
        $target.click();
        return true;
    } else {
        return false;
    }
}

function toHotelLabel() {
    var $ifrm = $("#_ifrm").contents();
    var $target = $ifrm.find(".main-nav ul li a")[3];
    if ($target.href.contains("/tops-front-purchaser-hotel//hotel/booking/search")) {
        $target.click();
        return true;
    } else {
        return false;
    }
}

function homePage() {
    var $ifrm = $("#_ifrm").contents();
    var $target = $ifrm.find("#btn_search_first");
    if (typeof($target) != "undefined") {
        $target.click();
        return true;
    } else {
        return false;
    }
}

function searchPage() {
    var $ifrm = $("#_ifrm").contents();
    var $target = $ifrm.find(".roomTypeDetailContainer a.mediumOrange_btn")[1];
    if (typeof($target) != "undefined") {
        $target.click();
        return true;
    } else {
        return false;
    }
}

function createOrderPage() {
    var $ifrm = $("#_ifrm").contents();
    var $target = $ifrm.find("#l_btn")[0];
    if (typeof($target) != "undefined") {
        setAllVal($ifrm, createOrderVal);
        $target.click();
        return true;
    } else {
        return false;
    }
}

function payPage() {
    var $ifrm = $("#_ifrm").contents();
    var $target = $ifrm.find(".adaptiveButton.ac-payAffirm")[0];
    if (typeof($target) != "undefined") {
        setAllVal($ifrm, payVal);
        $target.click();
        return true;
    } else {
        return false;
    }
}

run(container);

/**Page方法示例*/
/*function demoPage() {
    var $ifrm = $("#_ifrm").contents();
    $target = $ifrm.find("xxx");
    //$target = $ifrm.find("xxx")[0]; //当为a标签时使用
    if (typeof($target) != "undefined") {
        //setAllVal($ifrm,xxxVal);
        $target.click();
        return true;
    } else {
        return false;
    }
}*/
