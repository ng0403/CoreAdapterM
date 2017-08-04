/**
업 무 명 : 법인 고객 관리 화면
작 성 자 : 민지민 (minjm93@coreplus.co.kr)
작 성 일 : 2015/11/24
수 정 자 : 민지민 (minjm93@coreplus.co.kr)
수 정 일 : 2015/11/24
내 용 : 법인 고객 관리에 대한 javascript 코드이다.
*참고사항 : 
*/
$(document).ready(function() {
	 
	var ctx = $("#ctx").val();
	
	// 추가 버튼
	$("#custcomp_list_add").click(function() {
		custCompDetail('');
	});
	
	// 전체 체크, 해제
	$("#cust_comp_all_chk").click(function(){
		if($("#cust_comp_all_chk").prop("checked")){
			$("input[type=checkbox]").prop("checked", true);
		} else {
			$("input[type=checkbox]").prop("checked", false);
		}
	});
	
	// 하나 선택시 전체 체크 해제
	$("#cust_comp_del_id").click(function() {
		$("#cust_comp_all_chk").prop("checked", false);
	});
	
	// 법인 고객 삭제
	$("#custcomp_list_del").click(function() {
		var delChkCnt = 0;
		$(":checkbox[id='cust_comp_del_id']:checked").each(function(index, item){
			delChkCnt++;
		});
		
		if(delChkCnt == 0){
			alert("삭제할 항목을 선택 해주세요.");
			return false;
		} else {
			var delYn = confirm("정말 삭제 하시겠습니까?");
			if(delYn){
				var form = $("#cust_comp_del_form");
				
				var delFlag = $('<input type="hidden" name="delFlag" value="1">');
				form.append(delFlag);
				
				form.submit();
			}
		}
	});
});

//법인 고객 페이징
function CCPaging(pageNum) {
	$(document).ready(function() {
		var ctx = $("#ctx").val();
		var $form = $('#custCompPagingForm');
	    
	    var pageNum_input = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');

	    $form.append(pageNum_input);
	    viewLoadingShow();    
	    $form.submit();
	});
}

//법인 고객 조회 버튼기능
function custComp_goSearch(){
	
	var cust_name = $("#cust_name").val();
	var id = $("#id").val();
	var cust_wid = $("#cust_wid").val();
	var comp_num = $("#comp_num").val();
	viewLoadingShow();
	$("#custCompForm").submit();
		
}

//페이지 엔터키 기능
function custCompPageNumEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var pageNum = parseInt($("#pageInput").val());
			if ($("#pageInput").val() == '') {
				alert("페이지 번호를 입력하세요.")
				$("#pageInput").val($("#custCompPageNum").val());
				$("#pageInput").focus();
			} else if(pageNum > parseInt($("#endPageNum").val())) {
				alert("페이지 번호가 너무 큽니다.");
				$("#pageInput").val($("#custCompPageNum").val());
				$("#pageInput").focus();
			} else if (1 > pageNum) {
				alert("페이지 번호가 너무 작습니다.");
				$("#pageInput").val($("#custCompPageNum").val());
				$("#pageInput").focus();
			} else {
				CCPaging(pageNum);
			}
		}
		event.stopPropagation();
	});
}

//검색 엔터키
function custCompEnterSearch(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			custComp_goSearch();
		}
	});
}
//법인 고객 상세정보로 이동
function custCompDetail(cust_wid) {
	$(document).ready(function() {
		var ctx = $("#ctx").val();
		
		//동적 폼생성 POST 전송 (상세정보 화면이동으로 작업)
		var $form = $('<form></form>');
	     $form.attr('action', ctx+'/custCompForm');
	     $form.attr('method', 'post');
	     $form.appendTo('body');
	     var compAddMdfyFlag_input = "";
	     
	     // 상세정보일때
	     if(cust_wid != ''){
	    	 var cust_wid_input = $('<input type="hidden" value="'+cust_wid+'" name="cust_wid">');
	    	 $form.append(cust_wid_input);
	     } else {
	    	 compAddMdfyFlag_input = $('<input type="hidden" value="0" name="compAddMdfyFlag">');
	    	 $form.append(compAddMdfyFlag_input);
	     }
	     viewLoadingShow();
	     $form.submit();
	});
}

//법인 고객 관리 리스트로 이동 버튼
function go_custComp_list() {
	var ctx = $("#ctx").val();
	
	// 동적 폼생성 get 전송
	var $form = $('<form></form>');
	$form.attr('action', ctx+'/customerCompany');
	$form.attr('method', 'post');
	$form.appendTo('body');
	viewLoadingShow();
	$form.submit();
}