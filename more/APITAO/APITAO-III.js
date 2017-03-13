javascript: (function() {
if (! ($ = window.jQuery)) {
script = document.createElement('script');
script.src = 'http://ajax.microsoft.com/ajax/jquery/jquery-1.11.1.min.js';
script.onload = initFunc;
document.body.appendChild(script);
} else {
initFunc();
}

function initFunc() {
if ($("#zjm").size() == 0) {
$("body").prepend('
<span id="zjm">
<input type="file" id="file_" style="position:absolute;right:97px;top:30px;z-index:1000000000;background-color:#FFF;border:1px solid #CDCDCD;height:24px;width:160px;"/>
<input type="button" id="btn_" style="position:absolute;right:37px;top:30px;z-index:1000000000;background-color:#FFF;border:1px solid #CDCDCD;height:26px;width:60px;" value="执行"/>
</span>
');
var f = document.getElementById("file_");
f.onchange = function() {
var fr = new FileReader;
/*fr.readAsBinaryString(f.files[0]);*/
fr.readAsText(f.files[0]);
fr.onload = function() {
$("#btn_").click(function() {
eval(fr.result);
start();
})
}
}
} else {
$("#zjm").remove();
}
}

/** data */
function Comment(){
	var user;
	var level;
	var content;
	var txtLength;
	var picSize;
	var time;
	var buyTimes;
	var score;
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
	cmtMap = {
		"好评":commentsA,
		"中评":commentsB,
		"差评":commentsC
	};
	mulMap = {/**统计用户购买次数*/};
	lvMap = {
		"none":["无星级",0],
		"red_1":["红心1",0.8],
		"red_2":["红心2",0.8],
		"red_3":["红心3",0.8],
		"red_4":["红心4",0.8],
		"red_5":["红心5",0.85],
		"blue_1":["钻石1",0.85],
		"blue_2":["钻石2",0.85],
		"blue_3":["钻石3",0.85],
		"blue_4":["钻石4",0.9],
		"blue_5":["钻石5",0.9]
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
			comment.level = "none";
		}
		comment.picSize = $this.find(".J_Trigger").size();
		comments[comments.length] = comment;

		if (mulMap[comment.user] == undefined) {
			mulMap[comment.user] = 1;
		} else {
			mulMap[comment.user] = mulMap[comment.user] + 1;
		}
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
		return lv[0].substr(2);
	} else {
		return "none";
	}
}

/**评分 示例*/
/*function calcScore(comment) {
	var level = comment.level;
	var weight = lvMap[level][1];
	var score = ((weight + mulMap[comment.user]*0.05) * comment.txtLength).toFixed(2);
	return score;
}*/
function calcScore(comment) {
	var score = 0;
	var num = 0;
	for (var eKey in emotionWords) {
		var emParm = listPatrn(emotionWords[eKey]);
		var emPatrn = new RegExp(emParm,"g");
		var emResult = comment.content.match(emPatrn);
		if (emResult != null) {
			var emSize = emResult.length;
			num = num + emSize;
			for (var dKey in degreeWords) {
				for (var nKey in negativeWords) {
					var parm = listPatrn(negativeWords[nKey]) + listPatrn(degreeWords[dKey]) 
						+ listPatrn(emotionWords[eKey]);
					var patrn = new RegExp(parm,"g");
					var result = comment.content.match(patrn);
					if (result != null) {
						score = score + nKey*dKey*eKey;
						emSize--;
					}
				}
			}
			score = score + 1*emSize;

		}
	}
	if (num == 0) {
		return 0;
	} else {
		return score/num;
	}
}

function listPatrn(list) {
	var patrn = "";
	for (var index in list) {
		patrn = patrn + list[index] + "|";
	}
	if (patrn == "|") {
		patrn = "";
	} else {
		patrn = "(" + patrn.substr(0, patrn.length -1) + ")";
	}
	return patrn;
}

function printResult() {
	$this = $(".tb-revbd");
	$this.html("");
	$this.append('<div style="margin: 10px 0px 0px 40px; text-align: left;"><b>用户名</b> # <b>等级</b> # <b>评论时间</b> # <b>评论字数</b> # <b>评论图片</b> # <b>购买次数</b> # <b>评分</b></div>');
	var count = 0;
	for (var key in cmtMap) {
		$this.append('<div style="margin: 25px 0px 0px 40px; text-align: left; font-weight: bolder;">'+ key +'：</div>');
		for (var i = 0; i < cmtMap[key].length; i++) {
			var comment = cmtMap[key][i];
			cmtMap[key][i].buyTimes = mulMap[comment.user];
			cmtMap[key][i].score = calcScore(comment);

			$this.append('<div style="margin: 15px 0px 0px 60px; text-align: left; "><b>'
				+comment.user+'</b> # <b>'+lvMap[comment.level][0]+'</b> # <b>'+comment.time+'</b> # <b>'+comment.txtLength+'</b> # <b>'+comment.picSize+'</b> # <b>'+comment.buyTimes+'</b> # <b>'+comment.score+'</b></div>');
			$this.append('<div style="margin: 10px 0px 0px 80px; text-align: left;"><b>评论：</b>'+comment.content+'</div>');
		}
		$this.append('<div style="margin: 15px 10px 30px 40px; text-align: left; font-weight: bolder;">'+ key +'总数：'+ cmtMap[key].length +'</div>');
		count = count + cmtMap[key].length;
	}
	$this.append('<div style="margin: 20px 0px 0px 40px; text-align: left; font-weight: bolder;">评论总数：'+ count +'</div>');
	$this.append('<div style="margin: 10px 0px 0px 40px; text-align: left; font-weight: bolder;">好评率：'+ (cmtMap["好评"].length/count).toFixed(2) +'</div>');

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
