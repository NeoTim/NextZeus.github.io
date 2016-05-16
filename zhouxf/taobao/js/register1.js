
$(document).ready(
	$('#btn').click(function(){
		//注册  邮箱/电话
		var email=$('#email').val();
		var emailSpan=$('#email-span');
		var flag=true;
		if((!/\w{6}@[a-z]{2}\.[a-z]{3}/.test(email))&&(!/1[3|5|7|8]\d{9}/.test(email.replace((/\s+/g),'')))){			
			emailSpan.html('请用邮箱/电话注册');
			emailSpan.css('color','red');
			return flag=false;
		}else{
			emailSpan.html('');
		}
		
		//密码	
		var pwd=$('#pwd').val();
		var pwdSpan=$('#pwd-span');
		if(!/^[\w]{6,18}$/.test(pwd)){			
			pwdSpan.html('密码格式不正确');
			pwdSpan.css('color','red');
			return flag=false;
		}else{
			pwdSpan.html('');
		}
		//验证码
		var forpwd=$('#forpwd').val();
		var forpwdSpan=$('#forpwd-span');
		if(forpwd!='123'){
			forpwdSpan.html('请输入正确的验证码');
			forpwdSpan.css('color','red');
			return flag=false;
		}else{
			forpwdSpan.html('');
		}
		
		
		
		//注册验证
		if(flag){
			
			$.post('/api/users/add',{id:email,name:email,pass:pwd,age:22},function(result){
				console.log('a')
				//console.log(result)
				if(result.err==0){
					localStorage.a=email;
					window.location.href="register2.html";
					//$('#teleph').html(getval('username'));
					//console.log(result.data);
				}
				if(result.err==101){
					alert('此用户名已注册！');
				}
			})
		}
		

		
	})

);
	
		
			
			
	
			
	
			

	

