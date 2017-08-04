/*
업 무 명 : vanCommissionList_list VAN수수료 확정내역 조회 리스트 화면
작 성 자 : 이민규 (starseeker@coreplus.co.kr)
작 성 일 : 2015/10/1
수 정 자 : 이민규 (starseeker@coreplus.co.kr)
수 정 일 : 2015/10/2
내 용 : VAN수수료 확정내역 조회 리스트를 보여준다.*/

// VAN수수료 확정내역 페이징
function vanCommissionPaging(pageNum) {
	var ctx = $("#ctx").val();
	var $form = $('#vanCommissionForm');
    
    var pageNum_input = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
    
    $form.append(pageNum_input);
    viewLoadingShow();
    $form.submit();
}

// VAN수수료 확정내역 조회
function vanCommission_goSearch(pageNum){
	var year = $("#cbo_year").val();
	var month = $("#cbo_month").val();
	var div_sch = $("#trns_pos_div").val();
	
	if(year == null || year == ""){
		alert("연도를 선택해주세요.");
		return false;
	}
	if(month == null || month == ""){
		alert("월을 선택해주세요.");
		return false;
	}

	if(div_sch == null || div_sch == ""){
		alert("VAN사를 선택해주세요.");
		return false;
	}
	viewLoadingShow();
	$("#vanCommissionForm").submit();
			
}

//페이지 엔터키 기능
function vanPageNumEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var pageNum = parseInt($("#pageInput").val());
			if ($("#pageInput").val() == '') {
				alert("페이지 번호를 입력하세요.")
				$("#pageInput").val($("#vanCommissionPageNum").val());
				$("#pageInput").focus();
			} else if(pageNum > parseInt($("#endPageNum").val())) {
				alert("페이지 번호가 너무 큽니다.");
				$("#pageInput").val($("#vanCommissionPageNum").val());
				$("#pageInput").focus();
			} else if (1 > pageNum) {
				alert("페이지 번호가 너무 작습니다.");
				$("#pageInput").val($("#vanCommissionPageNum").val());
				$("#pageInput").focus();
			} else {
				vanCommissionPaging(pageNum);
			}
		}
		event.stopPropagation();
	});
}