/**
업 무 명 : 오퍼 조회
작 성 자 : 유대열
작 성 일 : 2016/05/18
수 정 자 : 공재원
수 정 일 : 2017/05/24
내 용 : 오퍼 내용을 조회한다.
*참고사항 : 
 */
$(document).ready(function() {
	var ctx = $("#ctx").val();
	
	$("#offer_aply_start_dt").datepicker();
	$("#offer_aply_end_dt").datepicker();
		
});

/*// 오퍼 상세정보
function offerDetail(offerId) {
	var ctx = $("#ctx").val();
	var $form = $('<form></form>');
     $form.attr('action', ctx + "/offerDetail");
     $form.attr('method', 'post');
     $form.appendTo('body');
     
     if(offerId != ''){
    	 var offerId = $('<input type="hidden" value="'+offerId+'" name="offer_id">');
    	 $form.append(offerId);
     } else {
    	 var formFlagInput = $('<input type="hidden" value="1" name="form_flag">');
    	 $form.append(formFlagInput);
     }
     viewLoadingShow();
     $form.submit();
}*/
		

//조회 버튼 기능
function offerManager_list_src(pageNum){
	var offer_aply_start_dt = $('#offer_aply_start_dt').val();
	var offer_aply_end_dt = $('#offer_aply_end_dt').val();
	if(offer_aply_start_dt=="" ||offer_aply_start_dt==null){
		offer_aply_start_dt="1000/01/01";
	}
	if(offer_aply_end_dt=="" ||offer_aply_end_dt==null){
		offer_aply_end_dt="9999/12/31";
	}
	if(offer_aply_start_dt>offer_aply_end_dt){
		alert("시작일이 종료일보다 큽니다.다시 입력해 주세요.");
		return false;
	}
	var page_input = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	$("#offerManagerListForm").append(page_input);
	viewLoadingShow();
	$("#offerManagerListForm").submit();
}

//검색창 엔터키 기능
function offerManagerSchPageEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		
		if (keycode == '13') {
			offerManager_list_src(1);
		}
		event.stopPropagation();
	});
}

//페이징 함수
function offerManagerPaging(pageNum) {
	$(document).ready(function() {
		// 컨트롤러로 전송
		var ctx = $("#ctx").val();
		var offerManagerListForm = $("#OMPagingForm");
	     
	    var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	 
	    offerManagerListForm.append(pageNumInput);
	    viewLoadingShow();
	    offerManagerListForm.submit();
	});
}

//페이지 엔터키 기능
function OMPageNumInputEnter(event) {
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
				offerManagerPaging(pageNum);
			}
				
		}
		event.stopPropagation();
}
	