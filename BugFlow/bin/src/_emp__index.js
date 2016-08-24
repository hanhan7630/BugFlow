Emp.page.setId('_body_1686087514');
var welcome = new Emp.Panel({"id":"welcome","height":"100%","hAlign":"center","width":"100%","backgroundImage":"/images/bg.jpg","class":"setting-title"});
    var logoDiv = new Emp.Panel({"id":"logoDiv","height":"246","hAlign":"center","width":"245"});
    var img = new Emp.Image({"id":"img","height":"246","width":"245","src":"/login/logo.png"});
            logoDiv.add(img);
                welcome.add(logoDiv);
        Emp.page.add(welcome);
		

	var user;
	Emp.page.setBackgroundColor("#eaeaea");
	Emp.page.addEvent("onLoad", function() {
		login();
	});

	function login() {
		var pref = new $M.Preferences();//创建一个本地持久化存储对象
		pref.open('myPref');//打开已经存在的本地化存储对象，假如该对象不存在，则创建一个本地持久化存储
		var userid = pref.get("userid");
		var password = pref.get("password");
		//var userid="hanhan";
		//var password="000000";
		user = chackUser(userid, password);
		log("index,userid",userid);
		log("index,password",password);

		//动画
		logoDiv.clearAnimation();
		var alphaAnimation = new $M.AlphaAnimation({
			fromAlpha : 0,
			toAlpha : 1,
			duration : 1500
		});
		logoDiv.addAnimation(alphaAnimation);
		//logoDiv.setDisplay(true);
		setTimeout(function() {
			logoDiv.startAnimation();
		}, 20);

		//当所有的动画退出之后 就显示portal界面
		alphaAnimation.addEvent("onAnimationEnd", function() {
			//如果账号合理则跳转到主页，不合理则跳转到登录页
			//ＴＯ　ＤＯ'
			user=("wrong");//测试
			if (user == "wrong") {
				$M.page.goTo({
					'url' : '/login.html',
					'isDestroySelf' : true,
				});

			} else {
				var data = "a";
				$M.page.goTo({
					'url' : '/choosepage.html',
					'params' : data,
					'isDestroySelf' : true,
				});
			}

		});

	}
	function chackUser(userid, password) {
		var ajax = new $M.Ajax();//创建 ajax 对象
		ajax.add("userid", userid); //设置 ajax 参数
		ajax.add("password", password);
		ajax.setAction("/ChackUser.jsp"); //设置 ajax 请求地址
		ajax.submit(function(result) { //ajax 请求成功的回调函数，result 为返回的数据
			$M.page.goTo({
					'url' : '/newFlow.html',
					'isDestroySelf' : false,
				});
			
			user = result;

		}, function(errorCode, errorMsg) { //ajax 请求失败的回调函数
			log("ajax Error : " + errorCode + " " + errorMsg);//在控制台打印
		});

	};


     Emp.page.render();