/*购物车*/
$(function(){
	var lst=[
			{name:'芊芊 2015年秋冬新款蕾丝衫打底衫印花长袖雪纺衫【不加绒】5020',price:36.00,cnt:1},
			{name:'芊芊 2015新款衬衫女长袖宽松五角星印花雪纺衫5200',price:26.00,cnt:1}
			
			];
	var fullAllPrice=function(){
		var allPrice=0;
		for(var i=0;i<lst.length;i++){
			var item=lst[i];
			allPrice+=item.price*item.cnt;
		}
		$('#spanAll').html(allPrice.toFixed(2));
	};
	fullAllPrice();
	for(var i=0;i<lst.length;i++){
		var tr=$('<tr></tr>');
		$('#tb').append(tr);
		var item=lst[i];
		var td=$('<td></td>');
		td.html(item.id);
		tr.append(td);
		
		td=$('<td></td>');
		td.html(item.name);
		tr.append(td);
		
		td=$('<td></td>');
		td.html(item.price.toFixed(2));
		tr.append(td);
		
		td=$('<td></td>');
		tr.append(td);
		var sel=$('<select></select>');
		td.append(sel);
		for(var n=1;n<=10;n++){
			var option=$('<option></option>');
			option.html(n);
			sel.append(option);
		}
		
		sel.val(item.cnt);
		sel.change(function(){
			var tr=$(this).parents('tr'),
				tds=tr.find('td'),
				td4=tds.eq(4),
				obj=lst[tr.index()-1];
				price=obj.price;
				obj.cnt = parseInt($(this).val());
				td4.html((price*obj.cnt).toFixed(2));
				fullAllPrice();
		});
		
		
		td=$('<td></td>');
		tr.append(td);
		td.html((item.price*item.cnt).toFixed(2));
		
		
		td=$('<td></td>');
		tr.append(td);
		var btn=$('<button>删除</button>');
		td.append(btn);
		btn.click(function(){
			var tr=$(this).parents('tr');
			var id=tr.find('td').eq(0).html();	//找到要删除的行所对应的物品id值					
//						lst=lst.filter(function(T){         //从lst中过滤出id值不是上面的物品条
//							return T.id!=id;				//即在lst中删除id值对应的物品条			
//						});				//下面比这种方法好理解
			
			var ary=[];
			for(var i=0;i<lst.length;i++){
				var item=lst[i];
				if(item.id!=id){
					ary.push(item);
				}							
			}
			lst=ary;
			
			
			tr.remove();
			fullAllPrice();
		});
		
		
	}
});
			