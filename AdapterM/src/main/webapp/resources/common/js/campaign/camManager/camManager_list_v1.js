/**
업 무 명 : 캠페인 조회
작 성 자 : 유대열
작 성 일 : 2016/05/16
수 정 자 : 공재원
수 정 일 : 2017/04/24
내 용 : 캠페인 조회 리스트 javascript
 */
/*$(document).ready(function() {
	var ctx = $("#ctx").val();
	camManager_list_srch();
	
	$("#cam_list_add").click(function() {
		camDetail('');
	});
});*/
var pageNum="";
// 캠페인 관리 상세정보 가기
function camDetail(camId) {
	//$(document).ready(function() {
		var ctx = $("#ctx").val();
		// 동적 폼생성 POST 전송
		var $form = $('<form></form>');
	     $form.attr('action', ctx+'/camDetail');
	     $form.attr('method', 'post');
	     $form.attr('enctype', 'multipart/form-data');
	     $form.appendTo('body');
	     // 상세정보일때
	     if(camId != ''){
	    	 var cam_id_input = $('<input type="hidden" value="'+camId+'" name="cam_id">');
	    	 //var flag_input = $('<input type="hidden" value="'+flag+'" name="flag">');
	    	 var camAddMdfyFlag_input = $('<input type="hidden" value="3" name="camAddMdfyFlag">');
	    	 var file_input = $('<input type="file" id="file" name="file" style="display:none;">');
	    	 
	    	 $form.append(cam_id_input);
	    	 //$form.append(flag_input);
		     $form.append(camAddMdfyFlag_input);
		     $form.append(file_input);
		     viewLoadingShow();
		     $form.submit();
	     }
	     // 추가버튼일때
	     var camAddMdfyFlag_input = $('<input type="hidden" value="0" name="camAddMdfyFlag">');
	     //var flag_input = $('<input type="hidden" value="'+flag+'" name="flag">');
	     var file_input = $('<input type="file" id="file" name="file" style="display:none;">');
	     
	     $form.append(camAddMdfyFlag_input);
	     //$form.append(flag_input);
	     $form.append(file_input);
	     viewLoadingShow();
	     $form.submit();
	//});
}

// 캠페인 상세정보
function camDetail1(camId) {
	var ctx = $("#ctx").val();
	var $form = $('<form></form>');
     $form.attr('action', ctx + "/camDetail");
     $form.attr('method', 'post');
     $form.appendTo('body');
     
     if(camId != ''){
    	 var camId = $('<input type="hidden" value="'+camId+'" name="cam_id">');
    	 $form.append(camId);
     } else {
    	 var formFlagInput = $('<input type="hidden" value="1" name="form_flag">');
    	 $form.append(formFlagInput);
     }
     viewLoadingShow();
     $form.submit();
}

//조회 버튼 기능
/*function camManager_list_src(pageNum){
	$(document).ready(function() {
		$("#camManager_list_srch").click(function (){
			var page_input = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
			$("#camPaignManagerListForm").append(page_input);
			viewLoadingShow();
			$("#camPaignManagerListForm").submit();
		});
	});
}*/

//검색창 엔터키 기능
function camManagerSchPageEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		
		if (keycode == '13') {
			var page_input = $('<input type="hidden" value="1" name="pageNum">');
			$("#camPaignManagerListForm").append(page_input);
			viewLoadingShow();
			$("#camPaignManagerListForm").submit();
		}
		event.stopPropagation();
	});
}

//페이징 함수
function camManagerPaging(pageNum) {
	$(document).ready(function() {
		// 컨트롤러로 전송
		var ctx = $("#ctx").val();
		var camManagerListForm = $("#CMPagingForm");
	     
	    var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	 
	    camManagerListForm.append(pageNumInput);
	    viewLoadingShow();
	    camManagerListForm.submit();
	    
	});
}


//페이지 엔터키 기능
function CMPageNumInputEnter(event) {
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
				camManagerPaging(pageNum);
			}
				
		}
		event.stopPropagation();
}