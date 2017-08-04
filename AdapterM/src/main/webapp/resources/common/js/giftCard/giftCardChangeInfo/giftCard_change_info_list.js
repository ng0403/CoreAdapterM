/**
업 무 명 : 기프트카드 교체이력 리스트화면
작 성 자 : 
작 성 일 : 
수 정 자 : 
수 정 일 : 
내 용 : 기프트카드 교체이력에 대한 javascript 코드이다.
참고사항 : 
*/

//소멸예정금액 검색 값 유지
$(document).ready(function() {
	var ctx = $('#ctx').val();
	
	$("#change_start_dt").datepicker();
	$("#change_end_dt").datepicker();
});

//기프트카드 관리 상세정보 가기
function goGiftCardChangeForm(gift_wid) {
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
function giftCard_change_sch(pageNum){
	
	var giftcard_wid = $("#giftCard_wid_srch").val();
	var start_dt = $("#start_dt").val();
	var end_dt = $("#end_dt").val();
	var card_change_status = $("#card_change_status").val();
	var change_start_dt = $("#change_start_dt").val();
	var change_end_dt = $("#change_end_dt").val();
	
	if(giftcard_wid == '' && start_dt == '' && end_dt =='' && change_start_dt == '' && change_end_dt == '' && card_change_status == ''){
		
		alert("입력 필드에 값을 입력해주세요");
		return false;
	}
	
	if(start_dt != ''){
		if(end_dt == ''){
			alert("종료일자를 입력해주세요");
			return false;
		}
	}
	
	if(end_dt != ''){
		if(start_dt == ''){
			alert("시작일자를 입력해주세요");
			return false;
		}
	}
	
	if(change_start_dt != ''){
		if(change_end_dt == ''){
			alert("종료일자를 입력해주세요");
			return false;
		}
	}
	
	if(change_end_dt != ''){
		if(change_start_dt == ''){
			alert("시작일자를 입력해주세요");
			return false;
		}
	}
	
	var ctx = $("#ctx").val();
	var sch_flg = $("#sch_flg").val('1');
	var page_input = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	$("#giftCardChangeListForm").append(page_input).append(sch_flg);
	viewLoadingShow();
	$("#giftCardChangeListForm").submit();
}

// 검색창 엔터키 기능
function GiftCardChangeSchPageEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		
		if (keycode == '13') {
			
			var giftcard_wid = $("#giftCard_wid_srch").val();
			var start_dt = $("#start_dt").val();
			var end_dt = $("#end_dt").val();
			var card_change_status = $("#card_change_status").val();
			var change_start_dt = $("#change_start_dt").val();
			var change_end_dt = $("#change_end_dt").val();
			
			if(giftcard_wid == '' && start_dt == '' && end_dt =='' && change_start_dt == '' && change_end_dt == '' && card_change_status == ''){
				alert("입력 필드에 값을 입력해주세요");
				return false;
			} 
			else {
				
				if(start_dt != ''){
					if(end_dt == ''){
						alert("종료일자를 입력해주세요");
						return false;
					}
				}
				
				if(end_dt != ''){
					if(start_dt == ''){
						alert("시작일자를 입력해주세요");
						return false;
					}
				}
				
				if(change_start_dt != ''){
					if(change_end_dt == ''){
						alert("종료일자를 입력해주세요");
						return false;
					}
				}
				
				if(change_end_dt != ''){
					if(change_start_dt == ''){
						alert("시작일자를 입력해주세요");
						return false;
					}
				}
				
				giftCard_change_sch(1);
			}
		}
		event.stopPropagation();
	});
}

// 페이징 함수
function giftCardChangePaging(pageNum) {
	$(document).ready(function() {
		// 컨트롤러로 전송
		var ctx = $("#ctx").val();
		var giftcardChangeListForm = $("#GCPagingForm");
	     
	    var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	 
	    giftcardChangeListForm.append(pageNumInput);
	    viewLoadingShow();
	    giftcardChangeListForm.submit();
	    
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
function GCCPageNumInputEnter(event) {
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
				giftCardChangePaging(pageNum);
			}
				
		}
		event.stopPropagation();
}


