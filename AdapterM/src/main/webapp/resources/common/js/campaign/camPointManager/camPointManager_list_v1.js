/**
업 무 명 : 오퍼 조회
작 성 자 : 유대열
작 성 일 : 2016/05/18
수 정 자 : 유대열
수 정 일 : 2016/05/18
내 용 : 오퍼 내용을 조회한다.
*참고사항 : 
 */

$(document).ready(function() {
	var ctx = $("#ctx").val(); 
	$("#trns_start_dt").datepicker();
	$("#trns_end_dt").datepicker();	
	camPointManager_list_srch();
});



//조회 버튼 기능
function camPointManager_list_srch(){
	$(document).ready(function() {
		$("#camPointManager_list_srch").click(function (){
			var page_input = $('<input type="hidden" value="1" name="pageNum">');
			$("#camPointManagerListForm").append(page_input);
			viewLoadingShow();
			$("#camPointManagerListForm").submit();
		});
	});
}

//검색창 엔터키 기능
function camPointSchPageEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		
		if (keycode == '13') {
			var page_input = $('<input type="hidden" value="1" name="pageNum">');
			$("#camPointManagerListForm").append(page_input);
			viewLoadingShow();
			$("#camPointManagerListForm").submit();
		}
		event.stopPropagation();
	});
}

//페이징 함수
function camPointPaging(pageNum) {
	$(document).ready(function() {
		// 컨트롤러로 전송
		var ctx = $("#ctx").val();
		var camPointManagerListForm = $("#CPPagingForm");
	     
	    var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	 
	    camPointManagerListForm.append(pageNumInput);
	    viewLoadingShow();
	    camPointManagerListForm.submit();
	    
	});
}

//페이지 엔터키 기능
function CPPageNumInputEnter(event) {
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
				camPointPaging(pageNum);
			}
				
		}
		event.stopPropagation();
}
	