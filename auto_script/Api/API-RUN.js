var result = {
	"staticData": "",
	"hotelSearch": "",
	"hotelDetail": "",
	"productCheck": "",
	"hotHotel": "",
	"orderList": "",
	"orderDetail": "",
	"createOrder": ""
}

var signature;//校验码

/** page */
container = [
	md5CodePage,
	staticDataPageA,
	staticDataPageB,
	hotelSearchPageA,
	hotelSearchPageB,
	hotelDetailPageA,
	hotelDetailPageB,
	productCheckPageA,
	productCheckPageB,
	hotHotelPageA,
	hotHotelPageB,
	orderListPageA,
	orderListPageB,
	orderDetailPageA,
	orderDetailPageB,
/*	createOrderPageA,
	createOrderPageB,*/
	printResult
]

//获取Md5校验码
function md5CodePage() {
	var $ifrm = $("#_ifrm").contents();
	$target = $ifrm.find("h2");
	if ($target.html() == "Md5校验码生成") {
		setAllVal($ifrm,md5CodeVal);
		$ifrm.find("#submitButton").click();
		setTimeout(function(){
			signature = $ifrm.find("#responseJson").val();
			$ifrm.find("a[href='getStaticDataPage']")[0].click();
		},500);
		return true;
	} else {
		return false;
	}
}

//静态数据页
function staticDataPageA() {
	var $ifrm = $("#_ifrm").contents();
	$target = $ifrm.find("h2");
	if ($target.html() == "静态数据测试") {
		setAllVal($ifrm,staticDataVal);
		$ifrm.find("input[name='signature']").val(signature);
		$ifrm.find("#createJsonButton").click();
		setTimeout(function(){
			$ifrm.find("#submitButton").click();
		},1000);
		return true;
	} else {
		return false;
	}
}

function staticDataPageB() {
	var $ifrm = $("#_ifrm").contents();
	if ($ifrm.find("#responseJson").val() != "") {
		result["staticData"] = $ifrm.find("#responseJson").val();
		$ifrm.find("a[href='hotelSearchPage']")[0].click();
		return true;
	} else {
		return false;
	}
}

//酒店搜索页
function hotelSearchPageA() {
	var $ifrm = $("#_ifrm").contents();
	$target = $ifrm.find("h2");
	if ($target.html() == "酒店搜索测试") {
		setAllVal($ifrm,hotelSearchVal);
		$ifrm.find("input[name='signature']").val(signature);
		$ifrm.find("#createJsonButton").click();
		setTimeout(function(){
			$ifrm.find("#submitButton").click();
		},1000);
		return true;
	} else {
		return false;
	}
}

function hotelSearchPageB() {
	var $ifrm = $("#_ifrm").contents();
	if ($ifrm.find("#responseJson").val() != "") {
		result["hotelSearch"] = $ifrm.find("#responseJson").val();
		$ifrm.find("a[href='hotelDetailPage']")[0].click();
		return true;
	} else {
		return false;
	}
}

//酒店详情页
function hotelDetailPageA() {
	var $ifrm = $("#_ifrm").contents();
	$target = $ifrm.find("h2");
	if ($target.html() == "酒店详情测试") {
		setAllVal($ifrm,hotelDetailVal);
		$ifrm.find("input[name='signature']").val(signature);
		$ifrm.find("#createJsonButton").click();
		setTimeout(function(){
			$ifrm.find("#submitButton").click();
		},1000);
		return true;
	} else {
		return false;
	}
}

function hotelDetailPageB() {
	var $ifrm = $("#_ifrm").contents();
	if ($ifrm.find("#responseJson").val() != "") {
		result["hotelDetail"] = $ifrm.find("#responseJson").val();
		$ifrm.find("a[href='productCheckPage']")[0].click();
		return true;
	} else {
		return false;
	}
}

//产品校验页
function productCheckPageA() {
	var $ifrm = $("#_ifrm").contents();
	$target = $ifrm.find("h2");
	if ($target.html() == "产品校验测试") {
		setAllVal($ifrm,productCheckVal);
		$ifrm.find("input[name='signature']").val(signature);
		$ifrm.find("#createJsonButton").click();
		setTimeout(function(){
			$ifrm.find("#submitButton").click();
		},1000);
		return true;
	} else {
		return false;
	}
}

