/**
업 무 명 : 고객 통합 정보 화면
작 성 자 : 정은지 (wjdmwi@coreplus.co.kr)
작 성 일 : 2015/09/24
수 정 자 : 정은지 (wjdmwi@coreplus.co.kr)
수 정 일 : 2015/09/24
내 용 : 고객 통합 정보에 대한 javascript 코드이다.
*참고사항 : 
*/

//고객 통합 정보 페이징
function CMPaging(pageNum) {
	$(document).ready(function() {
		var ctx = $("#ctx").val();
		var $form = $('#custManagerPagingForm');
	    
	    var pageNum_input = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');

	    $form.append(pageNum_input);
	    viewLoadingShow();
	    $form.submit();
	});
}

//고객 통합 정보 조회 버튼기능
function custManager_goSearch(){
	
	var cust_name = $("#cust_name").val();
	var id = $("#id").val();
	var cust_wid = $("#cust_wid").val();
	var hp = $("#hp").val();
	var reg_start_dt = $("#reg_start_dt").val();
	var reg_end_dt = $("#reg_end_dt").val();
	viewLoadingShow();
	$("#custManagerForm").submit();
		
}

//고객 통합 상세정보로 이동
function custManagerDetail(id) {
	$(document).ready(function() {
		var ctx = $("#ctx").val();

		//동적 폼생성 POST 전송 (상세정보 화면이동으로 작업)
		var $form = $('<form></form>');
	     $form.attr('action', ctx+'/customerManagerDetail');
	     $form.attr('method', 'post');
	     $form.appendTo('body');
	     
	     var id_input = $('<input type="hidden" value="'+id+'" name="id">');
	     
	     $form.append(id_input);
	     viewLoadingShow();
	     $form.submit();
	});
}

//페이지 엔터키 기능
function custManagerpageNumEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var pageNum = parseInt($("#pageInput").val());
			if ($("#pageInput").val() == '') {
				alert("페이지 번호를 입력하세요.")
				$("#pageInput").val($("#custManagerPageNum").val());
				$("#pageInput").focus();
			} else if(pageNum > parseInt($("#endPageNum").val())) {
				alert("페이지 번호가 너무 큽니다.");
				$("#pageInput").val($("#custManagerPageNum").val());
				$("#pageInput").focus();
			} else if (1 > pageNum) {
				alert("페이지 번호가 너무 작습니다.");
				$("#pageInput").val($("#custManagerPageNum").val());
				$("#pageInput").focus();
			} else {
				CMPaging(pageNum);
			}
		}
		event.stopPropagation();
	});
}

//검색 엔터키
function custEnterSearch(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			custManager_goSearch();
		}
	});
}

//고객 통합 정보 리스트로 이동 버튼
function go_custManager_list() {
	var ctx = $("#ctx").val();
	
	// 동적 폼생성 get 전송
	var $form = $('<form></form>');
	$form.attr('action', ctx+'/customerManager');
	$form.attr('method', 'post');
	$form.appendTo('body');
	viewLoadingShow();
	$form.submit();
}