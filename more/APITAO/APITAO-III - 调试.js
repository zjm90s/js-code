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
	var itemScore;
	var feelScore;
	var single;
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
		"red_1":["一颗心",0.8],
		"red_2":["二颗心",0.8],
		"red_3":["三颗心",0.8],
		"red_4":["四颗心",0.8],
		"red_5":["五颗心",0.85],
		"blue_1":["一颗钻",0.85],
		"blue_2":["二颗钻",0.85],
		"blue_3":["三颗钻",0.85],
		"blue_4":["四颗钻",0.9],
		"blue_5":["五颗钻",0.9]
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
	var feelScore = ((weight + mulMap[comment.user]*0.05) * comment.txtLength).toFixed(2);
	return feelScore;
}*/
function calcScore(comment) {
	var itemScore = 0;
	var feelScore = 0;
	var singleScore = 0;
	var num = 0;

	for (var iKey in itemWords) {
		alert(itemWords[iKey]);
		var itScore = 0;
		var itNum = 0;
		for (var item in itemWords[iKey]) {
			for (var eKey in emotionWords) {
				for (var dKey in degreeWords) {
					for (var nKey in negativeWords) {
						var parm = itemWords[iKey][item] + listPatrn(negativeWords[nKey]) 
							+ listPatrn(degreeWords[dKey]) + listPatrn(emotionWords[eKey]);
						var patrn = new RegExp(parm,"g");
						var result = comment.content.match(patrn);
						if (result != null) {
							var score = eKey*dKey*nKey;
							feelScore = feelScore + score;
							itScore = itScore + score*iKey;
							itNum++;
							num++;
							alert("正则："+patrn);
							alert("find："+result);
							alert(result+"-情感评分："+score);
							alert(result+"-特征评分："+score*iKey);
						}
					}
				}
			}
		}
		if (itNum != 0) {
			itemScore = parseFloat(itemScore) + parseFloat(itScore/itNum);
		} else {
			itemScore = parseFloat(itemScore) + parseFloat(iKey);
		}
	}
	alert("end");

	for (var bKey in singleWords) {
		var parm = listPatrn(singleWords[bKey]);
		var patrn = new RegExp(parm);
		var result = comment.content.match(patrn);
		if (result != null) {
			singleScore = bKey;
			break;
		}
	}

	comment.itemScore = itemScore.toFixed(2);
	if (num == 0) {
		comment.feelScore = 0.21;
	} else {
		comment.feelScore = (feelScore/num*0.21).toFixed(2);
	}
	if (singleScore == 0) {
		comment.singleScore = 0.10;
	} else {
		comment.singleScore = singleScore*0.10;
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
	$this.append('<div style="margin: 10px 0px 0px 40px; text-align: left;"><b>用户名</b> # <b>等级</b> # <b>等级权值</b> # <b>评论时间</b> # <b>评论字数</b> # <b>评论图片</b> # <b>购买次数</b> 
		# <b>情感评分</b> # <b>特征评分</b> # <b>转折评分</b></div>');
	var count = 0;
	for (var key in cmtMap) {
		$this.append('<div style="margin: 25px 0px 0px 40px; text-align: left; font-weight: bolder;">'+ key +'：</div>');
		for (var i = 0; i < cmtMap[key].length; i++) {
			var comment = cmtMap[key][i];
			cmtMap[key][i].buyTimes = mulMap[comment.user];
			/**cmtMap[key][i].feelScore = calcScore(comment);*/
			calcScore(comment);

			$this.append('<div style="margin: 15px 0px 0px 60px; text-align: left; "><b>'
				+comment.user+'</b> # <b>'+lvMap[comment.level][0]+'</b> # <b>'+lvMap[comment.level][1]+'</b> # <b>'+comment.time+'</b> # <b>'+comment.txtLength+'</b> # <b>'+comment.picSize+'</b> # <b>'+comment.buyTimes+'</b> # <b>'
				+comment.feelScore+'</b> # <b>'+comment.itemScore+'</b> # <b>'+comment.singleScore+'</b></div>');
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