function productCheckPageB() {
	var $ifrm = $("#_ifrm").contents();
	if ($ifrm.find("#responseJson").val() != "") {
		result["productCheck"] = $ifrm.find("#responseJson").val();
		$ifrm.find("a[href='hotHotelPage']")[0].click();
		return true;
	} else {
		return false;
	}
}

//热门酒店页
function hotHotelPageA() {
	var $ifrm = $("#_ifrm").contents();
	$target = $ifrm.find("h2");
	if ($target.html() == "热门酒店测试") {
		setAllVal($ifrm,hotHotelVal);
		$ifrm.find("input[name='signature']").val(signature);
		$ifrm.find("#createJsonButton").click();
		setTimeout(function(){
			$ifrm.find("#submitButton").click();
		},1000);
		return true;
	} else {
		return false;
	}
}

function hotHotelPageB() {
	var $ifrm = $("#_ifrm").contents();
	if ($ifrm.find("#responseJson").val() != "") {
		result["hotHotel"] = $ifrm.find("#responseJson").val();
		$ifrm.find("a[href='orderListPage']")[0].click();
		return true;
	} else {
		return false;
	}
}

//订单列表页
function orderListPageA() {
	var $ifrm = $("#_ifrm").contents();
	$target = $ifrm.find("h2");
	if ($target.html() == "订单列表测试") {
		setAllVal($ifrm,orderListVal);
		$ifrm.find("input[name='signature']").val(signature);
		$ifrm.find("#createJsonButton").click();
		setTimeout(function(){
			$ifrm.find("#submitButton").click();
		},1000);
		return true;
	} else {
		return false;
	}
}

function orderListPageB() {
	var $ifrm = $("#_ifrm").contents();
	if ($ifrm.find("#responseJson").val() != "") {
		result["orderList"] = $ifrm.find("#responseJson").val();
		$ifrm.find("a[href='orderDetailPage']")[0].click();
		return true;
	} else {
		return false;
	}
}

//订单详情页
function orderDetailPageA() {
	var $ifrm = $("#_ifrm").contents();
	$target = $ifrm.find("h2");
	if ($target.html() == "订单详情测试") {
		setAllVal($ifrm,orderDetailVal);
		$ifrm.find("input[name='signature']").val(signature);
		$ifrm.find("#createJsonButton").click();
		setTimeout(function(){
			$ifrm.find("#submitButton").click();
		},1000);
		return true;
	} else {
		return false;
	}
}

function orderDetailPageB() {
	var $ifrm = $("#_ifrm").contents();
	if ($ifrm.find("#responseJson").val() != "") {
		result["orderDetail"] = $ifrm.find("#responseJson").val();
		$ifrm.find("a[href='createOrderPage']")[0].click();
		return true;
	} else {
		return false;
	}
}

//创建订单页
function createOrderPageA() {
	var $ifrm = $("#_ifrm").contents();
	$target = $ifrm.find("h2");
	if ($target.html() == "创建订单测试") {
		setAllVal($ifrm,createOrderVal);
		$ifrm.find("input[name='signature']").val(signature);
		$ifrm.find("#createJsonButton").click();
		setTimeout(function(){
			$ifrm.find("#submitButton").click();
		},1000);
		return true;
	} else {
		return false;
	}
}

function createOrderPageB() {
	var $ifrm = $("#_ifrm").contents();
	if ($ifrm.find("#responseJson").val() != "") {
		result["createOrder"] = $ifrm.find("#responseJson").val();
		return true;
	} else {
		return false;
	}
}

run(container);
/*Page方法示例
function demoPage() {
	var $ifrm = $("#_ifrm").contents();
	$target = $ifrm.find("xxx");
	//$target = $ifrm.find("xxx")[0]; //当为a标签时使用
	if (typeof($target) != "undefined") {
		//...
		$target.click();
		return true;
	} else {
		return false;
	}
}*/

//打印结果
function printResult() {
	var $ifrm = $("#_ifrm").contents();
	$ifrm.find("body").html("");
	$ifrm.find("body").css("text-align","center");
	for (var key in result) {
		$ifrm.find("body").append('<div style="margin: 10px 10px 5px 60px; text-align: left; font-weight: bolder;">'+key+'接口：</div>');
		$ifrm.find("body").append('<textarea style="margin: 5px 10px 10px 10px; width: 90%; height: 200px;">'+result[key]+'</textarea>');
	}
	$ifrm.find("body").append('<div style="margin: 10px 10px 5px 60px; text-align: left; ">校验码：'+ signature +'</div>');
	return true;
}

