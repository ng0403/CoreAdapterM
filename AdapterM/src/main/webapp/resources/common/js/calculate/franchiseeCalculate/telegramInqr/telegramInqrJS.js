// 전문 조건조회
function goTeleSearch() {
	// 날짜 Validation 체크
	var start_date = $("#start_date").val();
	var st_year = $("#start_date").val().substr(0,4);
	var st_month = $("#start_date").val().substr(5,2);	
    var st_day = $("#start_date").val().substr(8,2);
    var st_date = new Date(st_year, st_month, st_day);
    var temp_end = new Date(Date.parse(st_date) + 180 * 1000 * 60 * 60 * 24);
	var end_date = $("#end_date").val();
	var ed_year = $("#end_date").val().substr(0,4);
    var ed_month = $("#end_date").val().substr(5,2);
    var ed_day = $("#end_date").val().substr(8,2);
    var ed_date = new Date(ed_year, ed_month, ed_day);
    var temp_start = new Date(Date.parse(ed_date) - 180 * 1000 * 60 * 60 * 24);
	var brand_wid = $("#brand_wid").val();
	var store_wid = $("#store_wid").val();
	var store_name = $("#store_name").val();

	if(brand_wid == null || brand_wid == ''){
		alert("브랜드를 선택해 주세요!");
		return;
	}else if(store_wid == null || store_wid == "" && brand_wid != "0000")
	{
		alert("가맹점을 선택해주세요!");
		return;
	}
	if(start_date != '' && end_date != ''){
		if(end_date < start_date){
			alert("조회기간은 종료일이 시작일 이후여야 합니다.\n등록기간을 다시 선택해주세요.");
			if(start_date == "start_date"){
				$("#start_date").attr("value","");
				$("#start_date").focus();
			}else{
				$("#end_date").attr("value","");
				$("#end_date").focus();
			}
			return;
		}
		if(temp_end < ed_date){
			alert("조회기간은 최대 6개월입니다.\n등록기간을 다시 선택해주세요.");
			if(start_date == "start_date"){
				
				$("#start_date").attr("value","");
				$("#start_date").focus();
			}else{
				$("#end_date").attr("value","");
				$("#end_date").focus();
			}
			return;
		}
		if(temp_start > st_date){
			alert("조회기간은 최대 6개월입니다.\n등록기간을 다시 선택해주세요.");
			if(start_date == "start_date"){
				$("#start_date").attr("value","");
				$("#start_date").focus();
			}else{
				$("#end_date").attr("value","");
				$("#end_date").focus();
			}
			return;
		}
	}
	
	// 초기 조회 조건 설정
	var brand_wid = "";
	var pay_type = "";
	var trns_div = "";
	var resp_mcd = "";

	$("#brand_wid option:selected").each(function() {
		brand_wid = $(this).val();
	});
	$("#pay_type option:selected").each(function() {
		pay_type = $(this).val();
	});
	$("#trns_div option:selected").each(function() {
		trns_div = $(this).val();
	});
	$("#resp_mcd option:selected").each(function() {
		resp_mcd = $(this).val();
	});

	$("#start_date").attr("value", start_date);
	$("#end_date").attr("value", end_date);
	$("#brand_wid").attr("value", brand_wid);
	$("#pay_type").attr("value", pay_type);
	$("#trns_div").attr("value", trns_div);
	$("#resp_mcd").attr("value", resp_mcd);
	$("#store_name").attr("value", store_name);

	// 페이지 초기값 설정
	$("#page").attr("value", 1);
	viewLoadingShow();
	$("#telegramListform").submit();
}

// 페이징 함수
function telePaging(pageNum) {
	$(document).ready(function() {
			// 컨트롤러로 전송
			var ctx = $("#ctx").val();
			// 동적 폼생성 POST 전송
			var pageNumInput = $('<input type="hidden" value="' + pageNum + '" name="pageNum">');

			var telegramListform = $("#TLForm");
			telegramListform.append(pageNumInput);
			viewLoadingShow();
			telegramListform.submit();
		});
}

