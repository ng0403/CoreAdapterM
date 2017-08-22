/**
 * 
 * opptyItemAdd()			:: 추가 테이블 생성(tr/td)
 * opptyItemInsert()		:: 매출상품 추가
 * opptyItemDelte()			:: 매출상품 삭제
 * 
 */

var ctx = $("#ctx").val();
var tmp;
var selQty;
var selDC;
var main_cate_cd;
var mid_cate_cd;
var totalPrice;

$(document).ready(function(){
//	$('.patment_day').datepicker();
	$(document).find('.payment_day').removeClass('hasDatepicker').datepicker({
		dateFormat: "yy-mm-dd",
	    defaultDate: "+1w",
	    numberOfMonths: 1,
	    changeMonth: true,
	    showMonthAfterYear: true ,
	    changeYear: true
	});
	
	mainCatePopup();
	midCatePopup();
	smallCatePopup();
	
	// 입력하는 수량의 위치를 담아준다.
	$(document).on( 'click','.qty',function(event) {
		selQty = $(this);
	});
	
	$(document).on('click', '.offer_price', function(event) {
		selDC = $(this);
		totalPrice = selDC.parent().parent().children().eq(6).children().eq(0).val();
	});
	
});

// 테이블 생성(Ajax)
function opptyItemAdd()
{
	var tbody = $('#oppty_item_list_tbody');
	var tbodyContent = "";
	
	// 새로 그려준다.
	tbody.append(
		"<tr class='oppty_item_list_tr'>"+
			"<td><input type='checkbox' class='del_chk' name='del_chk'></td>" +
			"<td style='text-align: left;'>" +
				"<input type='hidden' class='main_cate_cd' name='main_cate_cd' value=''>" +
				"<input type='text' class='main_cate_name' name='main_cate_name' readonly='readonly'></td>"+
			"<td style='text-align: left;'>" +
				"<input type='hidden' class='mid_cate_cd' name='mid_cate_cd' value=''>" +
				"<input type='text' class='mid_cate_name' name='mid_cate_name' readonly='readonly'></td>"+
			"<td style='text-align: left;'>" +
				"<input type='hidden' class='small_cate_cd' name='small_cate_cd' value=''>" +
				"<input type='text' class='small_cate_name' name='small_cate_name' readonly='readonly'></td>"+
			"<td style='text-align: left;'><input type='text' class='qty' name='qty' onkeyup='totalPrice();'></td>"+
			"<td style='text-align: left;'><input type='text' class='list_price' name='list_price'></td>"+
			"<td style='text-align: left;'><input type='text' class='total_price' name='total_price' readonly='readonly'></td>"+
			"<td style='text-align: left;'><input type='text' class='dc_price' name='dc_price' readonly='readonly'></td>"+
			"<td style='text-align: left;'><input type='text' class='offer_price' name='offer_price' onkeyup='dcPrice();'></td>"+
			"<td style='text-align: left;'><input type='text' class='payment_day' id='payment_day' name='payment_day'></td>"+
		"</tr>"
	);
	
	
}

