var host = '47.110.134.105';//jeremyda.cn
var test_url = 'http://192.168.1.5:8010/api/yfq/';
var real_url = 'http://'+host+':8010/api/yfq/';
var ws_test_url = "ws://192.168.1.5:8010";
var ws_real_url = "ws://"+host+":8010";
var lnjoy = {
	url:real_url,
	dataType:'json',
	type:'post',
	timeout:10000,
};
lnjoy.GetDataByPost = function(data,callback){
	//console.log('%o',data.queryData);
	mui.ajax(lnjoy.url+data.queryData.tradeCode,{
		data:data.queryData,
		dataType:lnjoy.dataType,//服务器返回json格式数据
		type:lnjoy.type,//HTTP请求类型
		timeout:lnjoy.timeout,//超时时间设置为10秒；
		headers:{'Content-Type':'application/json'},	              
		success:function(data){
			//服务器返回响应，根据响应结果，分析是否获取成功；
			callback(data);
		},
		error:function(xhr,type,errorThrown){
			//console.log('%o',xhr);
			//console.log('%o',type);
			//console.log('%o',errorThrown);
			//异常处理；
			console.log("报错了！");
		}
	});
}

var _openw = null;
var preate = {};
function clicked(id, param, a, s) {
	var obj = {
		preate: true
	};
	if(_openw) {
		return;
	}
	a || (a = as);
	_openw = preate[id];
	if(_openw) {
		_openw.showded = true;
		_openw.show(a, null, function() {
			_openw = null; //避免快速点击打开多个页面
		});
	} else {
		var wa = plus.nativeUI.showWaiting();
		obj = mui.extend(obj, param);
		_openw = plus.webview.create(id, id, {
			scrollIndicator: 'none',
			scalable: false,
			popGesture: 'hide'
		}, obj);
		preate[id] = _openw;
		_openw.setStyle({
			'popGesture': 'none'
		});
		_openw.addEventListener('loaded', function() { //页面加载完成后才显示
			setTimeout(function() { //延后显示可避免低端机上动画时白屏
				wa.close();
				_openw.showded = true;
				s || _openw.show(a, null, function() {
					_openw = null; //避免快速点击打开多个页面
				});
				s && (_openw = null); //避免s模式下变量无法重置
			}, 10);
		}, false);
		_openw.addEventListener('hide', function() {
			_openw && (_openw.showded = true);
			_openw = null;
		}, false);
		_openw.addEventListener('close', function() { //页面关闭后可再次打开
			_openw = null;
			preate[id] && (preate[id] = null); //兼容窗口的关闭
		}, false);
	}
}

/*mui.plusReady(function() {
	setTimeout(function(){
		if(plus.audio==='undefined'){
			mui.toast('权限没有啊');
		}
		var player = plus.audio.createPlayer("../resource/music.mp3");
		player.play(function (e) {
			console.log('播放完成后，运行代码');
		},function (e) {
			console.log(e.message);
	    },false);
	},500);
});*/

function scanedError(url){
	//提示鸣生
	switch (plus.os.name) { //判断设备类型
	    case "iOS":
	    if ( plus.device.model.indexOf("iPhone") >= 0 ) {
	        plus.device.beep();
	        console.log = "设备蜂鸣中...";
	    } else {
	        console.log = "此设备不支持蜂鸣";
	    }
	    break;
	    default:
	    plus.device.beep();
	    console.log = "设备蜂鸣中...";
	    break;
	}
	var player = null;
    var flag = false;
     mui.plusReady(function (){
        if(plus.audio==='undefined'){
            mui.toast('权限没有啊');
            return;
        }
        player = plus.audio.createPlayer(url);
        player.play(function (e) {
            console.log('播放完成后，运行代码');
        },function (e) {
            console.log(e.message);
        },false);
       
    })
}

Date.prototype.Format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}
