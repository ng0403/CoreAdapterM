/**
업 무 명 : 기프트카드 관리 리스트화면
작 성 자 : 
작 성 일 : 
수 정 자 : 
수 정 일 : 
내 용 : 기프트카드 관리에 대한 javascript 코드이다.
*참고사항 : 
 */

$(document).ready(function() {
	 
	var ctx = $("#ctx").val();
	
	$("#giftbon_list_add").click(function() {
		goGiftbonForm('','');
	});
	
});

// 기프트카드 관리 상세정보 가기
function goGiftCardMangerForm(giftcard_wid) {
	$(document).ready(function() {
		var ctx = $("#ctx").val();
		// 동적 폼생성 POST 전송
		var $form = $('<form></form>');
	     $form.attr('action', ctx+'/giftCardForm');
	     $form.attr('method', 'post');
	     $form.attr('enctype', 'multipart/form-data');
	     $form.appendTo('body');
	     // 상세정보일때
	     if(gift_wid != ''){
	    	 var gift_wid_input = $('<input type="hidden" value="'+giftcard_wid+'" name="giftcard_wid">');
	    	 var giftAddMdfyFlag_input = $('<input type="hidden" value="3" name="giftAddMdfyFlag">');
	    	 var file_input = $('<input type="file" id="file" name="file" style="display:none;">');
	    	 
	    	 $form.append(gift_wid_input);
		     $form.append(giftAddMdfyFlag_input);
		     $form.append(file_input);
		     viewLoadingShow();
		     $form.submit();
	     }
	     // 추가버튼일때
	     var giftAddMdfyFlag_input = $('<input type="hidden" value="0" name="giftAddMdfyFlag">');
	     var file_input = $('<input type="file" id="file" name="file" style="display:none;">');
	     
	     $form.append(giftAddMdfyFlag_input);
	     $form.append(file_input);
	     viewLoadingShow();
	     $form.submit();
	});
}

// 조회 버튼 기능
function giftcard_manager_sch(pageNum){
	
	var giftcard_wid = $("#giftCard_wid_srch").val();
	var giftcard_name = $("#giftCard_name_srch").val();
	
	if(giftcard_wid == '' && giftcard_name == ''){
		alert("입력 필드에 값을 입력해주세요");
		return false;
	}
	
	var ctx = $("#ctx").val();
	var sch_flg = $("#sch_flg").val('1');
	var page_input = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	$("#giftCardListForm").append(page_input).append(sch_flg);
	viewLoadingShow();
	$("#giftCardListForm").submit();
}

// 검색창 엔터키 기능
function GiftCardManagerSchPageEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		
		if (keycode == '13') {
			var giftcard_wid = $("#giftCard_wid_srch").val();
			var giftcard_name = $("#giftCard_name_srch").val();
			
			if(giftcard_wid == '' && giftcard_name == ''){
				alert("입력 필드에 값을 입력해주세요");
				return false;
			} 
			else {
				giftcard_manager_sch(1);
			}
		}
		event.stopPropagation();
	});
}

// 페이징 함수
function giftCardManagerPaging(pageNum) {
	$(document).ready(function() {
		// 컨트롤러로 전송
		var ctx = $("#ctx").val();
		var giftcardListForm = $("#GBPagingForm");
	     
	    var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	 
	    giftcardListForm.append(pageNumInput);
	    viewLoadingShow();
	    giftcardListForm.submit();
	    
	});
}

//숫자만 입력
function ONumber() {
	var code = window.event.keyCode;
	if ((code > 34 && code < 41) || (code > 47 && code < 58)
			|| (code > 95 && code < 106) || code == 8 || code == 9
			|| code == 13 || code == 46) {
		window.event.returnValue = true;
		return;
	}
	window.event.returnValue = false;
}

// 페이지 엔터키 기능
function GCMPageNumInputEnter(event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		var pageNum = parseInt($("#pageInput").val());
		if (keycode == '13') {
			if ($("#pageInput").val() == '') {
				alert("페이지 번호를 입력하세요.")
				$("#pageInput").val($("#pageNum").val());
				$("#pageInput").focus();
			} else if(pageNum > parseInt($("#endPageNum").val())) {
				alert("페이지 번호가 너무 큽니다.");
				$("#pageInput").val($("#pageNum").val());
				$("#pageInput").focus();
			} else if (1 > pageNum) {
				alert("페이지 번호가 너무 작습니다.");
				$("#pageInput").val($("#pageNum").val());
				$("#pageInput").focus();
			}  else {
				giftPaging(pageNum);
			}
				
		}
		event.stopPropagation();
}