function opptyItemInsert()
{
	var oppty_no     = $("#oppty_no").val();
	var main_cat_cd  = [];
	var mid_cat_cd   = [];
	var small_cat_cd = [];
	var qty			 = [];
	var list_price	 = [];
	var dc_price	 = [];
	var payment_day  = [];
	var opptyItemList = [];
	
	var tbody = $("#oppty_item_list_tbody");
	var tbodyContent = "";
	
	$("#oppty_item_list_tbody tr").each(function() {
		main_cat_cd.push($(this).children().eq(1).children().eq(0).val());
		mid_cat_cd.push($(this).children().eq(2).children().eq(0).val());
		small_cat_cd.push($(this).children().eq(3).children().eq(0).val());
		qty.push($(this).children().eq(4).children().val());
		list_price.push($(this).children().eq(5).children().val());
		dc_price.push($(this).children().eq(7).children().val());
		payment_day.push($(this).children().eq(9).children().val());
		
		opptyItemList.push(main_cat_cd.pop());
		opptyItemList.push(mid_cat_cd.pop());
		opptyItemList.push(small_cat_cd.pop());
		opptyItemList.push(qty.pop());
		opptyItemList.push(list_price.pop());
		opptyItemList.push(dc_price.pop());
		opptyItemList.push(payment_day.pop());
		
	});
	
	console.log(opptyItemList);
	
	$.ajax({
		url : ctx + '/opptyItemInsert',
		type: 'POST',
		dataType : 'json',
		data : {
			oppty_no	  : oppty_no,
			opptyItemList : opptyItemList
		},
		success:function(data){
			tbody.children().remove();
			
			var size = data.length;
			var total_price = 0;
			var offer_price = 0;
			
			for(var i=0; i<size; i++)
			{
//				total = data.qty * list_price - dc_price;

				tbodyContent = "<tr>" +
				"<td><input type='checkbox' class='del_chk' name='del_chk'></td>" +
	 			"<td style='text-align: left;'>" +
	 				"<input type='hidden' class='main_cate_cd' name='main_cate_cd' value='"+ data[i].main_cate_cd +"'>" +
	 				"<input type='text' class='main_cate_name' name='main_cate_name' value='"+ data[i].main_cate_name +"'></td>" +
	 			"<td style='text-align: left;'>" +
	 				"<input type='hidden' class='mid_cate_cd' name='mid_cate_cd' value='"+ data[i].mid_cate_cd +"'>" +
 					"<input type='text' class='mid_cate_name' name='mid_cate_name' value='"+ data[i].mid_cate_name +"'></td>" +
 				"<td style='text-align: left;'>" +
	 				"<input type='hidden' class='small_cate_cd' name='small_cate_cd' value='"+ data[i].small_cate_cd +"'>" +
 					"<input type='text' class='small_cate_name' name='small_cate_name' value='"+ data[i].small_cate_name +"'></td>" +
 				"<td style='text-align: left;'>" +
 					"<input type='text' class='qty' name='qty' value='"+ data[i].qty +"'></td>" +
 				"<td style='text-align: left;'>" +
 					"<input type='text' class='list_price' name='list_price' value='"+ data[i].list_price +"'></td>" +
 				"<td style='text-align: left;'>" +
 					"<input type='text' class='total_price' name='total_price' value='"+ data[i].total_price +"' readonly='readonly'></td>" +
 				"<td style='text-align: left;'>" +
 					"<input type='text' class='dc_price' name='dc_price' value='"+ data[i].dc_price +"'></td>" +
 				"<td style='text-align: left;'>" +
 					"<input type='text' class='offer_price' name='offer_price' value='"+ data[i].offer_price +"'></td>" +
 				"<td style='text-align: left;'>" +
 					"<input type='text' class='payment_day' name='payment_day' value='"+ data[i].payment_day +"'></td>" +
	 			"</tr>"
 					
 				tbody.append(tbodyContent);
			}
			
		},
		error:function(request){
			alert("error : " + request.status)
		}
	});
}

// 삭제버튼 눌렀을 시
function opptyItemDelte()
{
	var checkbox=$('#opptyItemTable tbody').find('input[type=checkbox]:checked');	// 체크된 체크박스를 담는다.
	var delTr = checkbox.parent().parent();											// 체크된 체크박스의 tr을 담는다.
	var delQty = checkbox.parent().parent().children().eq(4).children().val();		// 체크된 체크박스의 item의 수량을 담는다.
	
	console.log(delTr);
	console.log(delQty);
	
	delTr.remove();
//	if(delQty == 1)
//	else if(delQty > 1)		// 수량이 1 이상일 경우 수량을 깍는다.
//	{
//		var qty = delQty - 1;
//		
//		checkbox.parent().parent().children().eq(4).children().val(qty);
//	}
	
}

