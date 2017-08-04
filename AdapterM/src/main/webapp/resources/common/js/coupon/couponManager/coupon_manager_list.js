/**
업 무 명 : 쿠폰관리 리스트화면
작 성 자 : 민지민 (minjm93@coreplus.co.kr)
작 성 일 : 2015/09/14
수 정 자 : 민지민 (minjm93@coreplus.co.kr)
수 정 일 : 2015/09/14
내 용 : 쿠폰관리에 대한 javascript 코드이다.
*참고사항 : 
 */

$(document).ready(function() {
	 
	var ctx = $("#ctx").val();
	
	$("#coupon_list_add").click(function() {
		goCouponForm('','');
	});
	
	$("#coupon_send").click(function() {
		goCouponSend();
	});
	
});

//쿠폰관리 상세정보 가기
function goCouponForm(cupn_wid, active_flg) {
	$(document).ready(function() {
		var ctx = $("#ctx").val();
		// 동적 폼생성 POST 전송
		var $form = $('<form></form>');
	     $form.attr('action', ctx+'/couponForm');
	     $form.attr('method', 'post');
	     $form.attr('enctype', 'multipart/form-data');
	     $form.appendTo('body');
	     var cupnAddMdfyFlag_input = "";
	     // 상세정보일때
	     if(cupn_wid != '' && active_flg != ''){
	    	 var cupn_wid_input = $('<input type="hidden" value="'+cupn_wid+'" name="cupn_wid">');
	    	 var active_flg_input = $('<input type="hidden" value="'+active_flg+'" name="active_flg">');
	    	 
	    	 $form.append(cupn_wid_input);
	    	 $form.append(active_flg_input);
	     } else {
	    	 cupnAddMdfyFlag_input = $('<input type="hidden" value="0" name="cupnAddMdfyFlag">');
	    	 $form.append(cupnAddMdfyFlag_input);
	     }
    	 // 추가버튼일때
    	 var file_input = $('<input type="file" id="file" name="file" style="display:none;">');
    	 $form.append(file_input);
    	 viewLoadingShow();
	     $form.submit();
	});
}

//쿠폰관리 상세정보 가기
function goCouponSend() {
	$(document).ready(function() {
		var ctx = $("#ctx").val();
		// 동적 폼생성 POST 전송
		var $form = $('<form></form>');
	     $form.attr('action', ctx+'/couponSendMain');
	     $form.attr('method', 'post');
	     $form.attr('enctype', 'multipart/form-data');
	     $form.appendTo('body');
	     viewLoadingShow();
	     $form.submit();
	});
}

//조회 버튼 기능
function cupn_manager_sch(pageNum) {
	
	var ctx = $("#ctx").val();
	var sch_flg = $("#sch_flg").val('1');
	var page_input = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	$("#couponListForm").append(page_input).append(sch_flg);
	viewLoadingShow();
	$("#couponListForm").submit();
}

//조회 엔터키
function cupnEnterSearch(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var cupn_name = $("#cupn_name_srch").val();
			if(cupn_name == ''){
				alert("쿠폰명을 입력해주세요.");
				return false;
			} else {
				cupn_manager_sch(1);
			}
		}
		event.stopPropagation();
	});
}

//페이징 함수
function cupnPaging(pageNum) {
	$(document).ready(function() {
		// 컨트롤러로 전송
		var ctx = $("#ctx").val();
		var couponListForm = $("#couponListPagingForm");
	     
	    var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	 
	    couponListForm.append(pageNumInput);
	    viewLoadingShow();
	    couponListForm.submit();
	});
}
 
//페이징 엔터키
function cupnPageNumInputEnter(event) {
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
			cupnPaging(pageNum);
		}
	}
	event.stopPropagation();
}
