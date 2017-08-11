/**
 * 
 * opptyItemAdd()			:: 추가 테이블 생성(tr/td)
 * opptyItemInsert()		:: 매출상품 추가
 * opptyItemDelte()			:: 매출상품 삭제
 * 
 */

var ctx = $("#ctx").val();

$(document).ready(function(){
	$('#patment_day').datepicker();
	
	mainCatePopup();
	midCatePopup();
	smallCatePopup();
});

// 테이블 생성(Ajax)
function opptyItemAdd()
{
	var tbody = $('#oppty_item_list_tbody');
	var tbodyContent = "";
	
	// 새로 그려준다.
	tbody.append(
		"<tr class='oppty_item_list_tr'>"+
			"<td style='text-align: left;'>" +
				"<input type='hidden' class='main_cate_cd' name='main_cate_cd' value=''>" +
				"<input type='text' class='main_cate_name' name='main_cate_name' readonly='readonly'></td>"+
			"<td style='text-align: left;'>" +
				"<input type='hidden' class='mid_cate_cd' name='mid_cate_cd' value=''>" +
				"<input type='text' class='mid_cate_name' name='mid_cate_name' readonly='readonly'></td>"+
			"<td style='text-align: left;'>" +
				"<input type='hidden' class='small_cate_cd' name='small_cate_cd' value=''>" +
				"<input type='text' class='small_cate_name' name='small_cate_name' readonly='readonly'></td>"+
			"<td style='text-align: left;'><input type='text' class='qty' name='qty'></td>"+
			"<td style='text-align: left;'><input type='text' class='list_price' name='list_price'></td>"+
			"<td style='text-align: left;'><input type='text' class='total_price' name='total_price'></td>"+
			"<td style='text-align: left;'><input type='text' class='dc_price' name='dc_price'></td>"+
			"<td style='text-align: left;'><input type='text' class='offer_price' name='offer_price'></td>"+
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
		main_cat_cd.push($(this).children().children().eq(0).val());
		mid_cat_cd.push($(this).children().eq(1).children().eq(0).val());
		small_cat_cd.push($(this).children().eq(2).children().eq(0).val());
		qty.push($(this).children().eq(3).children().val());
		list_price.push($(this).children().eq(4).children().val());
		dc_price.push($(this).children().eq(6).children().val());
		payment_day.push($(this).children().eq(8).children().val());
		
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
		success:function(){
			tbody.children().remove();
			
			var size = data.optyItemList.length;
			
			
		},
		error:function(request){
			alert("error : " + request.status)
		}
	});
}

function opptyItemDelte()
{
	
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
		
		var tmp = $(this);	// 클릭 한 input 태그 위치 저장.

		viewMainCateList(tmp);
		
	});
	
}

function viewMainCateList(tmp)
{
	var ctx = $("#ctx").val();
	var s_main_cate_name = $("#s_main_cate_name").val();
	
	$.ajax({
		url: ctx + "/mainCateListAjax", 
		type: "POST",  
		data: { s_main_cate_name : s_main_cate_name },
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
		var tmp = $(this);
		var main_cate_cd = tmp.parent().parent().children().eq(0).children().eq(0).val();
		
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
			
			
			viewMidCateList(main_cate_cd, tmp);
		}
	});
	
	
}

function viewMidCateList(main_cate_cd, tmp)
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
		var tmp = $(this);
		var main_cate_cd = tmp.parent().parent().children().eq(0).children().eq(0).val();
		var mid_cate_cd = tmp.parent().parent().children().eq(1).children().eq(0).val();
		
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
			
			viewSmallCateList(main_cate_cd, mid_cate_cd, tmp);
		}
	});
	
	
}

function viewSmallCateList(main_cate_cd, mid_cate_cd, tmp)
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

					trElement.bind("click", function(e) {
						setTimeout($.unblockUI, 0);
						tmp.parent().children().eq(0).val(small_cate_cd);
						tmp.val(small_cate_name);
					});
					
					addMouseEvent(trElement);
					trElement.css("cursor", "pointer");
					
					$("#smallCateListTbody").append(trElement);
					$("#smallCateListTbody tr:last").append("<td width='60%'>" + small_cate_cd + "</td>"
							+ "<td width='30%'>" + small_cate_name + "</td>");
				});
			}
			
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























