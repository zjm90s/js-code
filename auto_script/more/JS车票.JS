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
	$("#cc_from_station_上海_check").click();
	$("#cc_to_station_苏州").click();
	$("#cc_start_time").prepend('<option value="09301130" selected>09:00--11:30</option>');
}

} ("/**@author jianming.zhou*/"))
