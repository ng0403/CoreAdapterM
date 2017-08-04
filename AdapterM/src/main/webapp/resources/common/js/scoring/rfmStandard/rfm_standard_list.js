/**
업 무 명 : RFM 기준 리스트
작 성 자 : 민지민(minjm93@coreplus.co.kr)
작 성 일 : 2015/10/26
수 정 자 : 민지민(minjm93@coreplus.co.kr)
수 정 일 : 2015/10/26
내 용 : RFM 기준 리스트
*참고사항 : 
 */

$(document).ready(function() {
	$("#rfm_std_list_add").click(function() {
		goRfmStdForm('','');
	});
});

//조회 버튼 기능
function rfm_std_list_sch(pageNum) {
	var ctx = $("#ctx").val();
	var sch_flg = $("#sch_flg").val('1');
	var page_input = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	$("#f_rfmStdList").append(page_input).append(sch_flg);
	viewLoadingShow();
	$("#f_rfmStdList").submit();
}

//조회 엔터키
function rfmStdEnterSearch(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var rfm_work_dt = $("#rfm_work_dt_sch").val();
			if(rfm_work_dt == ''){
				alert("작업일자를 선택해주세요.");
				return false;
			} else {
				rfm_std_list_sch(1);
			}
		}
		event.stopPropagation();
	});
}

//페이징 함수
function rfmStdPaging(pageNum) {
	$(document).ready(function() {
		// 컨트롤러로 전송
		var ctx = $("#ctx").val();
		var f_rfmStdList = $("#f_rfmStdList");
	     
	    var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	 
	    f_rfmStdList.append(pageNumInput);
	    viewLoadingShow();
	    f_rfmStdList.submit();
	});
}
 
//페이징 엔터키
function rfmPageNumInputEnter(event) {
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
			var $form = $('#f_rfmStdList');
			var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
			$form.append(pageNumInput);
			viewLoadingShow();
			$form.submit();
		}
	}
	event.stopPropagation();
}

//쿠폰관리 상세정보 가기
function goRfmStdForm(rfm_std_key) {
	$(document).ready(function() {
		var ctx = $("#ctx").val();
		
		// 동적 폼생성 POST 전송
		var $form = $('<form></form>');
	     $form.attr('action', ctx+'/rfmStdForm');
	     $form.attr('method', 'post');
	     $form.appendTo('body');
	     
	     // 상세정보일때
	     if(rfm_std_key != ''){
	    	 var rfm_std_key_input = $('<input type="hidden" value="'+rfm_std_key+'" name="rfm_std_key">');
	    	 $form.append(rfm_std_key_input);
	     }
	     
	     // 추가버튼일때
	     var rfmAddMdfyFlag_input = $('<input type="hidden" value="0" name="rfmAddMdfyFlag">');
	     $form.append(rfmAddMdfyFlag_input);
	     viewLoadingShow();
	     $form.submit();
	});
}
