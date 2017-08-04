/**
업 무 명 : 채번관리 리스트화면
작 성 자 : 이상민 (tkdals8401@coreplus.co.kr)
작 성 일 : 2015/09/15
수 정 자 : 이상민 (tkdals8401@coreplus.co.kr)
수 정 일 : 2015/09/15
내 용 : 채번관리에 대한 javascript 코드이다.
*참고사항 : 
 */

$(document).ready(function() {
	 
	var ctx = $("#ctx").val();
	
	$("#numManager_list_add").click(function() {
		location.href = ctx+'/numIssue';
	});
	
});

//채번관리 페이징
function nmPaging(pageNum) {
	$(document).ready(function() {
		var ctx = $("#ctx").val();
	    var pageNum_input = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	    $("#numManagerPagingForm").append(pageNum_input);
	    viewLoadingShow();
	    $("#numManagerPagingForm").submit();
	});
}

//페이지 엔터키 기능
function NumInputEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var pageNum = parseInt($("#pageInput").val());
			if ($("#pageInput").val() == '') {
				alert("페이지 번호를 입력하세요.")
				$("#pageInput").val($("#numManagerPageNum").val());
				$("#pageInput").focus();
			} else if(pageNum > parseInt($("#endPageNum").val())) {
				alert("페이지 번호가 너무 큽니다.");
				$("#pageInput").val($("#numManagerPageNum").val());
				$("#pageInput").focus();
			} else if (1 > pageNum) {
				alert("페이지 번호가 너무 작습니다.");
				$("#pageInput").val($("#numManagerPageNum").val());
				$("#pageInput").focus();
			} else {
				nmPaging(pageNum);
			}
		}
		event.stopPropagation();
	});
}

// 번호 조회 페이지로 이동
function numInquiry(key, type, created){
	var ctx = $("#ctx").val();
	var sch_flg = 1;
	var start_dt = created; // 시작일자
	var end_dt = created; // 종료일자
	// 동적 폼생성 POST 전송
	var $form = $('<form></form>');
    $form.attr('action', ctx+'/numInquiry');
    $form.attr('method', 'post');
    $form.appendTo('body');
    var sch_flg_input = $('<input type="hidden" value="'+sch_flg+'" name="sch_flg">');
    var start_dt_input = $('<input type="hidden" value="'+start_dt+'" name="expired_start_dt_srch">');
    var end_dt_input = $('<input type="hidden" value="'+end_dt+'" name="expired_end_dt_srch">');
    var type_input = $('<input type="hidden" value="'+type+'" name="category_type_div_srch">');
    var key_input = $('<input type="hidden" value="'+key+'" name="card_reg_wid_srch">');
    $form.append(start_dt_input).append(end_dt_input).append(type_input).append(key_input);
    $form.append(sch_flg_input);
    viewLoadingShow();
    $form.submit();
}

// 조회버튼
function numSearch(){
	var start_dt = $("#expired_start_dt_srch").val();
	var end_dt = $("#expired_end_dt_srch").val();
	var type = $("#category_type_div_srch").val();
	var key = $("#key_wid_srch").val();
	var amt = $("#amt_srch").val();
	var sch_flg = $("#sch_flg").val(1);
	
	if((start_dt == null || start_dt == '' || end_dt == null || end_dt == '') && type == 0 && (key == null
			|| key == '') && (amt == null || amt == '')){
		alert("검색어를 입력해주세요");
	}
	else{
		$("#nm_form").append(sch_flg);
		viewLoadingShow();
		$("#nm_form").submit();
	}
}