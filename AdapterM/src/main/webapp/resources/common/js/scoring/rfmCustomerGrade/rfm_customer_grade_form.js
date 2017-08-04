/**
업 무 명 : RFM 고객 등급 상세
작 성 자 : 정은지
작 성 일 : 2015/10/26
수 정 자 : 정은지
수 정 일 : 2015/10/26
내 용 : RFM 고객 등급 상세
*참고사항 : 
 */

//RFM 고객 등급 관리 리스트로 이동 버튼
function go_rfmCustGradeList() {
	var ctx = $("#ctx").val();
	
	// 동적 폼생성 get 전송
	var $form = $("#rfmCustomerGradeFormPagingForm");
	$form.attr('action', ctx+'/rfmCustomerGrade');
	$form.attr('method', 'post');
	$form.appendTo('body');
	viewLoadingShow();
	$form.submit();
}

//RFM 고객 등급 관리 상세정보로 이동 버튼
function go_rfmCustGradeDetail() {
	var ctx = $("#ctx").val();
	var rfm_sctn_cd = $("#rfm_sctn_cd").val();
    var rfm_sctn_cd_val = $("#rfm_sctn_cd_val").val();
    
    rfmCustGradeForm(rfm_sctn_cd, rfm_sctn_cd_val);
}

//RFM 고객 등급 관리 상세정보 검색 버튼기능
function rfmCustGradeDetail_search(){
	var id = $("#id").val();
	var cust_name = $("#cust_name").val();
	var rfm_ctgr_score = $("#rfm_ctgr_score").val();
	var code_wid = $('#code_wid').val();
	viewLoadingShow();
	$("#rfmCustDetailForm").submit();
}

//RFM 고객 등급 관리 상세정보 검색 엔터키
function rfmCustGradeEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			rfmCustGradeDetail_search();
		}
	});
}

//RFM 고객 등급 관리 상세정보 페이징
function rfmCGPagePaging(pageNum) {
	$(document).ready(function() {
		var ctx = $("#ctx").val();
		var $form = $('#rfmCustomerGradeFormPagingForm');
	    
	    var pageNum_input = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	    
	    $form.append(pageNum_input);
	    viewLoadingShow();
	    $form.submit();
	});
}

//RFM 고객 등급 관리 상세정보 페이지 엔터키 기능
function rfmCGpageNumEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var pageNum = parseInt($("#pageInput").val());
			if (pageNum == '') {
				alert("페이지 번호를 입력하세요.")
				$("#pageInput").focus();
			} else if(pageNum > parseInt($("#endPageNum").val())) {
				alert("페이지 번호가 너무 큽니다.");
				$("#pageInput").val($("#rfmCGPageNum").val());
				$("#pageInput").focus();
			} else {
				rfmCGPagePaging(pageNum);
			}
		}
		event.stopPropagation();
	});
}

//RFM 분류 검색 자리수 체크
function checkNum(){
	if($("#rfm_ctgr_score").val() != null && $("#rfm_ctgr_score").val() != ""){
	    if($("#rfm_ctgr_score").val().length < 3){
	    	alert("3개의 숫자만 입력가능합니다.");
	    	text.focus();
	    	return false;
	    } 
	    if($("#rfm_ctgr_score").val().length > 3){
	    	alert("3개의 숫자만 입력가능합니다.");
	    	text.focus();
	    	return false;
	    }
	} else if($("#rfm_ctgr_score").val() == null && $("#rfm_ctgr_score").val() == ""){
		rfmCustGradeDetail_search();
	}
}