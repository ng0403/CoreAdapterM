/**
업 무 명 : 로열티프로그램
작 성 자 : 이지용 (ezyong@coreplus.co.kr)
작 성 일 : 2015/09/24
수 정 자 : 이지용 (ezyong@coreplus.co.kr)
수 정 일 : 2015/10/21
내 용 : 로열티 프로그램 리스트 javascript
*참고사항 : 
 */

$(document).ready(function() {
	
	var ctx = $("#ctx").val();
	
		
});

// 프로그램 상세정보
function goLoyalProgramDetail(prgmID, prgmNM,prgmREPRid, prgmREPRnm, prgmDESC, prgmTypeCD, prgmTypeNM ) {

	
	var ctx = $("#ctx").val();
	var $form = $('<form></form>');
     $form.attr('action', ctx + "/loyaltyProgramForm");
     $form.attr('method', 'post');
     $form.appendTo('body');
     
     if(prgmID != ''){
    	 var prgmIDInput = $('<input type="hidden" value="'+prgmID+'" name="prgm_id">');
    	 var formFlagInput = $('<input type="hidden" value="0" name="form_flag">');
    	 var prgmNMInput = $('<input type="hidden" value="'+prgmNM+'" name="prgm_name">');
    	 var prgmREPRidInput = $('<input type="hidden" value="'+prgmREPRid+'" name="prgm_repr_id">');
    	 var prgmREPRidNMInput = $('<input type="hidden" value="'+prgmREPRnm+'" name="prgm_repr_id_nm">');
    	 var prgmDESCInput = $('<input type="hidden" value="'+prgmDESC+'" name="prgm_desc">');
    	 var prgmTypeCDInput = $('<input type="hidden" value="'+prgmTypeCD+'" name="prgm_type_cd">');
    	 var prgmTypeNMInput = $('<input type="hidden" value="'+prgmTypeNM+'" name="prgm_type_cd_nm">');
    	 $form.append(prgmIDInput);
    	 $form.append(formFlagInput);
    	 $form.append(prgmNMInput);
    	 $form.append(prgmREPRidInput);
    	 $form.append(prgmREPRidNMInput);
    	 $form.append(prgmDESCInput);
    	 $form.append(prgmTypeCDInput);
    	 $form.append(prgmTypeNMInput);
     } else {
    	 var formFlagInput = $('<input type="hidden" value="1" name="form_flag">');
    	 $form.append(formFlagInput);
     }
     viewLoadingShow();
     $form.submit();
}
		
		
//조회기능
function programSearch(pageNum) {
	var loPrgmListForm = $("#loPrgmListForm");
	var pageNum = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	loPrgmListForm.append(pageNum);
	viewLoadingShow();
	loPrgmListForm.submit();
}

//프로그램 페이징
function prgmPagingBtn(pageNum) {
	var $form = $('#prgmPagingForm');
	var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	$form.append(pageNumInput);
	viewLoadingShow();
	$form.submit();
}

