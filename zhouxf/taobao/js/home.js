
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
	
	
	
	//固定块的显隐
	var fixed=$('.fixed').find('li');
	var fixedDivs=$('#fixedDiv').find('div');
	for(var i = 0;i < fixed.length - 1;i++){
		fixed[i].index=i;
		$(fixed[i]).mouseover(function(){
			//区块运动
			
			setInterval(function(){
				
				var speed=2;
				$('#fixedDiv').position().left+=speed;
			//	console.log($('#fixedDiv').position().left)
				if($('#fixedDiv').position().left>=1000){
					
					clearInterval();
				}
			},30)
			
			
			
			$('#fixedDiv').css('display','block');
			for(var j = 0;j < fixedDivs.length;j++){
				$(fixedDivs[j]).css('display','none');
			}
			$(fixedDivs[this.index]).css('display','block');
		});
		
		$('#fixedDiv').mouseover(function(){
			$(this).css('display','block');
		});

		$('#fixedDiv').mouseout(function(){
			$(this).css('display','none');
			
		});
		$('.fixed').mouseout(function(){
			$('#fixedDiv').css('display','none');
		});
		
	}
	
	
	
	//banner块
	var divs=$('.main11-banner');
	var hides=$('.hide-div1');
	for(var i=0;i<divs.length;i++){
		divs[i].index=i;
		$(divs[i]).mouseover(function(){						
			$('.box').css('display','block');
			for(var j=0;j<hides.length;j++){
				$(hides[j]).css('display','none');
			}
			$(hides[this.index]).css('display','block');
			
		});
		$('.box').mouseover(function(){
			$(this).css('display','block');
		});

		$('.box').mouseout(function(){
			$(this).css('display','none');
		});
		$('.main11').mouseout(function(){
			$('.box').css('display','none');
		});
	}
	

		//首页中的banner图及轮播图
	    $('.banner').unslider();
  

	
	//点击回到顶部
	window.onscroll = function(){
		var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
		if(scrolltop >=100){
			$('.fixed-li-last').css('display','block');
		}else{
			$('.fixed-li-last').css('display','none');
		}
		
	}
	$('.fixed-li-last').click(function(){
		document.documentElement.scrollTop = document.body.scrollTop =0;
	});
	
	
	
	
	
	//各楼层左侧图动态
    var oUL=$('.change-ul');
    var odiv=$('.change-div')
    for(var i=0;i<oUL.length;i++){
    	oUL[i].index=i;
    	oUL[i] .onmouseover=function(){
			$(this).css('width',170);
			$('.first-li').css('width',200);
			$(odiv[this.index]).css('opacity',0.2);							
		};
		oUL[i].onmouseout=function(){
			$(this).css('width',50);
			$(odiv[this.index]).css('opacity',1);	
		};
    }
	
	
	
});



