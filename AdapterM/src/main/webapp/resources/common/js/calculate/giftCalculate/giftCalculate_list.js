/**
업 무 명 : 상품권비용정산 리스트화면
작 성 자 : 이상민 (tkdals8401@coreplus.co.kr)
작 성 일 : 2015/09/16
수 정 자 : 이상민 (tkdals8401@coreplus.co.kr)
수 정 일 : 2015/09/16
내 용 : 상품권비용정산에 대한 javascript 코드이다.
*참고사항 : 
 */

$(document).ready(function() {
	$("#deptBtn").click(function(){
		$.blockUI({ 
				message: $('#modDeptDiv'),			
				css: { 
			    	'left': '50%',
			    	'top': '50%',
			    	'margin-left': '-400px',
			    	'margin-top': '-250px',
			    	'width': '800px',
			    	'height': '500px',
			    	'cursor': 'default'
			    	}
		});
		$("#smsMoClose").click(function(){
			$.unblockUI();
		});
		deptPaging(1);
	});	
		
	// modal 창	
	$("#giftPopTable tbody tr").click(function(){	
		var dept_id = $(this).find('.modDept_wid').val();
		var dept_nm = $(this).find('.modDept_nm').val();
		$.unblockUI();
		$("#dept_wid").val(dept_id);
		$("#dept_name_srch").val(dept_nm);			
	});
	
	// reset 버튼
	$("#reset").click(function() {
		$("#dept_name_srch").val("");
	});
});

//상품권비용정산 페이징
function gcPaging(pageNum) {
	$(document).ready(function() {
		var ctx = $("#ctx").val();
	    var pageNum_input = $('<input type="hidden" value="'+pageNum+'" name="pageNum">');
	    $("#giftPagingForm").append(pageNum_input);
	    viewLoadingShow();
	    $("#giftPagingForm").submit();
	});
}

//페이지 엔터키 기능
function giftNumInputEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var pageNum = parseInt($("#pageInput").val());
			if ($("#pageInput").val() == '') {
				alert("페이지 번호를 입력하세요.")
				$("#pageInput").val($("#giftPageNum").val());
				$("#pageInput").focus();
			} else if(pageNum > parseInt($("#endPageNum").val())) {
				alert("페이지 번호가 너무 큽니다.");
				$("#pageInput").val($("#giftPageNum").val());
				$("#pageInput").focus();
			} else if (1 > pageNum) {
				alert("페이지 번호가 너무 작습니다.");
				$("#pageInput").val($("#giftPageNum").val());
				$("#pageInput").focus();
			}  else {
				gcPaging(pageNum);
			}
		}
		event.stopPropagation();
	});
}