/* Popup */
function mainCatePopup()
{
	$(document).on( 'click','.main_cate_name',function(event) {
		// 팝업창 표시
		$.blockUI({ message: $('#mainCateListModalDiv'),
	    	css: { 
	    	'left': '65%',
	    	'top': '50%',
	    	'margin-left': '-400px',
	    	'margin-top': '-250px',
	    	'width': '400px',
	    	'height': '500px',
	    	'cursor': 'default'
	    	}
			,onOverlayClick : $.unblockUI
		});
		
		tmp = $(this);	// 클릭 한 input 태그 위치 저장.

		viewMainCateList(1);
		
	});
	
}

function viewMainCateList(mainCatePopupPageNum)
{
	var ctx = $("#ctx").val();
	var s_main_cate_name = $("#s_main_cate_name").val();
	console.log(s_main_cate_name);
	
	$.ajax({
		url: ctx + "/mainCateListAjax", 
		type: "POST",  
		data: { 
			mainCatePopupPageNum : mainCatePopupPageNum,
			s_main_cate_name : s_main_cate_name 
		},
		dataType: "json",
		success: function(data) { 
			
			$("#mainCateListTbody").empty();
			$("#s_main_cate_name").bind("keypress", function(event) {
				enterSearch(event);
			});
			
			if (data.mainCatePopupList.length == 0) {
				var trElement = $("#mainCateListTableHeader").clone().removeClass().empty();
				$("#mainCateListTbody").append(trElement);
				$("#mainCateListTbody tr:last").append("<td colspan='3' style='width:100%; height: 260px; cursor: default; background-color: white;' align='center'>검색 결과가 없습니다</td>");
			} else {
				console.log(data);
				$.each(data.mainCatePopupList, function(i) {
					var trElement = $("#mainCateListTableHeader").clone().removeClass().empty();
					var main_cate_cd = this.main_cate_cd;
					var main_cate_name = this.main_cate_name;

					trElement.bind("click", function(e) {
						setTimeout($.unblockUI, 0);
						tmp.parents().children().eq(0).val(main_cate_cd);
						tmp.val(main_cate_name);

					});
					
					addMouseEvent(trElement);
					trElement.css("cursor", "pointer");
					
					$("#mainCateListTbody").append(trElement);
					$("#mainCateListTbody tr:last").append("<td width='60%'>" + main_cate_cd + "</td>"
							+ "<td width='30%'>" + main_cate_name + "</td>");
				});
			}
			console.log(data);
			
			// 페이징 그리기
			$("#mainCatePagingDiv").empty();
			var pageContent = "";
			
			if(data.page.endPageNum == 0 || data.page.endPageNum == 1){
				pageContent = "◀ <input type='text' id='catePageInput' readonly='readonly' value='1' style='width: 25px; text-align: center;'/> / 1 ▶";
			} else if(data.pageNum == data.page.startPageNum){
				pageContent = "<input type='hidden' id='catePageNum' value='"+data.pageNum+"'/><input type='hidden' id='cateEndPageNum' value='"+data.page.endPageNum+"'/>"
				+"◀ <input type='text' id='catePageInput' value='"+data.page.startPageNum+"' onkeypress=\"catePageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>" 
				+"<a onclick=\"viewMainCateList("+data.page.endPageNum+");\" id='pNum' style='cursor: pointer;'> / "+data.page.endPageNum+"</a>"
				+"<a onclick=\"viewMainCateList("+(data.pageNum+1)+");\" id='pNum' style='cursor: pointer;'> ▶ </a>";
				
			} else if(data.pageNum == data.page.endPageNum){
				pageContent = "<input type='hidden' id='catePageNum' value='"+data.pageNum+"'/><input type='hidden' id='cateEndPageNum' value='"+data.page.endPageNum+"'/>"
				+"<a onclick=\"viewMainCateList("+(data.pageNum-1)+");\" id='pNum' style='cursor: pointer;'> ◀ </a>"
				+"<input type='text' id='catePageInput' value='"+data.page.endPageNum+"' onkeypress=\"catePageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>"
				+"<a> / "+data.page.endPageNum+"</a> ▶";
				
			} else {
				pageContent = "<input type='hidden' id='catePageNum' value='"+data.pageNum+"'/><input type='hidden' id='cateEndPageNum' value='"+data.page.endPageNum+"'/>"
				+"<a onclick=\"viewMainCateList("+(data.pageNum-1)+");\" id='pNum' style='cursor: pointer;'> ◀ </a>"
				+"<input type='text' id='catePageInput' value='"+data.pageNum+"' onkeypress=\"catePageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>"
				+"<a onclick=\"viewMainCateList("+data.page.pageNum+");\" id='pNum' style='cursor: pointer;'> / "+data.page.endPageNum+"</a>"
				+"<a onclick=\"viewMainCateList("+(data.pageNum+1)+");\" id='pNum' style='cursor: pointer;'> ▶ </a>";
			}
			$("#mainCatePagingDiv").append(pageContent);
			
		},
		beforeSend: function(){
        	viewLoadingShow();			
        },
        complete:function(){
        	viewLoadingHide();	
        },
		error: function(data) { 
			alert("대분류목록을 취득하지 못했습니다.");
			return false;
		}
	});
}

