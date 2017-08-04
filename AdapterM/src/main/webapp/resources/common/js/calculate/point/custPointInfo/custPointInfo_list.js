/**
업 무 명 : 다수적립사용내역 조회 화면
작 성 자 : 오은경 (ekoh@coreplus.co.kr)
작 성 일 : 2015/09/30
수 정 자 : 오은경 (ekoh@coreplus.co.kr)
수 정 일 : 2015/09/30
내 용 : 다수적립사용내역 조회에 대한 javascript 코드이다.
*참고사항 : 
*/

//다수적립사용내역 검색 값 유지
$(document).ready(function() {
	var ctx = $('#ctx').val();
	
	$("#start_dt").datepicker();
	$("#end_dt").datepicker();
});

//다수적립사용내역 조회 버튼기능
function custPoint_goSearch() {
	
	var start_dt = $("#start_dt").val().split('-');
	var end_dt = $("#end_dt").val().split('-');

	var start_dt_arr = new Date(start_dt[0], start_dt[1], start_dt[2]);
	var end_dt_arr = new Date(end_dt[0], end_dt[1], end_dt[2]);
	var day_cnt = (end_dt_arr-start_dt_arr)/(24*3600*1000);
	
	if(start_dt == null || start_dt == ""){
		alert("시작 조회기간을 선택해주세요!");
		return false;
	}
	if(end_dt == null || end_dt == ""){
		alert("종료 조회기간을 선택해주세요!");
		return false;
	}
	
	if (start_dt > end_dt){
		alert("종료일이 시작일보다 이전입니다!");
		return false;
	}
	if ( day_cnt > 30 ){
		alert("최대 조회기간은 30일입니다!");
		return false;
	}
	 viewLoadingShow();	
	$("#custPointForm").submit();
}

//다수적립사용내역 조회 페이징
function CAPaging(pageNum) {
	$(document).ready(function() {
		var ctx = $("#ctx").val();
		var $form = $('#custPointInfoPagingForm');
		
	    var pageNum_input = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	    
	    $form.append(pageNum_input);
	    viewLoadingShow();
	    $form.submit();
			
	});
}

//페이지 엔터키 기능
function pageNumEnter(event) {
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
				CAPaging(pageNum);
			}
		}
		event.stopPropagation();
	});
}

