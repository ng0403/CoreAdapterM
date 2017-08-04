/**
업 무 명 : 소멸확정금액 조회 화면
작 성 자 : 정은지 (wjdmwi@coreplus.co.kr)
작 성 일 : 2015/09/17
수 정 자 : 정은지 (wjdmwi@coreplus.co.kr)
수 정 일 : 2015/09/17
내 용 : 소멸확정금액 조회에 대한 javascript 코드이다.
*참고사항 : 
*/

//소멸확정금액 검색 값 유지
$(document).ready(function() {
	var ctx = $('#ctx').val();
	
	$("#start_dt").datepicker();
	$("#end_dt").datepicker();
});

//소멸확정금액 조회 페이징
function CFAPaging(pageNum) {
	var ctx = $("#ctx").val();
	var $form = $('#confirmedExpiredAmtPagingForm');
	
    var pageNum_input = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
    
    $form.append(pageNum_input);
    viewLoadingShow();
    $form.submit();
}

//소멸확정금액 조회 버튼기능
function confirmedAmt_goSearch() {
	
	var start_dt = $("#start_dt").val();
	var end_dt = $("#end_dt").val();
	var key_wid = $("#key_wid").val();
	var id = $("#id").val();
	
	if(start_dt == null || start_dt == ""){
		alert("시작 등록기간을 선택해주세요!");
		return false;
	}
	if(end_dt == null || end_dt == ""){
		alert("종료 등록기간을 선택해주세요!");
		return false;
	}
	 viewLoadingShow();	
	$("#confirmedAmtForm").submit();
}

//페이지 엔터키 기능
function cfaPageNumEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var pageNum = parseInt($("#pageInput").val());
			if ($("#pageInput").val() == '') {
				alert("페이지 번호를 입력하세요.")
				$("#pageInput").val($("#confirmedAmtPageNum").val());
				$("#pageInput").focus();
			} else if(pageNum > parseInt($("#endPageNum").val())) {
				alert("페이지 번호가 너무 큽니다.");
				$("#pageInput").val($("#confirmedAmtPageNum").val());
				$("#pageInput").focus();
			} else if (1 > pageNum) {
				alert("페이지 번호가 너무 작습니다.");
				$("#pageInput").val($("#confirmedAmtPageNum").val());
				$("#pageInput").focus();
			} else {
				CFAPaging(pageNum);
			}
		}
		event.stopPropagation();
	});
}

//검색 엔터키
function coEnterSearch(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			confirmedAmt_goSearch();
		}
	});
}

//소멸확정금액 조회 리스트로 이동 버튼
function go_comfirmedAmt_list() {
	var ctx = $("#ctx").val();
	
	// 동적 폼생성 get 전송
	var $form = $('<form></form>');
	$form.attr('action', ctx+'/confirmedExpiredAmt');
	$form.attr('method', 'post');
	$form.appendTo('body');
	 viewLoadingShow();
	$form.submit();
}

//포인트 카드 번호 숫자체크
function numCheck(obj){
	var str = $(obj).val();
	var vlength = str.length;
	
	for(var i=0; i<vlength; i++){
		var rtn = isNumber(str, vlength, i);

		if(vlength > 0 && rtn == false){
			alert("숫자만 입력해 주세요.");
			$(obj).attr("value",getRemovedStrNum(obj));
			$(obj).focus();
			return;
		}
	}
}

//숫자 체크 함수
function isNumber(str, length, inx){
	var chars = "0123456789"; 

    if (chars.indexOf(str.charAt(inx)) != -1){
        return true;
    }else{
    	return false;	
    }
}
