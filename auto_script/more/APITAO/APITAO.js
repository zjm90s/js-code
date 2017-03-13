javascript: (function() {
if (! ($ = window.jQuery)) {
script = document.createElement('script');
script.src = 'http://ajax.microsoft.com/ajax/jquery/jquery-1.11.1.min.js';
script.onload = start;
document.body.appendChild(script);
} else {
start();
}

/** data */
function Comment(){
	var user;
	var level;
	var content;
	var txtLength;
	var time;
}

/** fun */
container = [
	removeAD,
	pageA,
	pageB,
	pageC,
	printResult
];

function start() {
	wTime = 500;
	commentsA = new Array();
	commentsB = new Array();
	commentsC = new Array();
	map = {
		"好评":commentsA,
		"中评":commentsB,
		"差评":commentsC
	};
	lvMap = {
		"red":"红心",
		"blue":"钻石"
	};
	$(".J_ReviewsCount").click();
	setTimeout(function(){
		$("#reviews-t-2").click()
	},wTime);
	setTimeout(function(){
		run(container)
	},wTime);
}

function removeAD() {
	$(".tb-switch-bar span").click();
	$(".tb-switch-bar span").remove();
	$(".correlative-items").remove();
	return true;
}

function pageA() {
	return runPage(commentsA,"#reviews-t-3");
}
function pageB() {
	return runPage(commentsB,"#reviews-t-4");
}
function pageC() {
	return runPage(commentsC);
}

function runPage(comments,nextId) {
	$(".tb-r-review").each(function(){
		$this = $(this);
		var comment = new Comment();
		comment.user = $this.find(".tb-r-unick").text().trim();
		comment.content = $this.find(".tb-r-cnt").text().trim();
		comment.txtLength = comment.content.length;
		comment.time = $this.find(".tb-r-date").text().trim();
		var img = $this.find(".tb-r-avatar img");
		if (img != null  && img.length == 2) {
			var levelSrc = img[1].src;
			comment.level = parseLevel(levelSrc);
		} else {
			comment.level = "[无星级]";
		}
		comments[comments.length] = comment;
	});

	if ($(".page-next").length == 1) {
		$(".page-next")[0].click();
		setTimeout(null,wTime);
		return false;
	} else {
		$(nextId).click();
		setTimeout(null,wTime);
		return true;
	}
}

function parseLevel(src) {
	var patrn = /b_[a-z]*_\d/;
	var lv = patrn.exec(src);
	if (lv != null) {
		var lvs = lv[0].split("_");
		return lvMap[lvs[1]]+lvs[2]+"级";
	} else {
		return "[无星级]";
	}
}

function printResult() {
	$this = $(".tb-revbd");
	$this.html("");
	$this.append('<div style="margin: 10px 0px 0px 40px; text-align: left;"><b>用户名</b> # <b>等级</b> # <b>评论时间</b> # <b>评论字数</b></div>');
	var count = 0;
	for (var key in map) {
		$this.append('<div style="margin: 25px 0px 0px 40px; text-align: left; font-weight: bolder;">'+ key +'：</div>');
		for (var i = 0; i < map[key].length; i++) {
			$this.append('<div style="margin: 15px 0px 0px 60px; text-align: left; "><b>'
				+map[key][i].user+'</b> # <b>'+map[key][i].level+'</b> # <b>'+map[key][i].time+'</b> # <b>'+map[key][i].txtLength+'</b></div>');
			$this.append('<div style="margin: 10px 0px 0px 80px; text-align: left;"><b>评论：</b>'+map[key][i].content+'</div>');
		}
		$this.append('<div style="margin: 15px 10px 30px 40px; text-align: left; font-weight: bolder;">'+ key +'总数：'+ map[key].length +'</div>');
		count = count + map[key].length;
	}
	$this.append('<div style="margin: 20px 0px 0px 40px; text-align: left; font-weight: bolder;">评论总数：'+ count +'</div>');
	$this.append('<div style="margin: 10px 0px 0px 40px; text-align: left; font-weight: bolder;">好评率：'+ (map["好评"].length/count).toFixed(2) +'</div>');
	return true;
}


/** core */
function run(container){
pIndex = 0;
pSize = container.length;
process(container);
}

function process(container){
if(pIndex < pSize){
if(pIndex == 0){
processExe(container[pIndex++]);
}else{
setTimeout(function(){processExe(container[pIndex++])},wTime);
}
}
}

function processExe(func){
if(!func()){
setTimeout(function(){processExe(func)},wTime);
}else{
process(container);
}
}
} ("/**@author jianming.zhou*/"))