function midCatePopup()
{
//	var main_cate_cd = $("#main_cate_cd").val();
	
	$(document).on( 'click','.mid_cate_name',function(event) {
		tmp = $(this);
		main_cate_cd = tmp.parent().parent().children().eq(1).children().eq(0).val();
		
		if(main_cate_cd == "" || main_cate_cd == null)
		{
			alert("대분류를 먼저 선택하세요.");
		}
		else
		{
			// 팝업창 표시
			$.blockUI({ message: $('#midCateListModalDiv'),
		    	css: { 
		    	'left': '65%',
		    	'top': '50%',
		    	'margin-left': '-400px',
		    	'margin-top': '-250px',
		    	'width': '400px',
		    	'height': '500px',
		    	'cursor': 'default'
		    	}
				,onOverlayClick : $.unblockUI
			});
			
			viewMidCateList(1);
		}
	});
	
	
}

function viewMidCateList(mainCatePopupPageNum)
{
	var ctx = $("#ctx").val();
	var s_mid_cate_name = $("#s_mid_cate_name").val();
	
	$.ajax({
		url: ctx + "/midCateListAjax", 
		type: "POST",  
		data: {
			main_cate_cd	: main_cate_cd,
			s_mid_cate_name : s_mid_cate_name 
		},
		dataType: "json",
		success: function(data) { 
			
			$("#midCateListTbody").empty();
			$("#s_mid_cate_name").bind("keypress", function(event) {
				enterSearch(event);
			});
			
			if (data.midCatePopupList.length == 0) {
				var trElement = $("#midCateListTableHeader").clone().removeClass().empty();
				$("#midCateListTbody").append(trElement);
				$("#midCateListTbody tr:last").append("<td colspan='3' style='width:100%; height: 260px; cursor: default; background-color: white;' align='center'>검색 결과가 없습니다</td>");
			} else {
				console.log(data);
				$.each(data.midCatePopupList, function(i) {
					var trElement = $("#midCateListTableHeader").clone().removeClass().empty();
					var mid_cate_cd = this.mid_cate_cd;
					var mid_cate_name = this.mid_cate_name;

					trElement.bind("click", function(e) {
						setTimeout($.unblockUI, 0);
						tmp.parent().children().eq(0).val(mid_cate_cd);
						tmp.val(mid_cate_name);
					});
					
					addMouseEvent(trElement);
					trElement.css("cursor", "pointer");
					
					$("#midCateListTbody").append(trElement);
					$("#midCateListTbody tr:last").append("<td width='60%'>" + mid_cate_cd + "</td>"
							+ "<td width='30%'>" + mid_cate_name + "</td>");
				});
			}
			
			// 페이징 그리기
			$("#midCatePagingDiv").empty();
			var pageContent = "";
			
			if(data.page.endPageNum == 0 || data.page.endPageNum == 1){
				pageContent = "◀ <input type='text' id='catePageInput' readonly='readonly' value='1' style='width: 25px; text-align: center;'/> / 1 ▶";
			} else if(data.pageNum == data.page.startPageNum){
				pageContent = "<input type='hidden' id='catePageNum' value='"+data.pageNum+"'/><input type='hidden' id='cateEndPageNum' value='"+data.page.endPageNum+"'/>"
				+"◀ <input type='text' id='catePageInput' value='"+data.page.startPageNum+"' onkeypress=\"catePageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>" 
				+"<a onclick=\"viewMidCateList("+data.page.endPageNum+");\" id='pNum' style='cursor: pointer;'> / "+data.page.endPageNum+"</a>"
				+"<a onclick=\"viewMidCateList("+(data.pageNum+1)+");\" id='pNum' style='cursor: pointer;'> ▶ </a>";
				
			} else if(data.pageNum == data.page.endPageNum){
				pageContent = "<input type='hidden' id='catePageNum' value='"+data.pageNum+"'/><input type='hidden' id='cateEndPageNum' value='"+data.page.endPageNum+"'/>"
				+"<a onclick=\"viewMidCateList("+(data.pageNum-1)+");\" id='pNum' style='cursor: pointer;'> ◀ </a>"
				+"<input type='text' id='catePageInput' value='"+data.page.endPageNum+"' onkeypress=\"catePageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>"
				+"<a> / "+data.page.endPageNum+"</a> ▶";
				
			} else {
				pageContent = "<input type='hidden' id='catePageNum' value='"+data.pageNum+"'/><input type='hidden' id='cateEndPageNum' value='"+data.page.endPageNum+"'/>"
				+"<a onclick=\"viewMainCateList("+(data.pageNum-1)+");\" id='pNum' style='cursor: pointer;'> ◀ </a>"
				+"<input type='text' id='catePageInput' value='"+data.pageNum+"' onkeypress=\"catePageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>"
				+"<a onclick=\"viewMidCateList("+data.page.pageNum+");\" id='pNum' style='cursor: pointer;'> / "+data.page.endPageNum+"</a>"
				+"<a onclick=\"viewMidCateList("+(data.pageNum+1)+");\" id='pNum' style='cursor: pointer;'> ▶ </a>";
			}
			$("#midCatePagingDiv").append(pageContent);
			
		},
		beforeSend: function(){
        	viewLoadingShow();			
        },
        complete:function(){
        	viewLoadingHide();	
        },
		error: function(data) { 
			alert("중분류목록을 취득하지 못했습니다.");
			return false;
		}
	});
}

