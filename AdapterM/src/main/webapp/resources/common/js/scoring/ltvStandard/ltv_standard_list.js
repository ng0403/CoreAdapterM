/**
업 무 명 : LTV 기준 리스트
작 성 자 : 김기현(comeanding@coreplus.co.kr)
작 성 일 : 2016/03/16
수 정 자 : 김기현(comeanding@coreplus.co.kr)
수 정 일 : 2016/03/16
내 용 : LTV 기준 리스트
*참고사항 : 
 */

$(document).ready(function() {
	$("#ltv_std_list_add").click(function() {
		goltvStdForm('','');
	});
});

//조회 버튼 기능
function ltv_std_list_sch(pageNum) {
	var ctx = $("#ctx").val();
	var sch_flg = $("#sch_flg").val('1');
	var page_input = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	$("#f_ltvStdList").append(page_input).append(sch_flg);
	viewLoadingShow();
	$("#f_ltvStdList").submit();
}

//조회 엔터키
function ltvStdEnterSearch(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var ltv_work_dt = $("#ltv_work_dt_sch").val();
			if(ltv_work_dt == ''){
				alert("작업일자를 선택해주세요.");
				return false;
			} else {
				ltv_std_list_sch(1);
			}
		}
		event.stopPropagation();
	});
}

//페이징 함수
function ltvStdPaging(pageNum) {
	$(document).ready(function() {
		// 컨트롤러로 전송
		var ctx = $("#ctx").val();
		var f_ltvStdList = $("#f_ltvStdList");
	     
	    var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	 
	    f_ltvStdList.append(pageNumInput);
	    viewLoadingShow();
	    f_ltvStdList.submit();
	});
}
 
//페이징 엔터키
function ltvPageNumInputEnter(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == '13') {
		var pageNum = parseInt($("#pageInput").val());
		if ($("#pageInput").val() == '') {
			alert("페이지 번호를 입력하세요.")
			$("#pageInput").focus();
		} else if(parseInt($("#pageInput").val()) > parseInt($("#endPageNum").val())) {
			alert("페이지 번호가 너무 큽니다.");
			$("#pageInput").val($("#pageNum").val());
			$("#pageInput").focus();
		} else {
			var ctx = $("#ctx").val();
			var $form = $('#f_ltvStdList');
			var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
			$form.append(pageNumInput);
			viewLoadingShow();
			$form.submit();
		}
	}
	event.stopPropagation();
}

//쿠폰관리 상세정보 가기
function goltvStdForm(ltv_std_key) {
	$(document).ready(function() {
		var ctx = $("#ctx").val();
		
		// 동적 폼생성 POST 전송
		var $form = $('<form></form>');
	     $form.attr('action', ctx+'/ltvStdForm');
	     $form.attr('method', 'post');
	     $form.appendTo('body');
	     
	     // 상세정보일때
	     if(ltv_std_key != ''){
	    	 var ltv_std_key_input = $('<input type="hidden" value="'+ltv_std_key+'" name="ltv_std_key">');
	    	 $form.append(ltv_std_key_input);
	     }
	     
	     // 추가버튼일때
	     var ltvAddMdfyFlag_input = $('<input type="hidden" value="0" name="ltvAddMdfyFlag">');
	     $form.append(ltvAddMdfyFlag_input);
	     viewLoadingShow();
	     $form.submit();
	});
}
