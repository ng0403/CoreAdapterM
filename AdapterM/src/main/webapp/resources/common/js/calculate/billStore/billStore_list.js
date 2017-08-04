/**
업 무 명 : 미수금조회 리스트화면
작 성 자 : 이상민 (tkdals8401@coreplus.co.kr)
작 성 일 : 2015/09/24
수 정 자 : 이상민 (tkdals8401@coreplus.co.kr)
수 정 일 : 2015/09/24
내 용 : 미수금조회에 대한 javascript 코드이다.
*참고사항 : 
 */

//미수금조회 페이징
function bsPaging(pageNum) {
	$(document).ready(function() {
		var ctx = $("#ctx").val();
		var sch_flg = $("#sch_flg").val(1);
	    var pageNum_input = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	    $("#billPagingForm").append(pageNum_input).append(sch_flg);
	    viewLoadingShow();
	    $("#billPagingForm").submit();
	});
}

//페이지 엔터키 기능
function billNumInputEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var pageNum = parseInt($("#pageInput").val());
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
			} else {
				bsPaging(pageNum);
			}
		}
		event.stopPropagation();
	});
}

// 조회버튼
function billSearch(){
	var cbo_year = $("#cbo_year").val();
	var cbo_month = $("#cbo_month").val();
	var sch_flg = $("#sch_flg").val(1);
	
	if((cbo_year == 0 || cbo_month == 0)){
		alert("등록년월을 입력해주세요");
	}
	else{
		var std_ym = $("#cbo_year").val()+$("#cbo_month").val();
		$("#std_ym").val(std_ym);
		$("#bs_form").append(sch_flg);
		viewLoadingShow();
		$("#bs_form").submit();
	}
}