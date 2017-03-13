javascript: (function() {
	if (! ($ = window.jQuery)) { //如果页面未引入了jQuery，则动态引入下
		script = document.createElement('script'); //动态创建script标签
		script.src = 'http://ajax.microsoft.com/ajax/jquery/jquery-1.11.1.min.js'; //jQuery地址，由于谷歌的国内访问不了了，就用的微软的
		script.onload = initFunc; //script加载后执行initFunc()
		document.body.appendChild(script); //将动态生成的script添加到body标签最后
	} else {
		initFunc();
	}

	function initFunc() {
		if ($("#zjm").size() == 0) { //如果工具条不存在则创建，否则删除
			$("body").html(' 
				<span id="zjm"> 
				<input type="file" id="_file" style="position:absolute;right:77px;z-index:10000;background-color:#FFF;border:1px solid #CDCDCD;height:24px;width:160px;"/> 
				<input type="button" id="_btn" style="position:absolute;right:17px;z-index:10000;background-color:#FFF;border:1px solid #CDCDCD;height:26px;width:60px;" value="执行"/> 
				</span> 
				<iframe id="_ifrm" src="?" width="100%" frameborder="0"/> 
			'); //创建工具条
			$("#_ifrm").load(function() {
				var height = $(this).contents().find("body").height() + 20;
				$(this).height(height > 800 ? height: 800);
			}); //动态设置iframe高度
			var f = document.getElementById("_file");
			f.onchange = function() {
				var fr = new FileReader;
				/*fr.readAsBinaryString(f.files[0]);*/
				fr.readAsText(f.files[0]); //文件读取
				fr.onload = function() {
					$("#_btn").click(function() { //对“执行”按钮绑定事件
						eval(fr.result); //执行本地js文件
					})
				}
			}
		} else {
			$("#zjm").remove();
		}
	}

	/** core */
	function run(container) { //入口方法
		pIndex = 0; //设置页面方法的起始索引
		pSize = container.length; //设置页面方法的最大索引
		stop = false; //用于判断是否停止整个业务流程
		process(container);
	}

	function process(container) { //执行container中的所有页面方法
		if (!stop && Index < pSize) {
			waitTime = 15; //最长等待时间，为了以防有的页面加载很久还没加载完。如果超过15秒还没加载完，则主动停止整个自动化流程。
			if (pIndex == 0) { //登陆页面为了有良好的交互不做延时处理
				processExe(container[pIndex++]);
			} else {
				setTimeout(function() {
					processExe(container[pIndex++])
				},
				1000); //1秒后执行processExe(container[pIndex++])，即container中的第pIndex个页面方法
			}
		}
	}

	function processExe(func) { //执行单个页面
		if (waitTime > 0) { //当等待时间未超过15秒，则继续等待执行当前页面，否则停止整个业务流程
			waitTime--;
			if (!func()) { //如果返回false则继续等待执行当前页面，否则执行下个页面
				setTimeout(function() {
					processExe(func)
				},
				1000); //1秒后递归调用自身
			} else {
				process(container); //执行下个页面
			}
		} else {
			stop = true;
			finish(func);
		}
	}

	function setAllVal(ifrm,valMap) { //填写表单
		for (var key in valMap) {
			ifrm.find("input[name='"+key+"']").val(valMap[key]);
		}
	}

	function finish(func) { //显示业务流程停在哪个步骤（方法）
		alert("Stop at " + func.name);
	}
} ("/**@author jianming.zhou*/"))
