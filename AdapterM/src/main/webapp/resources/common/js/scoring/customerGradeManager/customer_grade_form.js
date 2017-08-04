function grdCustGradeDetail_search(){
	
	$('#grdCustDetailForm').submit();
	
}

//고객 등급 관리 상세정보 페이징
function grdCGPagePaging(pageNum) {
	$(document).ready(function() {
		var ctx = $("#ctx").val();
		var $form = $('#grdCustomerGradeFormPagingForm');
	    
	    var pageNum_input = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	    
	    $form.append(pageNum_input);
	    viewLoadingShow();
	    $form.submit();
	});
}

//고객 등급 관리 상세정보 페이지 엔터키 기능
function grdCGpageNumEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var pageNum = parseInt($("#pageInput").val());
			if (pageNum == '') {
				alert("페이지 번호를 입력하세요.")
				$("#pageInput").focus();
			} else if(pageNum > parseInt($("#endPageNum").val())) {
				alert("페이지 번호가 너무 큽니다.");
				$("#pageInput").val($("#rfmCGPageNum").val());
				$("#pageInput").focus();
			} else {
				grdCGPagePaging(pageNum);
			}
		}
		event.stopPropagation();
	});
}

function grdCustGradeHstEnter(event){
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			$('#set_cust_id').val($('#cust_id').val());
			$('#set_cust_name').val($('#cust_name').val());
			grdCGPagePaging(1);
		}
		event.stopPropagation();
	});
}