//부서목록 모달 페이징
function deptPaging(mPageNum) {
	$(document).ready(function() {
		var ctx = $("#ctx").val();
		// 동적 폼생성 POST 전송
		/*var $form = $('<form></form>');
		$form.attr('action', ctx+'/GiftCalculate');
		$form.attr('method', 'post');
		$form.appendTo('body');
	    var mpageNum_input = $('<input type="hidden" value="'+mpageNum+'" name="mpageNum">');
		$form.append(mpageNum_input)
		$form.submit();*/
		$.ajax({
			url: ctx + "/deptListAjax", 
			type: "POST",  
			data: "mPageNum="+mPageNum,//보내는값
			dataType: "json",
			success: function(data) {
				// div 내용삭제
				$("#deptDetail").empty();
				
				// 테이블 내용 추가
				$.each(data.deptList, function(i) {
					// 헤더에서 TR 요소 취득
					var trElement = $("#departListTableHeader").clone().removeClass().empty();
					var deptId = this.issued_dept;	
					var deptNm = this.issued_deptnm;
					
					// TR에 클릭이벤트 추가
					trElement.bind("click", function(e) {
						// 팝업창 닫기
						doPopupClose();
						setDeptID(deptId, deptNm);
					});				
					// 마우스 오버시 화면 표시 이벤트 추가
					addMouseEvent(trElement);				
					trElement.css('cursor', 'pointer');
					// TR 작성
					$("#deptDetail").append(trElement);
					$("#deptDetail tr:last").append("<td align='center' width='10%'>" 
							+ (i + 1 + ((eval(data.mPageNum) - 1) * 50)) + "</td>"
							+ "<td width='60%'>" + this.issued_deptnm + "</td>"
							+ "<td width='30%'>" + this.issued_dept + "</td>");
					var pageContent = "";
					// 페이징 다시그리기
					$("#mPagingDiv").children().remove();
					
					if(data.mpage.startPageNum == 1 && data.mpage.endPageNum == 1){
						pageContent = "<input type='hidden' id='deptPageNum' value='"+data.mPageNum+"'/><input type='hidden' id='deptEndPageNum' value='"+data.mpage.endPageNum+"'/>"
						+"<a style='text-decoration: none; color: black;'> ◀ </a><input type='text' id='deptPageInput' readonly='readonly' value='"+data.mpage.startPageNum+"' onkeypress=\"deptPageNumInputEnter(event);\" style='width: 15px; text-align: center;'/>" 
						+"<a> / "+data.mpage.endPageNum+"</a><a style='text-decoration: none; color: black;'> ▶ </a>";
					} else if(data.mPageNum == data.mpage.startPageNum){
						pageContent = "<input type='hidden' id='deptPageNum' value='"+data.mPageNum+"'/><input type='hidden' id='deptEndPageNum' value='"+data.mpage.endPageNum+"'/>"
						+"<a style='text-decoration: none; color: black;'> ◀ </a><input type='text' id='deptPageInput' value='"+data.mpage.startPageNum+"' onkeypress=\"deptPageNumInputEnter(event);\" style='width: 15px; text-align: center;'/>" 
						+"<a href='#' onclick=deptPaging("+data.mpage.endPageNum+") id='pNum'> / "+data.mpage.endPageNum+"</a>"
						+"<a href='#' onclick=deptPaging("+(data.mPageNum+1)+") id='pNum'> ▶ </a>";
					} else if(data.mPageNum == data.mpage.endPageNum){
						pageContent = "<input type='hidden' id='deptPageNum' value='"+data.mPageNum+"'/><input type='hidden' id='deptEndPageNum' value='"+data.mpage.endPageNum+"'/>"
						+"<a href='#' onclick=deptPaging("+(data.mPageNum-1)+") id='pNum'> ◀ </a>"
						+"<input type='text' id='deptPageInput' value='"+data.mpage.endPageNum+"' onkeypress=\"deptPageNumInputEnter(event);\" style='width: 15px; text-align: center;'/>"
						+"<a> / "+data.mpage.endPageNum+"</a>"
						+"<a style='text-decoration: none; color: black;'> ▶ </a>";
					} else {
						pageContent = "<input type='hidden' id='deptPageNum' value='"+data.mPageNum+"'/><input type='hidden' id='deptEndPageNum' value='"+data.mpage.endPageNum+"'/>"
						+"<a href='#' onclick=deptPaging("+(data.mPageNum-1)+") id='pNum'> ◀ </a>"
						+"<input type='text' id='deptPageInput' value='"+data.mPageNum+"' onkeypress=\"deptPageNumInputEnter(event);\" style='width: 15px; text-align: center;'/>"
						+"<a href='#' onclick=deptPaging("+data.mpage.endPageNum+") id='pNum'> / "+data.mpage.endPageNum+"</a>"
						+"<a href='#' onclick=deptPaging("+(data.mPageNum+1)+") id='pNum'> ▶ </a>";
					}
					$("#mPagingDiv").append(pageContent);
				});
				
				if (data.deptList.length < 50) {
					for (var int = 0; int < 50-data.deptList.length; int++) {
						$("#deptDetail").append("<tr style='background-color: white; cursor: default;'><td>&nbsp;</td><td></td><td></td></tr>");
					}
				}
				
				// 검색된 부서목록이 없을경우 표시
				if (data.deptList.length == 0) {
					// 헤더에서 TR 요소 취득
					var trElement = $("#departListTableHeader").clone().removeClass().empty();
					$("#deptDetail").append(trElement);
					$("#deptDetail tr:last").append("<td colspan='3' " +
							"align='center'>검색 결과가 없습니다</td>");
				}
			},
			beforeSend: function(){
		        	viewLoadingShow();			
		        },
		        complete:function(){
		        	viewLoadingHide();	
		    },
			error: function(data) { 
				alert("부서목록을 얻지 못했습니다.");
				return false;
			}
		});
	
	});
}

//부서 리스트 엔터키 기능
function deptPageNumInputEnter(event) {
	$(document).ready(function() {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			var deptPageNum = parseInt($("#deptPageInput").val());
			if (deptPageNum == '') {
				alert("페이지 번호를 입력하세요.")
				$("#deptPageInput").focus();
			} else if(deptPageNum > parseInt($("#deptEndPageNum").val())) {
				alert("페이지 번호가 너무 큽니다.");
				$("#deptPageInput").val($("#deptPageNum").val());
				$("#deptPageInput").focus();
			} else {
				deptPaging(deptPageNum);
			}
		}
		event.stopPropagation();
	});
}

//PopUp Box 비표시
function doPopupClose() {
	setTimeout($.unblockUI, 0);
}

/**
 * 팝업창 로우 클릭 이벤트
 */
function setDeptID(deptId, deptNm){
	$("#dept_name_srch").val(deptNm);
	$("#dept_wid").val(deptId);
}

//마우스 오버시 화면 표시 이벤트 추가
function addMouseEvent(trElement) {
	trElement.bind("mouseover", function(e) {
		this.className = 'on';
	});
	trElement.bind("mouseout", function(e) {
		this.className = '';
	});
}

//조회버튼
function giftSearch(){
	var ctx = $("#ctx").val();
	var start_dt = $("#expired_start_dt_srch").val();
	var end_dt = $("#expired_end_dt_srch").val();
	var dept_name = $("#dept_name_srch").val();
	var sch_flg = $("#sch_flg").val(1);
	if((start_dt == null || start_dt == '' || end_dt == null || end_dt == '') &&
			(dept_name == null || dept_name == '')){
		alert("검색어를 입력해주세요");
	}
	else{
		$("#gift_form").attr("action", ctx + "/giftCalculate");
		$("#gift_form").append(sch_flg);
		viewLoadingShow();
		$("#gift_form").submit();
	}
}

/*function giftDownloadExcel(){
	if(confirm("엑셀파일로 다운 받으시겠습니까?\n\n현재 조회된 결과의 전체를 다운받습니다.\n양이 많으면 시간이 오래 걸릴 수 있습니다.")) {
		var ctx = $("#ctx").val();
		$("#gift_form").attr("action", ctx + '/giftCalculateExcel');
		$("#gift_form").submit();
	}
}*/