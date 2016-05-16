
$(document).ready(function(){
	//登录退出
	
	$.post('/api/users/check_login_state',function(result){
		console.log(result.err);
		if(result.err==0){
			//登录状态
			$('#out').css('display','inline-block');
			$('#login').css('display','none');
			$('#out-name').html(localStorage.a);
		}
		if(result.err==410){
			//非登录状态
			$('#out').css('display','none');
			$('#login').css('display','inline-block');
		}
	});
	//退出
	$('#go_out').click(function(){
		$.post('/api/users/logout',function(result){
			if(result.err==0){
				$('#out').css('display','none');
				$('#login').css('display','inline-block');
			}
		});
	});
	
	
	
	
	
	
	//楼层菜单
	$(window).scroll(function(){		
		var scrolltop=$(document).scrollTop();
		//$('title').html(scrolltop);
		if(scrolltop>=2300){
			$('#menu').css('display','block');
		}else{
			$('#menu').css('display','none');
		}

	});
	

	
	
	
	
	//轮播图
	$(function() {		
	    $('.banner').unslider();
  
	});
	
	/*活动的倒计时*/
	var d=1,
	    wm=1*24*3600,
	    h=$('.h'),
	    m=$('.m'),
	    s=$('.s');
		h.css('color','red').css('background','#000000').css('font-weight','bold');
		m.css('color','red').css('background','#000000').css('font-weight','bold');
		s.css('color','red').css('background','#000000').css('font-weight','bold');
	setInterval(function(){
		wm--;
		h.html(Math.floor(wm/3600));
		m.html(Math.floor(wm%3600/60));
		s.html(wm%60);
	},1000);
	
	/*点击增长ul显示更多*/	
	var ifb=false;
	$('#btn-up').click(function(){
		if(!ifb){
			$('#ul-up').css('height','1046px');
			$(this).html('点击还原');
			ifb=true;
		}else{
			$('#ul-up').css('height','708px');
			$(this).html('查看更多商品');
			ifb=false;
		}
	});
	$('#btn-up1').click(function(){
		if(!ifb){
			$('#ul-up1').css('height','1046px');
			$(this).html('点击还原');
			ifb=true;
		}else{
			$('#ul-up1').css('height','708px');
			$(this).html('查看更多商品');
			ifb=false;
		}
	});
	
	
	
});
