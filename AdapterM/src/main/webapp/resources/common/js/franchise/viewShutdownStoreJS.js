/**
 * 
 */

function vShutDownSetText(){

	var sVal = "";
	$("#brand_wid option:selected").each(function(){
		sVal = $(this).val();
	});

	$("#up_id").attr("value",sVal);
	
	// 가맹점 정보 초기화
	resetStore();
}



//가맹점 검색조건 초기화
function vShutDownResetStore() {
	$('#store_name').val('');
	$('#store_wid').val('');
}

//검색
function viewShutDown_Search(){
	
	var brand_wid = $("select[name=brand_wid]").val();
	var store_wid = $("#store_wid").val();
	if(brand_wid != ''){
		if(store_wid != ''){
		
		}else{
			alert("가맹점을 선택해 주세요.");
			return false;
		}
	}
	viewLoadingShow();
	$('#viewShutDownform').submit();
}


function viewShutDownPaging(pageNum){
	$('#pageNum').val(pageNum);
	viewLoadingShow();
	$('#viewShutDownform').submit();
}


function viewShutdownStoreDetail(std_num,job_type){
	var ctx = $('#ctx').val();

	// 동적 폼생성 post 전송
	var $form = $('<form></form>');
	$form.attr('action', ctx+"/viewShutdownStoreDetail");
	$form.attr('method', 'post');
    $form.appendTo('body');
    
	$form.append('<input type="hidden" name="std_num" value="'+std_num+'" />');
	$form.append('<input type="hidden" name="job_type" value="'+job_type+'" />');
	viewLoadingShow();
	$form.submit();
	
}
//검색창 엔터키 기능
function contPageNumInputEnter(event, url) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var pageNum = parseInt($("#pageInput").val());
			if ($("#pageInput").val() == '') {
				alert("페이지 번호를 입력하세요.")
				$("#pageInput").val($("#vanCommissionPageNum").val());
				$("#pageInput").focus();
			} else if(pageNum > parseInt($("#endPageNum").val())) {
				alert("페이지 번호가 너무 큽니다.");
				$("#pageInput").val($("#vanCommissionPageNum").val());
				$("#pageInput").focus();
			} else if (1 > pageNum) {
				alert("페이지 번호가 너무 작습니다.");
				$("#pageInput").val($("#vanCommissionPageNum").val());
				$("#pageInput").focus();
			} else {
				// 컨트롤러로 전송
				var ctx = $("#ctx").val();
				// 동적 폼생성 POST 전송
				var $form = $('<form></form>');
				$form.attr('action', ctx + url);
				$form.attr('method', 'post');
				$form.appendTo('body');
				
				var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
				$form.append(pageNumInput);
				viewLoadingShow();
				$form.submit();
			}
		}
		event.stopPropagation();
	});
}