//담당자조회 레이어 팝업창 처리
function loyalPrgmReprPopupOpen() {
	
	$("#sch_prgm_repr_id_nm").val('');	//검색 값 초기화
	$("#sch_prgm_repr_dept_nm").val('');	//검색 값 초기화
	
	// 팝업창 표시
	$.blockUI({ message: $('#loyalPrgmReprModalDiv'),
    	css: { 
    	'left': '50%',
    	'top': '50%',
    	'margin-left': '-400px',
    	'margin-top': '-250px',
    	'width': '800px',
    	'height': '500px',
    	'cursor': 'default'
    	}
	,onOverlayClick : $.unblockUI	//모달창 외부 클릭 시 팝업창 닫음.
	});
	
	// 가맹점목록 표시
	viewLoyalProgramReprList(1);
}
//프로그램담당자 리스트
function viewLoyalProgramReprList(pageNum) {
	var ctx = $("#ctx").val();
	var sendData = "prgm_repr_dept_nm="+$("#sch_prgm_repr_dept_nm").val()
	+"&prgm_repr_id_nm="+$("#sch_prgm_repr_id_nm").val()+"&pageNum="+pageNum;
	$.ajax({
		url: ctx + "/loyaltyProgramReprSearch", 
		type: "POST",  
		data: sendData,
		dataType: "json",
		success: function(data) {
			$("#loyalPrgmReprTbody").empty(); // div 내용삭제

			// 검색 조건 값 유지
			if(data.prgm_repr_id_nm != '') $("#sch_prgm_repr_id_nm").val(data.prgm_repr_id_nm);
			if(data.prgm_repr_dept_nm != '') $("#sch_prgm_repr_dept_nm").val(data.prgm_repr_dept_nm);
			
			$.each(data.loyaltyPrgmReprList, function(i) { // 테이블 내용 추가
				// 헤더에서 TR 요소 취득
				var trElement = $("#loyalPrgmReprListTableHeader").clone().removeClass().empty();
				var prgm_id = this.prgm_id;
				var prgm_name = this.prgm_name;
				var pageNum = this.pageNum;
				var prgm_repr_id = this.prgm_repr_id;
				var prgm_repr_id_nm = this.prgm_repr_id_nm;
				var prgm_repr_dept_nm = this.prgm_repr_dept_nm;
				var prgm_repr_dept_id = this.prgm_repr_dept_id;
				
				trElement.bind("click", function(e) { // TR에 클릭이벤트 추가
					loyalPrgmReprPopupClose(); // 팝업창 닫기
					setLoyalPrgmReprID(prgm_repr_id_nm, prgm_repr_id); // 프로그램 아이디 설정
				});
				
				mouseHoverEvent(trElement); // 마우스 오버시 화면 표시 이벤트 추가
				trElement.css('cursor', 'pointer');
				
				// tr 작성
				$("#loyalPrgmReprTbody").append(trElement);
				$("#loyalPrgmReprTbody tr:last").append("<td align='center' width='10%'>" 
						+ (i + 1 + ((eval(data.pageNum) - 1) * 10)) + "</td>"
						+ "<td width='20%'>" + prgm_repr_id_nm + "</td>"
						+ "<td width='50%'>" + prgm_repr_dept_nm + "</td>");
				
				var pageContent = "";
				// 페이징 다시그리기
				$("#loyalPrgmReprPagingDiv").children().remove();
				
				if(data.page.startPageNum == 1 && data.page.endPageNum == 1){
					pageContent = "<input type='hidden' id='pageNum' value='"+data.pageNum+"'/><input type='hidden' id='ModalReprEndPageNum' value='"+data.page.endPageNum+"'/>"
					+"<a style='text-decoration: none; color: black;'> ◀ </a><input type='text' id='pageInput' readonly='readonly' value='"+data.page.startPageNum+"' onkeypress=\"ModalPageNumInputEnter(event);\" style='width: 15px; text-align: center;'/>" 
					+"<a style='text-decoration: none; color: black;'> / "+data.page.endPageNum+"</a><a style='text-decoration: none; color: black;'> ▶ </a>";
				} else if(data.pageNum == data.page.startPageNum){
					pageContent = "<input type='hidden' id='pageNum' value='"+data.pageNum+"'/><input type='hidden' id='ModalReprEndPageNum' value='"+data.page.endPageNum+"'/>"
					+"<a style='text-decoration: none; color: black;'> ◀ </a><input type='text' id='pageInput' value='"+data.page.startPageNum+"' onkeypress=\"ModalPageNumInputEnter(event);\" style='width: 15px; text-align: center;'/>" 
					+"<a href='#' onclick=viewLoyalProgramReprList("+data.page.endPageNum+") id='pNum'> / "+data.page.endPageNum+"</a>"
					+"<a href='#' onclick=viewLoyalProgramReprList("+(parseInt(data.pageNum)+1)+") id='pNum'> ▶ </a>";
				} else if(data.pageNum == data.page.endPageNum){
					pageContent = "<input type='hidden' id='pageNum' value='"+data.pageNum+"'/><input type='hidden' id='ModalReprEndPageNum' value='"+data.page.endPageNum+"'/>"
					+"<a href='#' onclick=viewLoyalProgramReprList("+(parseInt(data.pageNum)-1)+") id='pNum'> ◀ </a>"
					+"<input type='text' id='pageInput' value='"+data.page.endPageNum+"' onkeypress=\"ModalPageNumInputEnter(event);\" style='width: 15px; text-align: center;'/>"
					+"<a> / "+data.page.endPageNum+"</a>"
					+"<a style='text-decoration: none; color: black;'> ▶ </a>";
				} else {
					pageContent = "<input type='hidden' id='pageNum' value='"+data.pageNum+"'/><input type='hidden' id='ModalReprEndPageNum' value='"+data.page.endPageNum+"'/>"
					+"<a href='#' onclick=viewLoyalProgramReprList("+(parseInt(data.pageNum)-1)+") id='pNum'> ◀ </a>"
					+"<input type='text' id='pageInput' value='"+data.pageNum+"' onkeypress=\"ModalPageNumInputEnter(event);\" style='width: 15px; text-align: center;'/>"
					+"<a href='#' onclick=viewLoyalProgramReprList("+data.page.endPageNum+") id='pNum'> / "+data.page.endPageNum+"</a>"
					+"<a href='#' onclick=viewLoyalProgramReprList("+(parseInt(data.pageNum)+1)+") id='pNum'> ▶ </a>";
				}
				$("#loyalPrgmReprPagingDiv").append(pageContent);
			});
			
			if (data.loyaltyPrgmReprList.length < 10 && data.loyaltyPrgmReprList.length > 0) {
				for (var int = 0; int < 10-data.loyaltyPrgmReprList.length; int++) {
					$("#loyalPrgmReprTbody").append("<tr style='background-color: white; cursor: default;'><td>&nbsp;</td><td></td><td></td></tr>");
				}
			}
			
			// 검색된 프로그램목록이 없을경우 표시
			if (data.loyaltyPrgmReprList.length == 0) {
				var trElement = $("#loyalPrgmReprListTableHeader").clone().removeClass().empty();
				$("#loyalPrgmReprTbody").append(trElement);
				$("#loyalPrgmReprTbody tr:last").append("<td class='list1_b' colspan='3' align='center'>검색 결과가 없습니다</td>");
			}
		},
		beforeSend: function(){
        	viewLoadingShow();			
        },
        complete:function(){
        	viewLoadingHide();	
        },
		error: function(data) { 
			alert("프로그램 목록을 불러올 수 없습니다.");
			return false;
		}
	});
}

