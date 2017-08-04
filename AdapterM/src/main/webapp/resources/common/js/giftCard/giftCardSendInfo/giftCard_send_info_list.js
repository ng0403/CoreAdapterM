/**
업 무 명 : 기프트카드 발급내역 리스트화면
작 성 자 : 
작 성 일 : 
수 정 자 : 
수 정 일 : 
내 용 : 기프트카드 발급내역에 대한 javascript 코드이다.
참고사항 : 
*/

$(document).ready(function() {
	 
	var ctx = $("#ctx").val();
	$("#giftbon_list_add").click(function() {
		goGiftbonForm('','');
	});
	
});

// 기프트카드 관리 상세정보 가기
function goGiftCardSendForm(gift_wid) {
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
	    	 var gift_wid_input = $('<input type="hidden" value="'+gift_wid+'" name="gift_wid">');
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
function giftCard_send_sch(pageNum){
	
	var giftcard_wid = $("#giftCard_wid_srch").val();
	var giftcard_name = $("#giftCard_name_srch").val();
	var store_wid = $("#store_wid").val();
	
	if(giftcard_wid == '' && giftcard_name == '' && store_wid ==''){
		alert("입력 필드에 값을 입력해주세요");
		return false;
	}
	
	var ctx = $("#ctx").val();
	var sch_flg = $("#sch_flg").val('1');
	var page_input = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	$("#giftCardSendInfoListForm").append(page_input).append(sch_flg);
	viewLoadingShow();
	$("#giftCardSendInfoListForm").submit();
}

// 검색창 엔터키 기능
function GiftCardSendSchPageEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		
		if (keycode == '13') {
			var giftcard_wid = $("#giftCard_wid_srch").val();
			var giftcard_name = $("#giftCard_name_srch").val();
			var store_wid = $("#store_wid").val();
			
			if(giftcard_wid == '' && giftcard_name == '' && store_wid ==''){
				alert("입력 필드에 값을 입력해주세요");
				return false;
			} 
			else {
				giftCard_send_sch(1);
			}
		}
		event.stopPropagation();
	});
}

// 페이징 함수
function giftCardSendPaging(pageNum) {
	$(document).ready(function() {
		// 컨트롤러로 전송
		var ctx = $("#ctx").val();
		var giftbonListForm = $("#GCPagingForm");
	     
	    var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	 
	    giftbonListForm.append(pageNumInput);
	    viewLoadingShow();
	    giftbonListForm.submit();
	    
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
function GCSPageNumInputEnter(event) {
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
				giftCardSendPaging(pageNum);
			}
				
		}
		event.stopPropagation();
}

function giftcard_status_change(obj, key_wid){
	
	var ctx = $("#ctx").val();
	
	var param = {
			card_status : obj.value,
			key_wid : key_wid
	}
	
	if(!confirm("상태값을 수정 하시겠습니까?"))
		return;
	
	$.ajax({  
		url:  ctx+'/giftCardStatusChange',   
		type: "POST",
		data: param,
		success: function(data) {
        	if(data=="succ"){
        		alert("상태값이 변경되었습니다.");
        		return;
        	}else{
        		alert("상태값 변경에 실패하였습니다.1");
        	}
		},
		beforeSend: function(){
	        	viewLoadingShow();			
	        },
	        complete:function(){
	        	viewLoadingHide();	
	        },
		error: function(jqXHR, textStatus, errorThrown ) {
			alert( textStatus );
			alert( errorThrown );
			return false;
		}
	});		
	
}