// 유효기간 Vallidation 체크
//function validateDate(obj, str) {
//	var val = obj.value.split("-");
//	var res = val[0];
//	if (val[1] != null && val[1].length == 1) {
//		val[1] = "-0" + val[1];
//	} else if (val[1] != null && val[1].length > 1) {
//		val[1] = "-" + val[1];
//	}
//
//	if (val[2] != null && val[2].length == 1) {
//		val[2] = "-0" + val[2];
//	} else if (val[2] != null && val[2].length > 1) {
//		val[2] = "-" + val[2];
//	}
//
//	if (val[1] != null) {
//		res += val[1];
//	}
//	if (val[2] != null) {
//		res += val[2];
//	}
//
//	// 6개월 이내 검색 체크
//	var start_date = $("#start_date").val();
//	var st_year = $("#start_date").val().substr(0, 4);
//	var st_month = $("#start_date").val().substr(5, 2);
//	var st_day = $("#start_date").val().substr(8, 2);
//	var st_date = new Date(st_year, st_month, st_day);
//	var temp_end = new Date(Date.parse(st_date) + 180 * 1000 * 60 * 60 * 24);
//	var end_date = $("#end_date").val();
//	var ed_year = $("#end_date").val().substr(0, 4);
//	var ed_month = $("#end_date").val().substr(5, 2);
//	var ed_day = $("#end_date").val().substr(8, 2);
//	var ed_date = new Date(ed_year, ed_month, ed_day);
//	var temp_start = new Date(Date.parse(ed_date) - 180 * 1000 * 60 * 60 * 24);
//
//	 if(start_date != '' && end_date != ''){
//		 if(temp_start < ed_date)
//		 {
//			 alert("조회기간은 최대 6개월입니다.\n등록기간을 다시 선택해주세요.\n 선택한 값이 종료일보다 작습니다.(텔레그램js)");
//			 if(str == "start_date")
//			 {
//				 $("#start_date").attr("value","");
//			 }else
//			 {
//				 $("#end_date").attr("value","");
//			 }
//		 		return;
//		 }
//		 if(temp_end < ed_date)
//		 {
//			alert("조회기간은 최대 6개월입니다.\n등록기간을 다시 선택해주세요.\n 선택한 값이 시작일의 육개월 후보다 큽니다.(텔레그램자바스크립트");
//			if(str == "start_date")
//			{
//				$("#start_date").attr("value","");
//			}else
//			{
//				$("#end_date").attr("value","");
//			}
//				return;
//		 }
//		 else if(temp_start > st_date)
//		 {
//			 alert("조회기간은 최대 6개월입니다.\n등록기간을 다시 선택해주세요.");
//			 if(str == "start_date")
//			 {
//				 $("#start_date").attr("value","");
//			 }else
//			 {
//				 $("#end_date").attr("value","");
//			 }
//			 	return;
//		 }
//	 }
//
//	$(obj).val(res);
//}

// 가맹점 리스트 엔터키 기능
function telePageNumInputEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var telePageNum = parseInt($("#pageInput").val());
			if ($("#pageInput").val() == '') {
				alert("페이지 번호를 입력하세요.")
				$("#pageInput").val($("#pageNum").val());
				$("#pageInput").focus();
			} else if(telePageNum > parseInt($("#endPageNum").val())) {
				alert("페이지 번호가 너무 큽니다.");
				$("#pageInput").val($("#pageNum").val());
				$("#pageInput").focus();
			} else if (1 > telePageNum) {
				alert("페이지 번호가 너무 작습니다.");
				$("#pageInput").val($("#pageNum").val());
				$("#pageInput").focus();
			} else {
				telePaging(telePageNum);
			}
		}
		event.stopPropagation();
	});
}

// 전문선택 레이어 팝업창 처리
function doPopupOpenView(key) {
	// 팝업창 표시
	$.blockUI({
		message : $('#popup_box_msgDiv'),
		css : {
			'left' : '55%',
			'top' : '50%',
			'margin-left' : '-400px',
			'margin-top' : '-250px',
			'width' : '700px',
			'height' : '150px',
			'cursor': 'default'
		}, onOverlayClick : $.unblockUI
	});

	// 팝업창 MESSAGE값 설정
	var val = $("#msg" + key).val();
	$("#msg").attr("value", val);
}

// PopUp Box 비표시
function doPopupClose() {
	setTimeout($.unblockUI, 0);
}

// 가맹점 검색조건 초기화
function resetStore() {
	$('#store_name').val('');
	$('#store_wid').val('');
}

function numCheck(obj) {
	var str = $(obj).val();
	var vlength = str.length;

	for (var i = 0; i < vlength; i++) {
		var rtn = isNumber(str, vlength, i);

		if (vlength > 0 && rtn == false) {
			alert("숫자만 입력해 주세요.");
			$(obj).attr("value", getRemovedStrNum(obj));
			$(obj).focus();
			return;
		}
	}
}