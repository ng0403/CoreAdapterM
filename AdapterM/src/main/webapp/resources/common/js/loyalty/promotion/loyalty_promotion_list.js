/**
업 무 명 : 로열티프로모션
작 성 자 : 이동근 (leedg5845@coreplus.co.kr)
작 성 일 : 2015/09/24
수 정 자 : 이동근 (leedg5845@coreplus.co.kr)
수 정 일 : 2015/09/24
내 용 : 로열티 프로모션 폼 javascript
*참고사항 : 
 */

$(document).ready(function() {
	// 전체 체크, 해제
	$("#loyalPmt_chk_all").click(function(){
		if($("#loyalPmt_chk_all").prop("checked")){
			$("input[type=checkbox]").prop("checked", true);
		} else {
			$("input[type=checkbox]").prop("checked", false);
		}
	});
	
	// 전문 삭제
	$("#loyalPmt_list_del").click(function() {
		var delChkCnt = 0;
		$(":checkbox[id='loyalPmt_chk']:checked").each(function(index, item){
			delChkCnt++;
		});
		
		if(delChkCnt == 0){
			alert("삭제할 항목을 선택 해주세요.");
			return false;
		} else {
			var delYn = confirm("정말 삭제 하시겠습니까?");
			if(delYn){
				var form = $("#prmtDelForm");
				
				var delFlag = $('<input type="hidden" name="delFlag" value="1">');
				form.append(delFlag);
				viewLoadingShow();
				form.submit();
			}
		}
	});
	
	// 하나 선택시 전체 체크 해제
	$("#loyalPmt_chk").click(function() {
		$("#loyalPmt_list_del").prop("checked", false);
	});
});

// 프로모션 상세정보
function goLoyalPromoDetail(promoID) {
	var ctx = $("#ctx").val();
	var $form = $('<form></form>');
     $form.attr('action', ctx + "/loyaltyPromotionForm");
     $form.attr('method', 'post');
     $form.appendTo('body');
     
     if(promoID != ''){
    	 var promoIDInput = $('<input type="hidden" value="'+promoID+'" name="prmt_id">');
    	 var formFlagInput = $('<input type="hidden" value="0" name="form_flag">');
    	 var addFlagInput = $('<input type="hidden" value="0" name="add_flag">');
    	 $form.append(promoIDInput);
    	 $form.append(formFlagInput);
    	 $form.append(addFlagInput);
     } else {
    	 var formFlagInput = $('<input type="hidden" value="1" name="form_flag">');
    	 $form.append(formFlagInput);
     }
     viewLoadingShow();
     $form.submit();
}

// 프로모션 검색
function promotionSearch(pageNum) {
	var ctx = $("#ctx").val();
	var prmtSearchForm = $("#prmtSearchForm");
	var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	var prmtSchFlgInput = $('<input type="hidden" value="1" name="prmtSchFlg">');
	prmtSearchForm.append(pageNumInput);
	prmtSearchForm.append(prmtSchFlgInput);
	viewLoadingShow();
	prmtSearchForm.submit();
}

// 프로모션 페이징
function prmtPaging(pageNum) {
	var ctx = $("#ctx").val();
	var prmtSearchForm = $("#prmtPagingForm");
	var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	var prmtSchFlgInput = $('<input type="hidden" value="1" name="prmtSchFlg">');
	prmtSearchForm.append(pageNumInput);
	prmtSearchForm.append(prmtSchFlgInput);
	viewLoadingShow();
	prmtSearchForm.submit();
}

function prmtPageNumEnter(event) {
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
			prmtPaging(pageNum);
		}
	}
	event.stopPropagation();
}

function prmtEnterSearch(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var prmt_name = $("#prmt_name").val();
			promotionSearch(1);
		}
		event.stopPropagation();
	});
}