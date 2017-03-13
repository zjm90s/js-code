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
$("body").html('
<span id="zjm">
<input type="file" id="_file" style="position:absolute;right:77px;z-index:10000;background-color:#FFF;border:1px solid #CDCDCD;height:24px;width:160px;"/>
<input type="button" id="_btn" style="position:absolute;right:17px;z-index:10000;background-color:#FFF;border:1px solid #CDCDCD;height:26px;width:60px;" value="执行"/>
</span>
<iframe id="_ifrm" src="?" width="100%" frameborder="0"/>
');
$("#_ifrm").load(function(){
var height = $(this).contents().find("body").height() + 20;
$(this).height(height>800?height:800);
});
var f = document.getElementById("_file");
f.onchange = function() {
var fr = new FileReader;
fr.readAsText(f.files[0]);
fr.onload = function() {
$("#_btn").click(function() {
eval(fr.result);
})
}
}
} else {
$("#zjm").remove();
}
}

/** core */
function run(container){
pIndex = 0;
pSize = container.length;
stop = false;
process(container);
}

function process(container){
if(!stop && pIndex < pSize){
waitTime = 15;
if(pIndex == 0){
processExe(container[pIndex++]);
}else{
setTimeout(function(){processExe(container[pIndex++])},1000);
}
}
}

function processExe(func){
if(waitTime > 0){
waitTime --;
if(!func()){
setTimeout(function(){processExe(func)},1000);
}else{
process(container);
}
}else{
stop = true;
finish(func);
}
}

function setAllVal(ifrm,valMap) {
for (var key in valMap) {
ifrm.find("input[name='"+key+"']").val(valMap[key]);
}
}

function finish(func){
alert("Stop at " + func.name);
}
} ("/**@author jianming.zhou*/"))