//팝업 닫기
function loyalPrgmReprPopupClose() {
	setTimeout($.unblockUI, 0);
}


//폼에 프로그램담당자 아이디 세팅
function setLoyalPrgmReprID(prgm_repr_id_nm, prgm_repr_id){
	$("#prgm_repr_id").val(prgm_repr_id);
	$("#prgm_repr_id_nm").val(prgm_repr_id_nm);
}

//팝업창 가맹점 조건값 조회
function prgmReprSearch(){	
	viewLoyalProgramReprList(1);
}


//담당자 검색 모달창 리스트 페이징 엔터키 기능
function ModalPageNumInputEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var pageNum = parseInt($("#pageInput").val());
			if ($("#pageInput").val() == '') {
				alert("페이지 번호를 입력하세요.")
				$("#pageInput").val($("#pageNum").val());
				$("#pageInput").focus();
			} else if(pageNum > parseInt($("#ModalReprEndPageNum").val())) {
				alert("페이지 번호가 너무 큽니다.");
				$("#pageInput").val($("#pageNum").val());
				$("#pageInput").focus();
			} else if (1 > pageNum) {
				alert("페이지 번호가 너무 작습니다.");
				$("#pageInput").val($("#pageNum").val());
				$("#pageInput").focus();
			} else {
				viewLoyalProgramReprList(pageNum);
			}
		}
		event.stopPropagation();
	});
}

// 로열티 프로그램 페이징 엔터
function LoPrgmPageNumInputEnter(event) {
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
		} else {
			prgmPagingBtn(pageNum);
		}
	}
	event.stopPropagation();
}

//모달창 검색 엔터키 기능
function LoPrgmReprPageEnter() {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			viewLoyalProgramReprList(1);
		}
		event.stopPropagation();
	});
}

//프로그램 페이징
function prgmPaging(pageNum) {
	var ctx = $("#ctx").val();
	var prgmSearchForm = $("#LPPagingForm");
	var pageNumInput = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	prgmSearchForm.append(pageNumInput);
	viewLoadingShow();
	prgmSearchForm.submit();
}

//로열티 프로그램 리스트 검색창 엔터키 기능
function LoPrgmListSchPageEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var prgm_name = $("#prgm_name").val();
			programSearch(1);
		}
		event.stopPropagation();
	});
}
