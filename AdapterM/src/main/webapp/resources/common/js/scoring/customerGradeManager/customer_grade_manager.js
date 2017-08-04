/**
업 무 명 : 고객 등급 기준
작 성 자 : 김기현
작 성 일 : 2015/10/26
수 정 자 : 김기현
수 정 일 : 2015/10/26
내 용 : 고객 등급 기준
*참고사항 : 
 */
$(document).ready(function() {
	$("#grd_std_list_add").click(function() {
		goToGrdStdForm('','');
	});
});

//조회 버튼 기능
function grd_std_manager_list_sch(pageNum) {
	var ctx = $("#ctx").val();
	
	var sch_flg_input = $('<input type="hidden" value="'+$("#sch_flg").val('1')+'" name="sch_flg">');
	var grd_work_dt_sch_input = $('<input type="hidden" value="'+$('#grd_work_dt_sch').val()+'" name="grd_work_dt_sch">');
	var page_input = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	$("#f_grdStdList").append(page_input).append(sch_flg_input).append(grd_work_dt_sch_input);
	viewLoadingShow();
	$("#f_grdStdList").submit();
}

//조회 엔터키
function grdStdManagerEnterSearch(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var grd_work_dt = $("#grd_work_dt_sch").val();
			if(grd_work_dt == ''){
				alert("작업일자를 선택해주세요.");
				return false;
			} else {
				grd_std_list_sch(1);
			}
		}
		event.stopPropagation();
	});
}

//페이징 함수
function grdStdPaging(pageNum) {
	$(document).ready(function() {
		// 컨트롤러로 전송
		var ctx = $("#ctx").val();
		var f_grdStdList = $("#f_grdStdList");
	     
	    var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	 
	    f_grdStdList.append(pageNumInput);
	    viewLoadingShow();
	    f_grdStdList.submit();
	});
}
 
//페이징 엔터키
function grdPageNumInputEnter(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == '13') {
		var pageNum = parseInt($("#pageInput").val());
		if ($("#pageInput").val() == '') {
			alert("페이지 번호를 입력하세요.")
			$("#pageInput").focus();
		} else if(parseInt($("#pageInput").val()) > parseInt($("#endPageNum").val())) {
			alert("페이지 번호가 너무 큽니다.");
			$("#pageInput").val($("#pageNum").val());
			$("#pageInput").focus();
		} else {
			var ctx = $("#ctx").val();
			var $form = $('#f_grdStdList');
			var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
			$form.append(pageNumInput);
			viewLoadingShow();
			$form.submit();
		}
	}
	event.stopPropagation();
}

//쿠폰관리 상세정보 가기
function goToGrdStdForm(grd_std_key) {
		var ctx = $("#ctx").val();
		
		// 동적 폼생성 POST 전송
		var $form = $('<form></form>');
	     $form.attr('action', ctx+'/customerGradeManagerForm');
	     $form.attr('method', 'post');
	     $form.appendTo('body');
    	 
	     // 상세정보일때
	     if(grd_std_key != ''){
	    	 var grd_std_key_input = $('<input type="hidden" value="'+grd_std_key+'" name="grd_std_key">');
	    	 $form.append(grd_std_key_input);
	     }
	     
	     // 추가버튼일때
	     /*var grdAddMdfyFlag_input = $('<input type="hidden" value="0" name="grdAddMdfyFlag">');
	     $form.append(grdAddMdfyFlag_input);*/
	     
	     viewLoadingShow();
	     $form.submit();
}
