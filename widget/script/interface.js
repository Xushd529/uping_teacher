/**
 * 接口
 */


var API = (function(obj){

	var OSSURL = 'http://data.uping.wang/app/v0.0.1/';
	var BASEURL = 'http://192.168.99.162:8083';

	obj.scanKey = "http://192.168.99.162:8083/app/scanlogin/";
	/**
	 * Post请求
	 * @param {Object} url
	 * @param {Object} param
	 * @param {Object} cb
	 */
	var HttpPost = function(url,param,cb){

		var token = $api.getStorage('token');
		api.ajax({
		    url: BASEURL+url+"?"+Math.random(),
		    method: 'post',
		    data: {
		        values: param
		    },
		    headers: {
            "X-Maizhong-AppKey": token
        	},timeout:10
		}, function(ret, err) {
		    if (ret) {
		    	//成功
		    	if(ret.status==200){
		    		cb(null,ret);
		    	}else{
		    		cb(ret.message,null);
		    	}
		    } else {
		    	//失败
		    	cb(err,null);
		    }
		});
	};
	/**
	 * Get请求
	 * @param {Object} url
	 * @param {Object} param
	 * @param {Object} cb
	 */
	var HttpGet = function(url,param,cb){
		var token = $api.getStorage('token');
		api.ajax({
		    url: BASEURL+url+"?"+Math.random(),
		    method: 'get',
		    data: {
		        values: param
		    },
		    headers: {
            "X-Maizhong-AppKey": token
        	},timeout:10
		}, function(ret, err) {
		    if (ret) {
		    	//成功
		    	if(ret.status==200){
		    		cb(null,ret);
		    	}else{
		    		cb(ret.message,null);
		    	}
		    } else {
		    	//失败
		    	cb(err,null);
		    }
		});
	}
	/**
	 * 登录
	 * @param {Object} param 参数
	 * @param {Object} cb 回调函数
	 */
	obj.login = function(param,cb){
		HttpGet('/login/app/teacher',param,cb)
	}

	/**
	 * 扫描登录二维码成功
	 * @param  {[type]} token [description]
	 * @return {[type]}       [description]
	 */
	obj.scanSuccess = function(token){
		HttpGet('/login/scan/'+token,{},function(e,r){});
	}
	/**
	 * WEB登录
	 * @param  {[type]}   token [description]
	 * @param  {Function} cb   回调函数
	 * @return {[type]}         [description]
	 */
	obj.webLogin = function(token,cb){
		HttpGet('/app/scanlogin/'+token,{},cb);
	}
	/**
	 * 验证token有效性
	 * @param {Object} token
	 * @param {Object} cb
	 */
	obj.checktoken = function(token,cb){
		HttpGet('/check/token/'+token,{},cb)
	}
	/**
	 * 忘记密码发送验证码
	 * @param {Object} phone 手机号
	 * @param {Object} cb 回调函数
	 */
	obj.sendcode =function(phone,cb){
		HttpPost('/sms/app/forget/'+phone,{},cb)
	}

	/**
	 * 验证验证码
	 * @param {Object} phone
	 * @param {Object} code
	 * @param {Object} cb
	 */
	obj.checkcode = function(phone,code,cb){
		HttpGet("/sms/check/"+phone+"/"+code,{},cb)
	}

	/**
	 * 绑定手机号
	 * @param {Object} account
	 * @param {Object} phone
	 * @param {Object} cb
	 */
	obj.bindphone = function(account,phone,cb){
		HttpPost("/bind/teacher/"+account+"/"+phone,{},cb)
	}

	/**
	 * 修改密码
	 * @param {Object} phone
	 * @param {Object} pass
	 * @param {Object} cb
	 */
	obj.restpass = function(phone,pass,cb){
		HttpPost("/reset/teacher/pass/"+phone+"/"+pass,{},cb)
	}


	/**
	 * APP 图片上传
	 * @param {Object} file
	 * @param {Object} type
	 * @param {Object} cb
	 */
	obj.imgUpload = function(file,type,cb){
		var token = $api.getStorage('token');
		api.ajax({
		    url: BASEURL+'/app/uploadImg',
		    method: 'post',
		    data: {
		        values: {
		            type: type,
		            file: file
		        }
		    }, headers: {
            "X-Maizhong-AppKey": token
        	}
		}, function(ret, err) {
		    if (ret) {
		       	if(ret.status==200){
		    		cb(null,ret);
		    	}else{
		    		cb(ret.message,null);
		    	}
		    } else {
		        cb(err,null)
		    }
		});
	}

	/**
	 * 发布圈子
	 * @param {Object} param
	 */
	obj.sendCircle = function(param,cb){
		HttpPost('/app/circle/publish',param,cb)
	}

	/**
	 * 获取圈子内容
	 * @param {Object} target 1 学校 2班级
	 * @param {Object} type 1历史 2刷新
	 * @param {Object} time
	 * @param {Object} cb
	 */
	obj.getCircle = function(target,type,time,cb){
		HttpGet("/app/teacher/cicle/"+target+"/"+type,{nowTime:time},cb)
	}

	/**
	 * 圈子点赞
	 * @param {Object} circleId
	 * @param {Object} cb
	 */
	obj.likeCicle = function(circleId,cb){
		HttpPost("/app/teacher/cicle/like/"+circleId,{},cb)
	}
	/**
	 * 取消点赞
	 * @param {Object} circleId
	 * @param {Object} cb
	 */
	obj.likeCicleCancle = function(circleId,cb){
		HttpPost("/app/teacher/cicle/likecancle/"+circleId,{},cb)
	}

	/**
	 * 圈子评论
	 * @param {Object} param
	 * @param {Object} cb
	 */
	obj.commentCircle = function(param,cb){
		HttpPost('/app/teacher/circle/comment',param,cb)
	}
	/**
	 * 评论删除
	 * @param {Object} id
	 * @param {Object} cb
	 */
	obj.commentCircleDel = function(circleId,id,cb){
		HttpGet('/app/teacher/circle/comment/del/'+circleId+"/"+id,{},cb)
	}


	/**
	 * 同步用户信息
	 * @param {Object} cb
	 */
	obj.getUserInfo = function(cb){
		HttpGet("/app/teacher/userinfo",{},cb)
	}

	/**
	 * 获取新闻
	 * @param  {int}   pageIndex 页码
	 * @param  {Function} cb        回调函数
	 */
	obj.getNews = function(pageIndex,cb){
		HttpGet("/app/home/news/list/"+pageIndex+'/10',{},cb);
	}

	return obj;

})(window.API || {})