function giftCard_list_modify(){
	
	var giftcard_wid = $('#giftCard_list_tbl tbody tr').children().eq(0).text();
	var giftcard_name = $('#giftCard_list_tbl tbody tr').children().eq(1).text();
	var giftcard_charge_unit = $('#giftCard_list_tbl tbody tr').children().eq(2).text();
	var giftcard_charge_min = $('#giftCard_list_tbl tbody tr').children().eq(3).text();
	var giftcard_charge_max = $('#giftCard_list_tbl tbody tr').children().eq(4).text();
	var giftcard_sum_max = $('#giftCard_list_tbl tbody tr').children().eq(5).text();
	var remain_year = $('#giftCard_list_tbl tbody tr').children().eq(6).text();
	var created = $('#giftCard_list_tbl tbody tr').children().eq(7).text();
	
	$('#giftCard_list_tbl tbody tr').empty();
	
	var data = "<tr><td>"+giftcard_wid.trim()+ "</td><td><input type='text' value='"+giftcard_name.trim()+ "'></td><td><input type='text' value='"+giftcard_charge_unit.trim().split(",").join("").split("원").join("")+ "'></td><td><input type='text' value='"+giftcard_charge_min.trim().split(",").join("").split("원").join("")+ "'></td><td><input type='text' value='"+giftcard_charge_max.trim().split(",").join("").split("원").join("")+ "'></td><td><input type='text' value='"+giftcard_sum_max.trim().split(",").join("").split("원").join("")+ "'></td><td><input type='text' value='"+remain_year.trim().split("년").join("")+ "'></td><td>"+created.trim()+"</td></tr>";
	
	$('#giftCard_list_tbl tbody').append(data);
	
	$('#giftCard_list_add').css("display", "block");
	$('#giftCard_list_modify').css("display", "none");
	
}

function giftCard_list_add(){
	
	var ctx = $("#ctx").val();
	
	var giftcard_wid = $('#giftCard_list_tbl tbody tr').children().eq(0).text();
	var giftcard_name = $('#giftCard_list_tbl tbody tr').children().eq(1).find("input").val();
	var giftcard_charge_unit = $('#giftCard_list_tbl tbody tr').children().eq(2).find("input").val();
	var giftcard_charge_min = $('#giftCard_list_tbl tbody tr').children().eq(3).find("input").val();
	var giftcard_charge_max = $('#giftCard_list_tbl tbody tr').children().eq(4).find("input").val();
	var giftcard_sum_max = $('#giftCard_list_tbl tbody tr').children().eq(5).find("input").val();
	var remain_year = $('#giftCard_list_tbl tbody tr').children().eq(6).find("input").val();
	var created = $('#giftCard_list_tbl tbody tr').children().eq(7).text();
	
	var data = "giftcard_wid="+giftcard_wid+"&giftcard_name=" +giftcard_name+"&save_unit_div="+giftcard_charge_unit+"&save_min_limit="+giftcard_charge_min+"&save_max_limit="+giftcard_charge_max+"&save_sum_limit="+giftcard_sum_max+"&exp_end_year="+remain_year;
	 
	$.ajax({
		//cache: false,	//cache 메모리 미사용(true일경우 사용자 DB조회하지 않고 Cache에서만 데이터를 가져옴)
		type: "POST",  
		url: ctx+"/giftCardForm",   
		data: data,
		dataType : "text",
		success: function(data) {
			
			if(data == "succ"){
				alert("성공!");
				location.href=ctx+"/giftCardManager";
				
			}else{
				alert("오류가 발생했습니다.");
			}
			
		},
		beforeSend: function(){
        	viewLoadingShow();			
        },
        complete:function(){
        	viewLoadingHide();	
        },
		error: function(data) { 
			alert("오류가 발생했습니다.");
			return false;
		}	
	});
	
}
