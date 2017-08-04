/**
업 무 명 : RFM 분류별 고객 상세
작 성 자 : 
작 성 일 : 2015/10/26
수 정 자 : 
수 정 일 : 2015/10/26
내 용 : RFM 분류별 고객 상세
*참고사항 : 
 */

//RFM 분류별 고객 관리 리스트로 이동 버튼
function goRfmCateCustList() {
	var ctx = $("#ctx").val();
	var $form = $("#rfmCategoryCustomerDetailForm");
	viewLoadingShow();
	$form.attr("action", ctx + "/rfmCategoryCustomer").submit();
}

//페이징 함수
function rfmCateCustDetailPaging(pageNum) {
	var $form = $("#rfmCCDetailPagingForm");
    var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
    $form.append(pageNumInput);
    viewLoadingShow();
    $form.submit();
}
//페이징 엔터키 이동
function rfmCCDetailPageNumInputEnter(event){
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
				rfmCateCustDetailPaging(pageNum);
			}
		}
		event.stopPropagation();
	});
}