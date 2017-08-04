function goMcsSearch(){
	
	//선택된 값 유지시켜주는 부분
	var date = $("#cond_dt").val();
	var cbo_year = $("#cbo_year").val();
	var cbo_month = $("#cbo_month").val();
	var brand_wid = $("#brand_wid").val();
	var store_wid = $("#store_wid").val();
	var store_name = $("#store_name").val();
	var cnt = 0;

	$("#cbo_year").val($("#cbo_year").children('option:selected').val());
	$("#cbo_month").val($("#cbo_month").children('option:selected').val());
	$("#brand_wid").val($("#brand_wid").val());
	$("#cond_dt").val($("#cbo_year").children('option:selected').val()+$("#cbo_month").children('option:selected').val());
	//Validation 체크
	if(brand_wid == null || brand_wid == ''){
		alert("브랜드를 선택해 주세요!");
		cnt++;
	}
	
	if(cnt == 0) {
		var cond_dt = $("#cond_dt").val();
		var monthCalculateStoreListform = $("#monthCalculateStoreListform");
		viewLoadingShow();
	    monthCalculateStoreListform.submit();
	}
}

//페이징 함수
function mcsPaging(pageNum) {
	$(document).ready(function() {
		// 컨트롤러로 전송
		var ctx = $("#ctx").val();
		// 동적 폼생성 POST 전송
	    var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	 
	    var monthCalculateStoreListform = $("#MCSForm");
	    monthCalculateStoreListform.append(pageNumInput);
	    viewLoadingShow();
	    monthCalculateStoreListform.submit();
	});
}

//가맹점 리스트 엔터키 기능
function mcsPageNumInputEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var mcsPageNum = parseInt($("#pageInput").val());
			if ($("#pageInput").val() == '') {
				alert("페이지 번호를 입력하세요.")
				$("#pageInput").val($("#pageNum").val());
				$("#pageInput").focus();
			} else if(mcsPageNum > parseInt($("#endPageNum").val())) {
				alert("페이지 번호가 너무 큽니다.");
				$("#pageInput").val($("#pageNum").val());
				$("#pageInput").focus();
			} else if (1 > mcsPageNum) {
				alert("페이지 번호가 너무 작습니다.");
				$("#pageInput").val($("#pageNum").val());
				$("#pageInput").focus();
			} else {
				mcsPaging(mcsPageNum);
			}
		}
		event.stopPropagation();
	});
}