function smallCatePopup()
{
	
	$(document).on( 'click','.small_cate_name',function(event) {
		tmp = $(this);
		main_cate_cd = tmp.parent().parent().children().eq(1).children().eq(0).val();
		mid_cate_cd = tmp.parent().parent().children().eq(2).children().eq(0).val();
		
		console.log(mid_cate_cd);
		
		if(main_cate_cd == "" || main_cate_cd == null)
		{
			alert("대분류를 먼저 선택하세요.");
		}
		else if(mid_cate_cd == "" || mid_cate_cd == null)
		{
			alert("중분류를 먼저 선택하세요.");
		}
		else
		{
			// 팝업창 표시
			$.blockUI({ message: $('#smallCateListModalDiv'),
		    	css: { 
		    	'left': '65%',
		    	'top': '50%',
		    	'margin-left': '-400px',
		    	'margin-top': '-250px',
		    	'width': '400px',
		    	'height': '500px',
		    	'cursor': 'default'
		    	}
				,onOverlayClick : $.unblockUI
			});
			
			viewSmallCateList(1);
		}
	});
	
	
}

function viewSmallCateList(smallCatePopupPageNum)
{
	var ctx = $("#ctx").val();
	var s_small_cate_name = $("#s_small_cate_name").val();
	
	$.ajax({
		url: ctx + "/smallCateListAjax", 
		type: "POST",  
		data: {
			main_cate_cd	  : main_cate_cd,
			mid_cate_cd		  : mid_cate_cd,
			s_small_cate_name : s_small_cate_name 
		},
		dataType: "json",
		success: function(data) { 
			
			$("#smallCateListTbody").empty();
			$("#s_small_cate_name").bind("keypress", function(event) {
				enterSearch(event);
			});
			
			if (data.smallCatePopupList.length == 0) {
				var trElement = $("#smallCateListTableHeader").clone().removeClass().empty();
				$("#smallCateListTbody").append(trElement);
				$("#smallCateListTbody tr:last").append("<td colspan='3' style='width:100%; height: 260px; cursor: default; background-color: white;' align='center'>검색 결과가 없습니다</td>");
			} else {
				console.log(data);
				$.each(data.smallCatePopupList, function(i) {
					var trElement = $("#smallCateListTableHeader").clone().removeClass().empty();
					var small_cate_cd = this.small_cate_cd;
					var small_cate_name = this.small_cate_name;
					var list_price = this.list_price;

					trElement.bind("click", function(e) {
						setTimeout($.unblockUI, 0);
						tmp.parent().children().eq(0).val(small_cate_cd);
						tmp.val(small_cate_name);
						tmp.parent().parent().children().eq(5).children().eq(0).val(list_price);		
						
						console.log(tmp.parent().parent().children().eq(4).val());	// qty
					});
					
					addMouseEvent(trElement);
					trElement.css("cursor", "pointer");
					
					$("#smallCateListTbody").append(trElement);
					$("#smallCateListTbody tr:last").append("<td width='60%'>" + small_cate_cd + "</td>"
							+ "<td width='30%'>" + small_cate_name + "</td>");
				});
			}
			
			// 페이징 그리기
			$("#smallCatePagingDiv").empty();
			var pageContent = "";
			
			if(data.page.endPageNum == 0 || data.page.endPageNum == 1){
				pageContent = "◀ <input type='text' id='catePageInput' readonly='readonly' value='1' style='width: 25px; text-align: center;'/> / 1 ▶";
			} else if(data.pageNum == data.page.startPageNum){
				pageContent = "<input type='hidden' id='catePageNum' value='"+data.pageNum+"'/><input type='hidden' id='cateEndPageNum' value='"+data.page.endPageNum+"'/>"
				+"◀ <input type='text' id='catePageInput' value='"+data.page.startPageNum+"' onkeypress=\"catePageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>" 
				+"<a onclick=\"viewSmallCateList("+data.page.endPageNum+");\" id='pNum' style='cursor: pointer;'> / "+data.page.endPageNum+"</a>"
				+"<a onclick=\"viewSmallCateList("+(data.pageNum+1)+");\" id='pNum' style='cursor: pointer;'> ▶ </a>";
				
			} else if(data.pageNum == data.page.endPageNum){
				pageContent = "<input type='hidden' id='catePageNum' value='"+data.pageNum+"'/><input type='hidden' id='cateEndPageNum' value='"+data.page.endPageNum+"'/>"
				+"<a onclick=\"viewSmallCateList("+(data.pageNum-1)+");\" id='pNum' style='cursor: pointer;'> ◀ </a>"
				+"<input type='text' id='catePageInput' value='"+data.page.endPageNum+"' onkeypress=\"catePageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>"
				+"<a> / "+data.page.endPageNum+"</a> ▶";
				
			} else {
				pageContent = "<input type='hidden' id='catePageNum' value='"+data.pageNum+"'/><input type='hidden' id='cateEndPageNum' value='"+data.page.endPageNum+"'/>"
				+"<a onclick=\"viewSmallCateList("+(data.pageNum-1)+");\" id='pNum' style='cursor: pointer;'> ◀ </a>"
				+"<input type='text' id='catePageInput' value='"+data.pageNum+"' onkeypress=\"catePageNumInputEnter(event);\" style='width: 25px; text-align: center;'/>"
				+"<a onclick=\"viewSmallCateList("+data.page.pageNum+");\" id='pNum' style='cursor: pointer;'> / "+data.page.endPageNum+"</a>"
				+"<a onclick=\"viewSmallCateList("+(data.pageNum+1)+");\" id='pNum' style='cursor: pointer;'> ▶ </a>";
			}
			$("#smallCatePagingDiv").append(pageContent);
			
		},
		beforeSend: function(){
        	viewLoadingShow();			
        },
        complete:function(){
        	viewLoadingHide();	
        },
		error: function(data) { 
			alert("소분류목록을 취득하지 못했습니다.");
			return false;
		}
	});
}

function totalPrice()
{
	var inputQty = selQty.val();
	var listPrice = selQty.parent().parent().children().eq(5).children().eq(0).val();
	var totalPrice = inputQty * listPrice;
	
	// total_price에 값 대입
	total = selQty.parent().parent().children().eq(6).children().eq(0).val(totalPrice);
	
//	console.log(selQty.parent().parent().children().eq(5).children().eq(0).val());	// list_price
//	console.log(selQty.parent().parent().children().eq(6).children().eq(0).val());	// total_price
	
}


function dcPrice()
{
	var offerPrice = selDC.parent().parent().children().eq(8).children().eq(0).val();
	var dcTotalPrice = 0;
	var reset = 0;
	
	totalPrice = parseInt(totalPrice);
	offerPrice = parseInt(offerPrice);
	reset = parseInt(reset);

	console.log(offerPrice);
	console.log(isNaN(offerPrice));
	if(isNaN(offerPrice))
	{
		offerPrice = 0;
	}
	
	if(totalPrice < offerPrice)
	{
		console.log(offerPrice);
		alert("총금액보다 제안금액이 큽니다.");
		return false;
	}
	if(totalPrice > offerPrice)
	{
		dcTotalPrice = totalPrice - offerPrice;
		
		if(dcTotalPrice > 0)
		{
			selDC.parent().parent().children().eq(7).children().eq(0).val(dcTotalPrice);
		}
		if(offerPrice == NaN || offerPrice == 0)
		{
			selDC.parent().parent().children().eq(7).children().eq(0).val(reset);
		}
	}
	
	
}

// 체크박스 전체 선택.
function actAllChk()
{
	var checkbox=$('#opptyItemTable tbody').find('input[type=checkbox]');
	
	if($('#optyItemChk').is(":checked")){
		$(checkbox).prop("checked", true);
	}else{
		$(checkbox).prop("checked", false);
	}
}


// 대/중/소분류 리스트 페이징 엔터 기능
function catePageNumInputEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var prodMenuPageNum = parseInt($("#catePageInput").val());
			if ($("#catePageInput").val() == '') {
				alert("페이지 번호를 입력하세요.")
				$("#catePageInput").val($("#catePageNum").val());
				$("#catePageInput").focus();
			} else if(prodMenuPageNum > parseInt($("#cateEndPageNum").val())) {
				alert("페이지 번호가 너무 큽니다.");
				$("#catePageInput").val($("#catePageNum").val());
				$("#catePageInput").focus();
			} else if (1 > prodMenuPageNum) {
				alert("페이지 번호가 너무 작습니다.");
				$("#catePageInput").val($("#catePageNum").val());
				$("#catePageInput").focus();
			} else {
//				viewProdMenuListForGiftBon(prodMenuPageNum, 2);
			}
		}
		event.stopPropagation();
	});
}


















